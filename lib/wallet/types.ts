// The raw master key output from HMAC-SHA512
export interface MasterKey {
  privateKey: Uint8Array   // left 32 bytes
  chainCode: Uint8Array    // right 32 bytes
}

// A single derived child node in the tree
export interface DerivedNode {
  privateKey: Uint8Array   // 32 bytes — Ed25519 seed
  chainCode: Uint8Array    // 32 bytes — passed to next child
  publicKey: Uint8Array    // 32 bytes — Ed25519 public key
}

// A fully derived Solana wallet account
export interface SolanaAccount {
  index: number            // address index (0, 1, 2 ...)
  path: string             // full BIP-44 path string
  address: string          // Base58 encoded public key
  publicKeyHex: string     // hex for display/debugging
  privateKeyHex: string    // hex — NEVER expose in production UI
}

// The complete wallet returned by generateWallet()
export interface HDWallet {
  // Step 1
  entropyHex: string
  mnemonic: string         // 12 space-separated words
  words: string[]          // same but as array

  // Step 2
  seedHex: string          // 64 bytes hex

  // Step 3
  masterPrivateKeyHex: string
  masterChainCodeHex: string

  // Step 5 — derived accounts
  accounts: SolanaAccount[]
}