"use client";

import Image from "next/image";
import Link from "next/link";
import { StarField } from "@/components/ui/star-field";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="relative bg-black overflow-hidden flex flex-col items-center justify-center">
      <StarField starCount={300} />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="relative flex items-center justify-center mb-8">
          <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-white/90 tracking-tight select-none">
            4
          </span>
          <div className="relative -mx-8 md:-mx-12">
            <Image
              src="/darth-vader-404.png"
              alt="Darth Vader 404"
              width={300}
              height={300}
              className="w-44 h-44 md:w-48 md:h-48 lg:w-72 lg:h-72 object-contain"
              priority
            />
          </div>
          <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-white/90 tracking-tight select-none">
            4
          </span>
        </div>

        <Typography variant={"h1"} className="mb-6">
          Esta no es la página que estas buscando
        </Typography>

        <p className="text-gray-400 text-sm md:text-base max-w-md mb-8 italic">
          Te sugiero que uses la fuerza o la barra de navegación para que
          encuentres la página que buscas en una galaxia muy muy lejana
        </p>

        <Button
          asChild
          variant="outline"
          className="border-white/30 hover:bg-white/10 text-white"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
