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



