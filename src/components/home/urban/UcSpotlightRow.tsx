"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { UcCategoryTile } from "@/data/home-sections";
import { UcCategoryTileCard } from "@/components/home/urban/UcCategoryTileCard";

interface Props {
  title: string;
  tiles: UcCategoryTile[];
  seeAllHref?: string;
}

export function UcSpotlightRow({ title, tiles, seeAllHref }: Props) {
  return (
    <section className="py-8 sm:py-10">
      <div className="container-page">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h2>
          {seeAllHref && (
            <Link
              href={seeAllHref}
              prefetch={false}
              className="flex items-center gap-0.5 text-sm font-semibold text-uc-accent hover:underline"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="-mx-4 mt-5 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]">
          {tiles.map((tile) => (
            <UcCategoryTileCard key={tile.id} tile={tile} size="lg" />
          ))}
        </div>
      </div>
    </section>
  );
}
