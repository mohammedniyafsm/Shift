import Image from "next/image"


export const Header = () => {
    return (
        <>
        {/* header Tile hero hitle */}
            <div className="pt-20 lg:pt-10">

                <div className="text-center pt-28 text-3xl font-medium">
                    <h1>One Wallet</h1>
                    <h1>for all your crypto</h1>
                </div>

                <div className="flex justify-center text-6xl lg:text-[150px] font-bold items-center pt-6 gap-2 lg:gap-6">
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

                <div className="flex items-center justify-center py-12 ">
                    <button className="bg-[#05c92f] text-xl lg:text-base  px-16 py-6  font-sans border-2 border-gray-950 rounded-full flex items-center justify-between gap-4">
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

        {/* Header Video  */}
            <div className="mt-0 lg:mt-16 lg:flex lg:justify-center">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto lg:w-96 lg:w-96 border border-gray-900 rounded-4xl"
                >
                    <source
                        src="https://player.vimeo.com/progressive_redirect/playback/996079329/rendition/720p/file.mp4?loc=external&oauth2_token_id=1772551642&signature=3eb9960e8d447b2dcbb16b894a5280d9e44cb94c4df48b037b386868b86ac91f"
                        type="video/mp4"
                    />
                </video>
            </div>
        </>
    )
}