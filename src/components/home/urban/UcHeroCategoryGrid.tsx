"use client";

import { UC_MAIN_CATEGORIES } from "@/data/home-sections";
import { UcCategoryTileCard } from "@/components/home/urban/UcCategoryTileCard";

export function UcHeroCategoryGrid() {
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-7">
      {UC_MAIN_CATEGORIES.map((tile) => (
        <UcCategoryTileCard key={tile.id} tile={tile} variant="hero" />
      ))}
    </div>
  );
}
