import { HeroOne } from "@/components/Landing-page/HeroOne";
import { Hero } from "@/components/Landing-page/Hero";
import { Navbar } from "@/components/Landing-page/Navbar";
import { Hero3 } from "@/components/Landing-page/Hero-3";
import { Hero4 } from "@/components/Landing-page/Hero-4";

export default function Home() {
  return (
    <div className="">
      <div className="px-8 py-8">
        <Navbar />
        <Hero />
        <HeroOne />
        <Hero3 />
      </div>

      <Hero4/>

    </div>

  );
}