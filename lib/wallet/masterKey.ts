import { HDKey } from '@scure/bip32'
import type { MasterKey } from './types'

// Takes 512-bit seed → runs HMAC-SHA512("ed25519 seed", seed)
// splits output:
//   left  32 bytes = master private key
//   right 32 bytes = master chain code
export function deriveMasterKey(seed: Buffer): {
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