"use client";

import Image from "next/image";
import { UC_HERO_COLLAGE } from "@/data/home-sections";

export function UcHeroCollage() {
  const [primary, secondary, tertiary] = UC_HERO_COLLAGE;

  return (
    <div className="relative mx-auto aspect-[4/5] max-h-[520px] w-full max-w-md lg:max-w-none">
      <div className="absolute left-0 top-0 h-[58%] w-[62%] overflow-hidden rounded-2xl shadow-elevated ring-1 ring-black/5">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 60vw, 320px"
          priority
        />
      </div>
      <div className="absolute right-0 top-[8%] h-[42%] w-[48%] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
        <Image
          src={secondary.src}
          alt={secondary.alt}
          fill
          className="object-cover"
          sizes="240px"
        />
      </div>
      <div className="absolute bottom-0 right-[12%] h-[44%] w-[52%] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
        <Image
          src={tertiary.src}
          alt={tertiary.alt}
          fill
          className="object-cover"
          sizes="260px"
        />
      </div>
    </div>
  );
}
