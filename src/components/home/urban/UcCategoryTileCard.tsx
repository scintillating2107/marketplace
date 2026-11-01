"use client";

import Image from "next/image";
import Link from "next/link";
import type { UcCategoryTile } from "@/data/home-sections";

interface Props {
  tile: UcCategoryTile;
  size?: "md" | "lg";
  variant?: "scroll" | "hero";
}

export function UcCategoryTileCard({ tile, size = "md", variant = "scroll" }: Props) {
  const isHero = variant === "hero";
  const imgSize = size === "lg" ? "168px" : isHero ? "132px" : "104px";

  return (
    <Link
      href={tile.href}
      prefetch={false}
      className={
        isHero
          ? "group flex min-w-0 flex-col items-center gap-2.5"
          : "group flex w-[104px] shrink-0 flex-col items-center gap-2 sm:w-[128px]"
      }
    >
      <div
        className={
          isHero
            ? "relative aspect-square w-full max-w-[120px] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.06] transition-transform group-hover:scale-[1.03] sm:max-w-[132px]"
            : `relative overflow-hidden rounded-2xl bg-accent-soft ring-1 ring-border transition-transform group-hover:scale-[1.02] ${
                size === "lg"
                  ? "h-[148px] w-[148px] sm:h-[168px] sm:w-[168px]"
                  : "h-[104px] w-[104px] sm:h-[120px] sm:w-[120px]"
              }`
        }
      >
        <Image src={tile.image} alt="" fill className="object-cover" sizes={imgSize} />
      </div>
      <span
        className={
          isHero
            ? "line-clamp-3 w-full text-center text-[11px] font-semibold leading-snug text-foreground sm:text-xs"
            : "line-clamp-2 text-center text-xs font-semibold leading-tight text-foreground"
        }
      >
        {tile.label}
      </span>
    </Link>
  );
}
