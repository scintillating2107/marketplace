"use client";

import Image from "next/image";
import Link from "next/link";
import type { ServiceCategory } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  category: ServiceCategory;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({ category, href, onClick, className }: Props) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-card)]">
        <Image
          src={category.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width:768px) 45vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
      </div>
      <div className="rounded-b-[var(--radius-card)] border border-t-0 border-border bg-surface p-3">
        <h3 className="font-semibold text-foreground">{category.title}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted">{category.description}</p>
      </div>
    </>
  );

  const classes = cn(
    "group block overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(classes, "text-left w-full")}>
      {inner}
    </button>
  );
}
