"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Wallet() {
    const router = useRouter()
    const [agreed, setAgreed] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm md:max-w-md flex flex-col items-center text-center">

                <Image
                    src="/loas.png"
                    width={56}
                    height={56}
                    alt="Shift logo"
                    className="w-14 h-14 md:w-20 md:h-20 mb-6"
                />

                <h1 className="text-2xl md:text-5xl font-semibold font-inter">Welcome to Shift</h1>
                <p className="mt-3 text-sm md:text-xl text-gray-500 leading-relaxed">
                    You&apos;ll use this wallet to send and receive crypto and NFTs
                </p>

                <label className="flex items-start gap-3 mt-8 text-left cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 md:w-5 md:h-5 accent-[#05c92f] cursor-pointer"
                    />
                    <span className="text-sm md:text-lg text-gray-600">
                        I agree to the <span className="text-blue-500 underline">Terms of Service</span>
                    </span>
                </label>

                <div className="flex flex-col gap-3 w-full mt-8">
                    <Button
                        disabled={!agreed}
                        onClick={() => router.push("/wallet/create")}
                        className="bg-[#05c92f] text-black hover:bg-[#05c92f]/90 disabled:opacity-40 rounded-full h-12 md:h-16 text-base md:text-xl font-medium"
                    >
                        Create a new wallet
                    </Button>

                    <Button
                        disabled={!agreed}
                        onClick={() => router.push("/wallet/import")}
                        variant="outline"
                        className="rounded-full h-12 md:h-16 text-base md:text-xl font-medium border-gray-300 disabled:opacity-40"
                    >
                        I already have a wallet
                    </Button>
                </div>
            </div>
        </div>
    )
}