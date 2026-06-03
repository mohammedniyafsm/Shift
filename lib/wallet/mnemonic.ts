import * as bip39 from 'bip39'

// Converts 12 mnemonic words → 512-bit seed
// using PBKDF2 with HMAC-SHA512, 2048 rounds
// optional passphrase = the "25th word"
export async function mnemonicToSeed(
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