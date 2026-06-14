"use client"
import Image from "next/image"
import LogoLoop from "../LogoLoop"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"


export const Hero = () => {

    const titleRef = useRef(null)
    const headingRef = useRef(null)
    const buttonRef = useRef(null)
    const loopRef = useRef(null)
    const router = useRouter()

    const techLogos = [
        { node: <Image src="/token/Bitcoin.svg.png" width={75} height={75} alt="Bitcoin" />, title: "Bitcoin", href: "https://bitcoin.org" },
        { node: <Image src="/token/Ethereum_Logo.png" width={75} height={75} alt="Ethereum" />, title: "Ethereum", href: "https://ethereum.org" },
        { node: <Image src="/token/Solana_logo.png" width={75} height={75} alt="Solana" />, title: "Solana", href: "https://solana.com" },
        { node: <Image src="/token/Tether_USDT.png" width={75} height={75} alt="Tether" />, title: "Tether", href: "https://tether.to" },
        { node: <Image src="/token/bnb.png" width={75} height={75} alt="BNB" />, title: "BNB", href: "https://www.bnbchain.org" },
        { node: <Image src="/token/tron.png" width={75} height={75} alt="Tron" />, title: "Tron", href: "https://tron.network" },
        { node: <Image src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/xrp.svg" width={75} height={75} alt="XRP" />, title: "XRP", href: "https://xrpl.org" },
        { node: <Image src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/ada.svg" width={75} height={75} alt="Cardano" />, title: "Cardano", href: "https://cardano.org" },
        { node: <Image src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/matic.svg" width={75} height={75} alt="Polygon" />, title: "Polygon", href: "https://polygon.technology" },
    ];

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.fromTo(titleRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo(headingRef.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 },
                "-=0.5"
            )
            .fromTo(buttonRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                "-=0.5"
            )
            .fromTo(loopRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.4"
            )
    }, [])

    return (
        <>
            {/* header Tile hero hitle */}
            <div className="pt-20 lg:pt-10">

                <div ref={titleRef} className="text-center pt-28 text-3xl lg:text-4xl font-medium  font-inter">
                    <h1>One Wallet</h1>
                    <h1>for all your crypto</h1>
                </div>

                <div ref={headingRef} className="flex justify-center text-6xl lg:text-[150px] font-bold items-center pt-6 gap-2 lg:gap-6">
                    <h1 className="">Take</h1>
                    <Image
                        src="/loas.png"
                        width={60}
                        height={60}
                        alt="Picture of the author"
                        className="w-12 h-12 lg:w-30 lg:h-30"
                    />
                    <h1>Shift</h1>
                </div>

                <div ref={buttonRef} className="flex items-center justify-center py-12 ">
                    <button
                        onClick={() => router.push("/wallet")}
                        className="bg-[#05c92f] cursor-pointer text-xl lg:text-base  px-16 py-6  font-sans border-2 border-gray-950 rounded-full flex items-center justify-between gap-4">
                        <Image
                            src="/3.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        />
                        Create Wallet
                    </button>
                </div>

            </div>

            <div ref={loopRef} className="py-0 lg:py-18">
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                    {/* Basic horizontal loop */}
                    <LogoLoop
                        logos={techLogos}
                        speed={40}
                        direction="left"
                        logoHeight={95}
                        gap={95}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#ffffff"
                        ariaLabel="Crypto tokens"
                    />
                </div>
            </div>
        </>
    )
}