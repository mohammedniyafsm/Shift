"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function CreatePassword() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const handleContinue = () => {
        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }
        setError("")

        // TODO: derive encryption key from password, generate + encrypt seed phrase
        sessionStorage.setItem("wallet_password", password)
        router.push("/wallet/seed-phrase")
    }

    const isValid = password.length >= 8 && password === confirmPassword

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm md:max-w-md flex flex-col items-center text-center">

                <h1 className="text-2xl md:text-5xl font-semibold font-inter">Set up a password</h1>
                <p className="mt-3 text-sm md:text-xl text-gray-500 leading-relaxed">
                    It should be at least 8 characters. You&apos;ll need this to unlock Shift.
                </p>

                <div className="w-full mt-8 flex flex-col gap-4">
                    <div className="relative w-full">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 md:h-16 text-base md:text-lg rounded-2xl px-5 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-12 md:h-16 text-base md:text-lg rounded-2xl px-5"
                    />

                    {error && (
                        <p className="text-sm text-red-500 text-left">{error}</p>
                    )}
                </div>

                <div className="w-full mt-8">
                    <Button
                        disabled={!isValid}
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