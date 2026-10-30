"use client";

import Image from "next/image";
import { Clock, Star } from "lucide-react";
import type { Service } from "@/types";
import { formatINR } from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  service: Service;
  onExplore?: () => void;
  onBook?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  compact?: boolean;
}

export function ServiceCard({
  service,
  onExplore,
  onBook,
  selectable,
  selected,
  onToggleSelect,
  compact,
}: Props) {
  const availabilityLabel =
    service.availability === "available"
      ? "Slots open"
      : service.availability === "limited"
        ? "Limited slots"
        : "Busy — next day";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card)]",
        selected && "ring-2 ring-primary"
      )}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {selectable && (
          <label className="absolute left-3 top-3 flex cursor-pointer items-center gap-2 rounded-lg bg-surface/95 px-2 py-1 text-xs font-medium shadow-sm">
            <input
              type="checkbox"
              checked={selected}
              onChange={onToggleSelect}
              className="accent-primary"
            />
            Compare
          </label>
        )}
        <span className="absolute bottom-3 right-3 rounded-md bg-surface/95 px-2 py-0.5 text-[10px] font-medium text-muted">
          Sample pricing
        </span>
      </div>
      <div className={cn("flex flex-1 flex-col p-4", compact && "p-3")}>
        <h3 className="font-semibold leading-snug text-foreground">{service.title}</h3>
        {!compact && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">{service.shortDescription}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-bold text-primary">{formatINR(service.startingPrice)}</span>
          <span className="flex items-center gap-1 text-muted">
            <Clock className="h-3.5 w-3.5" />
            {Math.round(service.durationMinutes / 60)}h approx
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {service.rating.toFixed(2)} ({service.reviewCount})
          </span>
          <span>{availabilityLabel}</span>
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onExplore}
          >
            Explore
          </Button>
          {onBook && (
            <Button type="button" size="sm" className="flex-1" onClick={onBook}>
              Book
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
