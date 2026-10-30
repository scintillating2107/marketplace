"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ProfessionalOnboardingModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-labelledby="pro-modal-title"
        className="relative z-10 w-full max-w-lg rounded-2xl bg-surface p-6 shadow-elevated"
      >
        <h2 id="pro-modal-title" className="text-xl font-bold text-foreground">
          Join SERVORA as a professional
        </h2>
        <p className="mt-2 text-sm text-muted">
          Demo onboarding — share your skills, service areas, and availability. Our team reviews
          profiles before listing (prototype flow only).
        </p>
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
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted">Primary service</label>
            <select className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm">
              <option>Cleaning</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>AC & Appliances</option>
              <option>Beauty</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted">City</label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
              placeholder="Mumbai"
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
  );
}
