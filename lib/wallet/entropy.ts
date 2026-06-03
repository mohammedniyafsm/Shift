import * as bip39 from 'bip39'

// Generates 128 bits of cryptographic randomness
// converts to 12 BIP-39 mnemonic words
export function generateMnemonic(): {
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

// Validate that a mnemonic is correct BIP-39
// (checksum passes, all words exist in wordlist)
export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic)
}