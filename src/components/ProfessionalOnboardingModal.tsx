"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PRO_ONBOARDING_COPY } from "@/data/content";
import { useDialogA11y } from "@/hooks/useDialogA11y";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ProfessionalOnboardingModal({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogA11y(open, onClose, panelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-foreground/50 motion-safe:animate-[fade-in_200ms_ease-out]"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-auto rounded-2xl bg-surface shadow-elevated motion-safe:animate-[fade-in_220ms_ease-out] sm:flex-row"
      >
        <div className="relative h-40 shrink-0 sm:h-auto sm:w-2/5">
          <Image
            src={PRO_ONBOARDING_COPY.image}
            alt=""
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
        <div className="p-6 sm:flex-1">
          <h2 id="pro-modal-title" className="text-xl font-bold text-foreground">
            {PRO_ONBOARDING_COPY.headline}
          </h2>
          {PRO_ONBOARDING_COPY.paragraphs.map((p) => (
            <p key={p.slice(0, 30)} className="mt-2 text-sm text-muted">
              {p}
            </p>
          ))}
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <div>
              <label className="text-xs font-medium text-muted">Full name</label>
              <input
                required
                className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
                placeholder="e.g. Ankit Sharma"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted">Primary service</label>
              <select className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm">
                <option>Cleaning & housekeeping</option>
                <option>Electrical repairs</option>
                <option>Plumbing & drainage</option>
                <option>AC & appliance repair</option>
                <option>Beauty & wellness at home</option>
                <option>Pest control</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted">City & experience</label>
              <input
                required
                className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
                placeholder="Mumbai · 5+ years on-site"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                Submit interest
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs text-muted">
            Sample data only — no real applications are processed in this prototype.
          </p>
        </div>
      </div>
    </div>
  );
}
