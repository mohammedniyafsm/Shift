import { HDKey } from "@scure/bip32"
import bs58 from "bs58"
import nacl from "tweetnacl"
import { SolanaAccount } from "../wallet/types"

// Solana's registered coin type in BIP-44
// every coin has a unique number — Solana is 501
// Bitcoin = 0, Ethereum = 60, Solana = 501
export const SOLANA_COIN_TYPE = 501


export function buildDerivationPath(index: number) {
    // builds the path string for a given index
    // example: index=0 → "m/44'/501'/0'/0'/0'"
    // example: index=1 → "m/44'/501'/0'/0'/1'"
    // the ' after each number = hardened derivation
    // Solana REQUIRES all levels hardened because
    // Ed25519 does not support normal (non-hardened) child derivation

    const path = `m/44'/${SOLANA_COIN_TYPE}'/0'/0'/${index}'`
    return path;

}


export function deriveChildNode(seed: Buffer, path: string): {
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


function getPublicKey(privateKey: Uint8Array): Uint8Array {
    // ─────────────────────────────────────────
    // private key → public key
    // Ed25519 curve: privKey × G = pubKey
    // nacl handles the math internally
    // ─────────────────────────────────────────

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
    const address = bs58.encode(publicKey)

    return {
        index,
        path,
        address,                                              // share this publicly
        publicKeyHex: Buffer.from(publicKey).toString('hex'),
        privateKeyHex: Buffer.from(privateKey).toString('hex'), // NEVER expose this
    }
}