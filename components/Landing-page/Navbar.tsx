import Image from "next/image"


export const Navbar = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Image
                    src="/loas.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                />
                <Image
                    src="/shiftlog.png"
                    width={80}
                    height={80}
                    alt="Picture of the author"
                />
            </div>

            <div className="">
                <button className="bg-foreground text-background rounded-4xl w-40 h-12 font-medium ">Create Wallet</button>
            </div>
        </div>

    )
}