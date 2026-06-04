
"use client"
import { useState, useEffect } from "react"
import { generateMnemonic, mnemonicToSeed, deriveMasterKey, deriveSolanaAccounts } from "@/lib/wallet/createMnemoics"
import type { SolanaAccount } from "@/lib/wallet/types"

// define what we store in state
interface WalletState {
  mnemonic: string
  words: string[]
  entropyHex: string
  seedHex: string
  masterPrivateKeyHex: string
  masterChainCodeHex: string
  accounts: SolanaAccount[]
}

export default function Home() {
  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPrivateKeys, setShowPrivateKeys] = useState(false)

  // generate wallet on button click — NOT on useEffect
  // useEffect runs on every refresh which is bad for wallets
  async function handleGenerate() {
    setLoading(true)

    // Step 1 — entropy → 12 words
    const { mnemonic, words, entropyHex } = generateMnemonic()

    // Step 2 — words → seed
    const { seed, seedHex } = await mnemonicToSeed(mnemonic)

    // Step 3 — seed → master keys
    const { masterPrivateKeyHex, masterChainCodeHex } = deriveMasterKey(seed)

    // Step 4+5 — derive 5 Solana addresses
    const accounts = deriveSolanaAccounts(seed, 5)

    setWallet({
      mnemonic,
      words,
      entropyHex,
      seedHex,
      masterPrivateKeyHex,
      masterChainCodeHex,
      accounts,
    })

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-400">
              Solana HD Wallet
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              BIP-39 → BIP-32 → BIP-44 → Ed25519
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 
                       text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            {loading ? "Generating..." : "Generate Wallet"}
          </button>
        </div>

        {/* ── Empty state ── */}
        {!wallet && (
          <div className="border border-zinc-800 rounded-xl p-16 text-center text-zinc-600">
            Click Generate Wallet to derive your HD tree
          </div>
        )}

        {wallet && (
          <div className="flex flex-col gap-6">

            {/* ── STEP 1 — Mnemonic Words ── */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-900 px-4 py-3 flex items-center gap-3 
                              border-b border-zinc-800">
                <span className="bg-purple-600 text-white text-xs font-bold 
                                 w-6 h-6 rounded-full flex items-center justify-center">
                  1
                </span>
                <span className="font-bold text-sm">Entropy → Mnemonic</span>
                <span className="ml-auto text-xs bg-purple-900/50 text-purple-400 
                                 border border-purple-800 px-2 py-0.5 rounded-full">
                  BIP-39
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">

                {/* 12 words grid */}
                <div className="grid grid-cols-4 gap-2">
                  {wallet.words.map((word, i) => (
                    <div key={i}
                      className="bg-zinc-900 border border-zinc-800 rounded-lg 
                                 px-3 py-2 flex items-center gap-2">
                      <span className="text-zinc-600 text-xs w-4">{i + 1}</span>
                      <span className="text-green-400 text-sm font-medium">{word}</span>
                    </div>
                  ))}
                </div>

                {/* entropy hex */}
                <div>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">
                    entropy (hex)
                  </p>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg 
                                  p-3 text-xs text-zinc-400 break-all">
                    {wallet.entropyHex}
                  </div>
                </div>
              </div>
            </div>

            {/* ── STEP 2 — Seed ── */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-900 px-4 py-3 flex items-center gap-3 
                              border-b border-zinc-800">
                <span className="bg-purple-600 text-white text-xs font-bold 
                                 w-6 h-6 rounded-full flex items-center justify-center">
                  2
                </span>
                <span className="font-bold text-sm">Mnemonic → 512-bit Seed</span>
                <span className="ml-auto text-xs bg-green-900/50 text-green-400 
                                 border border-green-800 px-2 py-0.5 rounded-full">
                  PBKDF2 · 2048 rounds
                </span>
              </div>
              <div className="p-4">
                <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">
                  seed (hex · 64 bytes)
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg 
                                p-3 text-xs break-all">
                  <span className="text-purple-400">{wallet.seedHex.slice(0, 64)}</span>
                  <span className="text-blue-400">{wallet.seedHex.slice(64)}</span>
                </div>
              </div>
            </div>

            {/* ── STEP 3 — Master Keys ── */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-900 px-4 py-3 flex items-center gap-3 
                              border-b border-zinc-800">
                <span className="bg-purple-600 text-white text-xs font-bold 
                                 w-6 h-6 rounded-full flex items-center justify-center">
                  3
                </span>
                <span className="font-bold text-sm">Seed → Master Keys</span>
                <span className="ml-auto text-xs bg-blue-900/50 text-blue-400 
                                 border border-blue-800 px-2 py-0.5 rounded-full">
                  HMAC-SHA512
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">
                    master private key (left 32 bytes)
                  </p>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg 
                                  p-3 text-xs text-purple-400 break-all">
                    {wallet.masterPrivateKeyHex}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">
                    master chain code (right 32 bytes)
                  </p>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg 
                                  p-3 text-xs text-green-400 break-all">
                    {wallet.masterChainCodeHex}
                  </div>
                </div>
              </div>
            </div>

            {/* ── STEP 4+5 — Derived Addresses ── */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-900 px-4 py-3 flex items-center gap-3 
                              border-b border-zinc-800">
                <span className="bg-purple-600 text-white text-xs font-bold 
                                 w-6 h-6 rounded-full flex items-center justify-center">
                  5
                </span>
                <span className="font-bold text-sm">Derived Solana Addresses</span>
                <span className="ml-auto text-xs bg-green-900/50 text-green-400 
                                 border border-green-800 px-2 py-0.5 rounded-full">
                  Ed25519 · Base58
                </span>
                {/* toggle private keys */}
                <button
                  onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                  className="text-xs border border-zinc-700 hover:border-purple-600 
                             text-zinc-400 hover:text-purple-400 px-3 py-1 
                             rounded-full transition-colors"
                >
                  {showPrivateKeys ? "Hide" : "Show"} Private Keys
                </button>
              </div>

              <div className="divide-y divide-zinc-800">
                {wallet.accounts.map((acc) => (
                  <div key={acc.index} className="p-4 flex flex-col gap-2">

                    {/* path + index badge */}
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-zinc-900 border border-zinc-700 
                                       rounded-full flex items-center justify-center 
                                       text-xs text-zinc-400 font-bold flex-shrink-0">
                        {acc.index}
                      </span>
                      <span className="text-purple-400 text-xs">{acc.path}</span>
                    </div>

                    {/* public address */}
                    <div className="flex items-center gap-2 ml-11">
                      <span className="text-zinc-600 text-xs uppercase 
                                       tracking-widest w-14 flex-shrink-0">
                        address
                      </span>
                      <span className="text-green-400 text-xs break-all">
                        {acc.address}
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(acc.address)}
                        className="ml-auto text-xs border border-zinc-700 
                                   hover:border-green-600 text-zinc-500 
                                   hover:text-green-400 px-2 py-0.5 
                                   rounded transition-colors flex-shrink-0"
                      >
                        copy
                      </button>
                    </div>

                    {/* private key — hidden by default */}
                    {showPrivateKeys && (
                      <div className="flex items-center gap-2 ml-11">
                        <span className="text-zinc-600 text-xs uppercase 
                                         tracking-widest w-14 flex-shrink-0">
                          privkey
                        </span>
                        <span className="text-red-400 text-xs break-all">
                          {acc.privateKeyHex}
                        </span>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
