"use client"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { generateMnemonic } from "bip39";

export default function SeedPhrase() {
    const router = useRouter()
    const [seedWords, setSeedWords] = useState<string[]>([])
    const [revealed, setRevealed] = useState(false)
    const [copied, setCopied] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        const mnemonic = generateMnemonic()
        setSeedWords(mnemonic.split(" "))
        // TODO: encrypt mnemon`ic with password from previous step and store the vault
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(seedWords.join(" "))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleContinue = () => {
        router.push("/wallet/confirm-seed-phrase")
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm md:max-w-lg flex flex-col items-center text-center">

                <h1 className="text-2xl md:text-5xl font-semibold font-inter">Save your secret phrase</h1>
                <p className="mt-3 text-sm md:text-xl text-gray-500 leading-relaxed">
                    This phrase is the ONLY way to recover your wallet. Do not share it with anyone.
                </p>

                <div className="relative w-full mt-8">
                    <div className={`grid grid-cols-3 gap-3 w-full p-5 rounded-2xl border border-gray-200 bg-gray-50 ${!revealed ? "blur-sm select-none" : ""}`}>
                        {seedWords.map((word, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 text-sm md:text-base bg-white rounded-lg px-3 py-2 border border-gray-100"
                            >
                                <span className="text-gray-400 text-xs md:text-sm w-4">{i + 1}</span>
                                <span className="font-medium">{word}</span>
                            </div>
                        ))}
                    </div>

                    {!revealed && (
                        <button
                            onClick={() => setRevealed(true)}
                            className="absolute inset-0 flex items-center justify-center gap-2 text-sm md:text-base font-medium bg-white/40 rounded-2xl"
                        >
                            <Eye size={18} />
                            Tap to reveal
                        </button>
                    )}
                </div>

                <button
                    onClick={handleCopy}
                    disabled={!revealed}
                    className="flex items-center gap-2 mt-4 text-sm md:text-base text-gray-500 disabled:opacity-40"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy to clipboard"}
                </button>

                <label className="flex items-start gap-3 mt-8 text-left cursor-pointer">
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="mt-1 w-4 h-4 md:w-5 md:h-5 accent-[#05c92f] cursor-pointer"
                    />
                    <span className="text-sm md:text-lg text-gray-600">
                        I have saved my secret phrase in a safe place
                    </span>
                </label>

                <div className="w-full mt-8">
                    <Button
                        disabled={!confirmed || !revealed}
                        onClick={handleContinue}
                        className="bg-[#05c92f] text-black hover:bg-[#05c92f]/90 disabled:opacity-40 rounded-full h-12 md:h-16 w-full text-base md:text-xl font-medium"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}