export function HeroOne() {
    const features = [
        {
            title: "10M+ assets at your fingertips",
            description:
                "Ctrl supports all the newest memecoins and testnets on every EVM chain, Bitcoin, Ethereum, Cardano, Solana, THORChain, Midnight and more.",
            video:
                "https://player.vimeo.com/progressive_redirect/playback/995250592/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=66c020553b0a1c88b41efcd148ed507024491d3245ba4929052f6c2279787311",
        },
        {
            title: "Connect to every application",
            description:
                "Ctrl connects to every dapp on 2,500+ blockchains and testnets.",
            video:
                "https://player.vimeo.com/progressive_redirect/playback/995250613/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=865063dac31e099fd5c5dedd1e7b12036ea598dc93e3b48e2cf9e05905c16db4",
        },
        {
            title: "One home for all your NFTs",
            description:
                "Ctrl’s NFT gallery displays all your NFTs from 30+ chains including Bitcoin, Ethereum, Cardano, Solana, THORChain, Midnight and more.",
            video:
                "https://player.vimeo.com/progressive_redirect/playback/995250622/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=63e97461ac4523748de77dea341f9c39993c6b7bb6010108e3d0a22cd33667fc",
        },
    ];

    return (
        <>

            <div className="">
                {/* Header Video  */}
                <div  className="mt-0 lg:mt-16 lg:flex lg:justify-center">
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
        </div >
            <div className="text-start pt-20 lg:px-32">
                <h1 className="text-5xl lg:text-9xl font-medium">
                    Capture every opportunity on every chain.
                </h1>
            </div>

            <div className="pt-20 flex flex-col gap-8 lg:px-32">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-[rgb(249,250,249)] py-16 rounded-3xl px-8 flex flex-col gap-4 lg:px-20 lg:py-12 lg:flex-row lg:items-center lg:justify-between"
                    >
                        <div>
                            <h1 className="font-medium text-4xl lg:text-7xl lg:w-[550px]">
                                {feature.title}
                            </h1>

                            <p className="text-xl lg:text-2xl lg:text-gray-600 lg:w-[550px] lg:mt-4">
                                {feature.description}
                            </p>
                        </div>

                        <div>
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-auto lg:w-96 lg:h-96"
                            >
                                <source src={feature.video} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}