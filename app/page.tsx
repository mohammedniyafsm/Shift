import { HeroTwo } from "@/components/Landing-page/Hero-2";
import { Header } from "@/components/Landing-page/Header";
import { Navbar } from "@/components/Landing-page/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Hero3 } from "@/components/Landing-page/Hero-3";
import { Hero4 } from "@/components/Landing-page/Hero-4";

export default function Home() {
  return (
    <div className="">
      <div className="px-8 py-8">
        <Navbar />
        <Header />
        <HeroTwo />
        <Hero3 />
      </div>

      <Hero4/>

    </div>

  );
}