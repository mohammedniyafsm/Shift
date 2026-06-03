import { HDKey } from '@scure/bip32'
import type { DerivedNode } from './types'

// Solana BIP-44 coin type is 501
// Solana REQUIRES all path levels to be hardened
// because Ed25519 does not support non-hardened public key derivation
//
// Full path: m/44'/501'/account'/0'/index'
export const SOLANA_COIN_TYPE = 501

export function buildDerivationPath(
  account: number = 0,
  index: number = 0
): string {
  return `m/44'/${SOLANA_COIN_TYPE}'/${account}'/0'/${index}'`
}

// Derives a child node at the given BIP-44 path
// All apostrophes mean hardened derivation (index + 0x80000000)
// Uses HMAC-SHA512 at each level with parent's chain code as key
export function deriveChildNode(
  seed: Buffer,
  path: string
): DerivedNode {
  const hdkey = HDKey.fromMasterSeed(seed)
  const child = hdkey.derive(path)

  if (!child.privateKey || !child.chainCode || !child.publicKey) {
    throw new Error(`Failed to derive key at path: ${path}`)
  }

  return {
    privateKey: child.privateKey,   // 32 bytes → Ed25519 seed
    chainCode: child.chainCode,     // 32 bytes
    publicKey: child.publicKey,     // 33 bytes compressed — we slice [1:]
  }
}