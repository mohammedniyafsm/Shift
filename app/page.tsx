import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="px-8 py-8">

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


        <div className="pt-20">

          <div className="text-center pt-28 text-3xl font-medium">
            <h1>One Wallet</h1>
            <h1>for all your crypto</h1>
          </div>

          <div className="flex justify-center text-6xl font-bold items-center pt-6 gap-2">
            <h1>Take</h1>
            <Image
              src="/loas.png"
              width={60}
              height={60}
              alt="Picture of the author"
            />
            <h1>Shift</h1>
          </div>

          <div className="flex items-center justify-center py-12">
            <button className="bg-[#05c92f] text-xl px-16 py-6 font-sans border-2 border-gray-950 rounded-full flex items-center justify-between gap-4">
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

        <div className="">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto border border-gray-900 rounded-4xl"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/996079329/rendition/720p/file.mp4?loc=external&oauth2_token_id=1772551642&signature=3eb9960e8d447b2dcbb16b894a5280d9e44cb94c4df48b037b386868b86ac91f"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="text-start pt-20">
          <h1 className="text-5xl font-medium">Capture every
            opportunity  on
            every chain.
          </h1>


        </div>

        <div className="pt-20 flex flex-col gap-8">

          <div className="bg-[rgb(249,250,249)] py-16 rounded-3xl px-8 flex flex-col gap-4 ">
            <h1 className="font-medium text-4xl">10M+ assets at your fingertips</h1>
            <p className="text-xl ">Ctrl supports all the newest memecoins and testnets on every EVM chain, Bitcoin, Ethereum, Cardano, Solana, THORChain, Midnight and more.</p>
            <div className="">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250592/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=66c020553b0a1c88b41efcd148ed507024491d3245ba4929052f6c2279787311"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div className="bg-[rgb(249,250,249)] py-16 rounded-3xl px-8 flex flex-col gap-4 ">
            <h1 className="font-medium text-4xl">Connect to every application</h1>
            <p className="text-xl ">Ctrl connects to every dapp on 2,500+ blockchains and testnets.</p>
            <div className="">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250613/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=865063dac31e099fd5c5dedd1e7b12036ea598dc93e3b48e2cf9e05905c16db4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div className="bg-[rgb(249,250,249)] py-16 rounded-3xl px-8 flex flex-col gap-4 ">
            <h1 className="font-medium text-4xl">One home for all your NFTs</h1>
            <p className="text-xl ">Ctrl’s NFT gallery displays all your NFTs from 30+ chains including Bitcoin, Ethereum, Cardano, Solana, THORChain, Midnight and more.</p>
            <div className="">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250622/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=63e97461ac4523748de77dea341f9c39993c6b7bb6010108e3d0a22cd33667fc"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 ">
          <h1 className="font-medium text-5xl text-center">Join the 600,000+ people who trust Shift.</h1>
        </div>

        <div className="">

          <div className="bg-[#9DC4F5] mt-20 px-8 pt-12 rounded-2xl ">
            <h1 className="font-medium text-3xl">Founded in 2020, Ctrl (formerly XDEFI) was the world's first multichain wallet.</h1>
            <div className="">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto "
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250452/rendition/1080p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=a363f94503b78cd6e3233b37d42e7464044ae42a0385e2b07889f95215360593"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div className="bg-[#ffcadc] mt-20 px-8 pt-12 rounded-2xl ">
            <h1 className="font-medium text-3xl">4.8 star rating in the Google Chrome Store after 650+ reviews.</h1>
            <div className="">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto "
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250465/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=9bd58a7ff1e80d843adbad175f728ba48c202d2b399e6c33385e799b0522d53e"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div className="bg-[#fbe74e] mt-20 px-8 pt-12 rounded-2xl ">
            <h1 className="font-medium text-3xl">24/7 live customer support. Our global team is here to help you.</h1>
            <div className="">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto "
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250482/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=7a3ef62ee1ca90b0296f942e2a2f03513d069b2695e93158c3f8e5be306c454e"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-[rgb(249,250,249)] mt-12 py-12">

        <div className="">
          <h1 className="py-8 flex justify-end px-12">Secure and private</h1>
          <div className="">
            <h1 className="font-medium text-5xl pl-12 pr-8">The Secure way to Web3</h1>
          </div>
        </div>

        <div className="px-8 mt-20 flex flex-col gap-12">

          <div className="bg-[#ecefec] rounded-2xl px-8 py-10">
            <h1 className="text-4xl font-medium">Portfolio overview</h1>
            <p className="text-xl mt-4">Track your entire portfolio in one place.</p>

            <div className="mt-12">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto border border-gray-900 rounded-4xl"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250644/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772650813&signature=a68d2b79c2f2cce1858d22fb57e0a39c55c03251daab55597054be0345e2a270"
                  type="video/mp4"
                />
              </video>
            </div>


          </div>

          <div className="bg-[#ecefec] rounded-2xl px-8 py-10">
            <h1 className="text-4xl font-medium">Hardware wallet support</h1>
            <p className="text-xl mt-4">Keeps funds safe on your Ledger / Trezor.</p>

            <div className="mt-12">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto border border-gray-900 rounded-4xl"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250529/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772651873&signature=6719d8589d6a58dae4d33b05aec81e970e612af040411d2ceb1cea7947f30135"
                  type="video/mp4"
                />
              </video>
            </div>


          </div>

          <div className="bg-[#ecefec] rounded-2xl px-8 py-10">
            <h1 className="text-4xl font-medium">Malicious address alerts</h1>
            <p className="text-xl mt-4">We flag malicious and suspicious addresses for you.</p>

            <div className="mt-12">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto border border-gray-900 rounded-4xl"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250665/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772651873&signature=8a6dee9e10df0b58efdb8bb3445e94bcb658c55d20654ccc3f1e3da65c4385f7"
                  type="video/mp4"
                />
              </video>
            </div>


          </div>

          <div className="bg-[#ecefec] rounded-2xl px-8 py-10">
            <h1 className="text-4xl font-medium">No IP tracking</h1>
            <p className="text-xl mt-4">We do not record any user IP addresses.</p>

            <div className="mt-12">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto border border-gray-900 rounded-4xl"
              >
                <source
                  src="https://player.vimeo.com/progressive_redirect/playback/995250520/rendition/540p/file.mp4?loc=external&oauth2_token_id=1772651873&signature=4f0c6664f6beb5b1824e9bfc98ef90b847036ce75105e8502bf6c350fd927294"
                  type="video/mp4"
                />
              </video>
            </div>


          </div>

        </div>


        <div className="">
          
        </div>
      </div>
    </div>

  );
}