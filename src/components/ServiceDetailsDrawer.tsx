"use client";

import { useRef } from "react";
import Image from "next/image";
import { X, Star, Check, Minus } from "lucide-react";
import type { Service } from "@/types";
import { formatINR } from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { useDialogA11y } from "@/hooks/useDialogA11y";

interface Props {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  onBook: (service: Service) => void;
}

export function ServiceDetailsDrawer({ service, open, onClose, onBook }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  useDialogA11y(open, onClose, panelRef);

  if (!open || !service) return null;

  return (
    <div className="fixed inset-0 z-[65] flex justify-end">
      <div
        className="absolute inset-0 bg-foreground/40 motion-safe:animate-[fade-in_200ms_ease-out]"
        onClick={onClose}
        aria-hidden
      />
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-drawer-title"
        className="relative z-10 flex h-full w-full max-w-lg flex-col bg-surface shadow-elevated motion-safe:animate-[slide-in-right_250ms_ease-out]"
      >
        <div className="relative h-48 shrink-0 sm:h-56">
          <Image src={service.image} alt="" fill className="object-cover" sizes="512px" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-surface/90 p-2 shadow-sm"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <h2 id="service-drawer-title" className="text-xl font-bold">
            {service.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{service.fullDescription}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-muted">({service.reviewCount} reviews · sample)</span>
          </div>

          <section className="mt-6">
            <h3 className="text-sm font-semibold">Packages</h3>
            <ul className="mt-2 space-y-2">
              {service.packages.map((pkg) => (
                <li
                  key={pkg.id}
                  className="rounded-xl border border-border p-3 text-sm"
                >
                  <div className="flex justify-between font-medium">
                    <span>{pkg.name}</span>
                    <span className="text-primary">{formatINR(pkg.price)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {pkg.durationMinutes} min · {pkg.included.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Included</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {service.includedTasks.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Not included</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {service.excludedTasks.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Minus className="h-4 w-4 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {service.addOns.length > 0 && (
            <section className="mt-6">
              <h3 className="text-sm font-semibold">Optional add-ons</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {service.addOns.map((a) => (
                  <li
                    key={a.id}
                    className="flex justify-between rounded-lg bg-accent-soft/50 px-3 py-2"
                  >
                    <span>{a.name}</span>
                    <span className="font-medium">+{formatINR(a.price)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-6">
            <h3 className="text-sm font-semibold">Recent reviews (demo)</h3>
            {service.reviews.map((r) => (
              <blockquote key={r.id} className="mt-3 border-l-2 border-accent pl-3 text-sm">
                <p className="text-muted">{r.comment}</p>
                <footer className="mt-1 text-xs text-muted">
                  — {r.author}, ★ {r.rating}
                </footer>
              </blockquote>
            ))}
          </section>
        </div>
        <div className="border-t border-border p-4">
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-muted">Starts at</span>
            <span className="text-lg font-bold text-primary">
              {formatINR(service.startingPrice)}
            </span>
          </div>
          <Button className="w-full" size="lg" onClick={() => onBook(service)}>
            Book Now
          </Button>
        </div>
      </aside>
    </div>
  );
}
