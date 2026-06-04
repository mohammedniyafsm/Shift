import * as bip39 from "bip39";
import { HDKey } from "@scure/bip32";
import type { MasterKey,SolanaAccount } from './types'
import nacl from 'tweetnacl'



export function generateMnemonic(): {
    // Generates 128 bits of cryptographic randomness
    // converts to 12 BIP-39 mnemonic words
    mnemonic: string
    words: string[]
    entropyHex: string
} {
    // bip39.generateMnemonic(128) internally:
    //   1. generates 128 random bits
    //   2. SHA-256 checksum → takes first 4 bits
    //   3. splits 132 bits into 12 × 11-bit groups
    //   4. maps each group to BIP-39 wordlist[index]
    const mnemonic = bip39.generateMnemonic(128)

    const words = mnemonic.split(' ')

    // get the raw entropy back for display
    const entropyHex = bip39.mnemonicToEntropy(mnemonic)

    return { mnemonic, words, entropyHex }
}


export async function mnemonicToSeed(
    // Converts 12 mnemonic words → 512-bit seed
    // using PBKDF2 with HMAC-SHA512, 2048 rounds
    // optional passphrase = the "25th word"
    mnemonic: string,
    passphrase: string = ''
): Promise<{
    seed: Buffer
    seedHex: string
}> {
    // bip39.mnemonicToSeed internally runs:
    //   PBKDF2(
    //     password = mnemonic,
    //     salt     = "mnemonic" + passphrase,
    //     rounds   = 2048,
    //     hash     = HMAC-SHA512,
    //     output   = 64 bytes
    //   )
    const seed = await bip39.mnemonicToSeed(mnemonic, passphrase)
    const seedHex = seed.toString('hex')

    return { seed, seedHex }
}

export function deriveMasterKey(seed: Buffer): {
    // Takes 512-bit seed → runs HMAC-SHA512("ed25519 seed", seed)
    // splits output:
    //   left  32 bytes = master private key
    //   right 32 bytes = master chain code
    masterKey: MasterKey
    masterPrivateKeyHex: string
    masterChainCodeHex: string
} {
    // HDKey.fromMasterSeed handles SLIP-0010 derivation for ed25519
    // internally uses HMAC-SHA512 with "ed25519 seed" as the key
    const hdkey = HDKey.fromMasterSeed(seed)

    if (!hdkey.privateKey || !hdkey.chainCode) {
        throw new Error('Failed to derive master key from seed')
    }

    const masterKey: MasterKey = {
        privateKey: hdkey.privateKey,
        chainCode: hdkey.chainCode,
    }

    return {
        masterKey,
        masterPrivateKeyHex: Buffer.from(hdkey.privateKey).toString('hex'),
        masterChainCodeHex: Buffer.from(hdkey.chainCode).toString('hex'),
    }
}



// Solana's registered coin type in BIP-44
// every coin has a unique number — Solana is 501
// Bitcoin = 0, Ethereum = 60, Solana = 501
export const SOLANA_COIN_TYPE = 501

// builds the path string for a given index
// example: index=0 → "m/44'/501'/0'/0'/0'"
// example: index=1 → "m/44'/501'/0'/0'/1'"
// the ' after each number = hardened derivation
// Solana REQUIRES all levels hardened because
// Ed25519 does not support normal (non-hardened) child derivation
export function buildDerivationPath(index: number): string {
    return `m/44'/${SOLANA_COIN_TYPE}'/0'/0'/${index}'`
}

// This is the core of Step 4
// takes the seed and a path like "m/44'/501'/0'/0'/0'"
// walks down the tree level by level:
//
//   seed → master
//   master → m/44'
//   m/44'  → m/44'/501'
//   m/44'/501' → m/44'/501'/0'
//   m/44'/501'/0' → m/44'/501'/0'/0'
//   m/44'/501'/0'/0' → m/44'/501'/0'/0'/0'  ← final child
//
// at each level: HMAC-SHA512(parentChainCode, 0x00 + parentPrivKey + index)
// left 32 bytes  = child private key
// right 32 bytes = child chain code
export function deriveChildNode(seed: Buffer, path: string): {
    privateKey: Uint8Array  // 32 bytes — this becomes Solana keypair seed
    chainCode: Uint8Array   // 32 bytes — used to derive next level
} {
    // HDKey.fromMasterSeed runs HMAC-SHA512("ed25519 seed", seed)
    // then .derive(path) walks each level of the path
    const hdkey = HDKey.fromMasterSeed(seed)
    const child = hdkey.derive(path)

    if (!child.privateKey || !child.chainCode) {
        throw new Error(`Failed to derive key at path: ${path}`)
    }

    return {
        privateKey: child.privateKey,
        chainCode: child.chainCode,
    }
}



// ─────────────────────────────────────────
// BASE58 ENCODING
// Solana address = Base58(public key)
// no hashing needed unlike Bitcoin/Ethereum
// ─────────────────────────────────────────

// Base58 removes confusing characters:
// 0 (zero), O (capital o), I (capital i), l (lowercase L)
const BASE58_ALPHABET =
    '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

function base58Encode(bytes: Uint8Array): string {
    // count leading zero bytes
    let leadingZeros = 0
    for (const byte of bytes) {
        if (byte === 0) leadingZeros++
        else break
    }

    // convert bytes to a big number
    let num = BigInt('0x' + Buffer.from(bytes).toString('hex'))
    let result = ''

    // repeatedly divide by 58, remainder = next character
    while (num > 0n) {
        const mod = num % 58n
        result = BASE58_ALPHABET[Number(mod)] + result
        num = num / 58n
    }

    // leading zero bytes become '1' in Base58
    return '1'.repeat(leadingZeros) + result
}

// ─────────────────────────────────────────
// STEP 5A — private key → public key
// Ed25519 curve: privKey × G = pubKey
// nacl handles the math internally
// ─────────────────────────────────────────
function getPublicKey(privateKey: Uint8Array): Uint8Array {
    // nacl.sign.keyPair.fromSeed takes 32 byte seed
    // does Ed25519 scalar multiplication
    // returns { publicKey: 32 bytes, secretKey: 64 bytes }
    const keypair = nacl.sign.keyPair.fromSeed(privateKey)
    return keypair.publicKey // 32 bytes
}

// ─────────────────────────────────────────
// STEP 5B — derive one complete Solana account
// combines Step 4 (path derivation) + Step 5 (address)
// ─────────────────────────────────────────
export function deriveSolanaAccount(
    seed: Buffer,
    index: number
): SolanaAccount {
    // Step 4 — walk the BIP-44 tree to this index
    // path example for index 0: "m/44'/501'/0'/0'/0'"
    const path = buildDerivationPath(index)
    const { privateKey } = deriveChildNode(seed, path)

    // Step 5A — Ed25519 scalar multiply → public key
    const publicKey = getPublicKey(privateKey)

    // Step 5B — Base58 encode public key → Solana address
    // Solana address IS the public key, just Base58 encoded
    // no hashing unlike Bitcoin (SHA256+RIPEMD160) or Ethereum (Keccak256)
    const address = base58Encode(publicKey)

    return {
        index,
        path,
        address,                                              // share this publicly
        publicKeyHex: Buffer.from(publicKey).toString('hex'),
        privateKeyHex: Buffer.from(privateKey).toString('hex'), // NEVER expose this
    }
}

// ─────────────────────────────────────────
// Derive multiple accounts at once
// count=5 → derives index 0,1,2,3,4
// same seed + same index = always same address (deterministic)
// ─────────────────────────────────────────
export function deriveSolanaAccounts(
    seed: Buffer,
    count: number = 5
): SolanaAccount[] {
    return Array.from({ length: count }, (_, index) =>
        deriveSolanaAccount(seed, index)
    )
}