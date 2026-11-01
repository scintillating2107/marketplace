"use client";

import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import type { ProfessionalMatch } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  match: ProfessionalMatch;
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
}

export function ProfessionalCard({ match, selected, onSelect, recommended }: Props) {
  const { professional, reason } = match;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-[var(--radius-card)] border border-border bg-surface p-4 text-left shadow-[var(--shadow-card)] transition-all hover:border-primary/40",
        selected && "ring-2 ring-primary",
        recommended && !selected && "border-primary/30"
      )}
    >
      {recommended && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <BadgeCheck className="h-3 w-3" />
          Top match (demo)
        </span>
      )}
      <div className="flex gap-3">
        <Image
          src={professional.image}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{professional.name}</h3>
            <span className="flex items-center gap-0.5 text-sm">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {professional.rating}
            </span>
          </div>
          <p className="text-xs text-muted">
            {professional.experienceYears} yrs · {professional.completedJobs} jobs ·{" "}
            {professional.reviewCount} reviews
          </p>
          <p className="mt-1 text-xs text-primary">{professional.arrivalEstimate}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">{professional.skills.join(" · ")}</p>
      {professional.bio && (
        <p className="mt-2 text-xs leading-relaxed text-muted">{professional.bio}</p>
      )}
      <p className="mt-2 rounded-lg bg-background px-2 py-1.5 text-xs text-muted">
        {reason}
      </p>
      <p className="mt-2 text-[10px] text-muted">Sample professional — not a live dispatch.</p>
    </button>
  );
}
