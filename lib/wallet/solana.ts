import nacl from 'tweetnacl'
import type { DerivedNode, SolanaAccount } from './types'
import { buildDerivationPath, deriveChildNode } from './derivation'

// Base58 alphabet — Bitcoin/Solana standard
// removes 0, O, I, l to avoid confusion
const BASE58_ALPHABET =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

export function base58Encode(bytes: Uint8Array): string {
  let leadingZeros = 0
  for (const byte of bytes) {
    if (byte === 0) leadingZeros++
    else break
  }

  let num = BigInt('0x' + Buffer.from(bytes).toString('hex'))
  let result = ''

  while (num > 0n) {
    const mod = num % 58n
    result = BASE58_ALPHABET[Number(mod)] + result
    num = num / 58n
  }

  return '1'.repeat(leadingZeros) + result
}

// Ed25519: derive public key from private key (32 byte seed)
// nacl.sign.keyPair.fromSeed does the scalar multiplication
// private key seed (32 bytes) × G → public key (32 bytes)
export function getEd25519PublicKey(privateKey: Uint8Array): Uint8Array {
  const keypair = nacl.sign.keyPair.fromSeed(privateKey)
  return keypair.publicKey // 32 bytes
}

// Derive one complete Solana account at a given index
export function deriveSolanaAccount(
  seed: Buffer,
  index: number,
  account: number = 0
): SolanaAccount {
  const path = buildDerivationPath(account, index)
  const node: DerivedNode = deriveChildNode(seed, path)

  // Ed25519 public key from private key
  const publicKey = getEd25519PublicKey(node.privateKey)

  // Solana address = Base58(public key)
  // no hashing needed — the 32-byte public key IS the address
  const address = base58Encode(publicKey)

  return {
    index,
    path,
    address,
    publicKeyHex: Buffer.from(publicKey).toString('hex'),
    privateKeyHex: Buffer.from(node.privateKey).toString('hex'),
  }
}

// Derive multiple accounts at once
export function deriveSolanaAccounts(
  seed: Buffer,
  count: number = 5,
  account: number = 0
): SolanaAccount[] {
  return Array.from({ length: count }, (_, i) =>
    deriveSolanaAccount(seed, i, account)
  )
}