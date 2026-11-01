"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Service } from "@/types";
import { formatINR } from "@/lib/booking";
import { formatRating, formatReviewCount, listPriceFrom } from "@/lib/home-display";

interface Props {
  service: Service;
  badge?: string;
}

export function UcServiceCard({ service, badge }: Props) {
  const mrp = listPriceFrom(service);

  return (
    <Link
      href={`/book?serviceId=${service.id}`}
      prefetch={false}
      className="flex w-[172px] shrink-0 flex-col sm:w-[196px] lg:w-[220px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-accent-soft ring-1 ring-black/[0.06]">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          sizes="(max-width:640px) 172px, 220px"
        />
        {badge && (
          <span className="absolute left-2 top-2 max-w-[92%] truncate rounded-md bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-2.5 line-clamp-2 text-[15px] font-semibold leading-snug text-foreground sm:text-base">
        {service.title}
      </h3>
      <div className="mt-1.5 flex items-center gap-1 text-xs text-muted">
        <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
        <span className="font-semibold text-foreground">{formatRating(service.rating)}</span>
        <span>({formatReviewCount(service.reviewCount)})</span>
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        <span className="text-base font-bold text-foreground">{formatINR(service.startingPrice)}</span>
        {mrp > service.startingPrice && (
          <span className="text-sm text-muted line-through">{formatINR(mrp)}</span>
        )}
      </div>
    </Link>
  );
}
