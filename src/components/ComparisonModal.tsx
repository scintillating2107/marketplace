"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import type { Service } from "@/types";
import { formatINR } from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { useDialogA11y } from "@/hooks/useDialogA11y";

interface Props {
  services: Service[];
  open: boolean;
  onClose: () => void;
}

export function ComparisonModal({ services, open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogA11y(open, onClose, panelRef);

  if (!open || services.length === 0) return null;

  const highlight = (values: (string | number)[], index: number) => {
    const numeric = values.every((v) => typeof v === "number");
    if (numeric) {
      const nums = values as number[];
      const best = Math.min(...nums);
      return nums[index] === best ? "font-bold text-primary" : "";
    }
    return "";
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 motion-safe:animate-[fade-in_200ms_ease-out]" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-surface p-6 shadow-elevated motion-safe:animate-[fade-in_220ms_ease-out]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="compare-modal-title" className="text-xl font-bold">Compare services</h2>
            <p className="mt-1 text-sm text-muted">
              Meaningful differences highlighted — lower price and higher ratings stand out.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr>
                <th className="pb-3 pr-4 font-medium text-muted">Attribute</th>
                {services.map((s) => (
                  <th key={s.id} className="pb-3 pr-4 font-semibold">
                    {s.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 pr-4 text-muted">Starting price</td>
                {services.map((s, i) => (
                  <td
                    key={s.id}
                    className={`py-3 pr-4 ${highlight(
                      services.map((x) => x.startingPrice),
                      i
                    )}`}
                  >
                    {formatINR(s.startingPrice)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 text-muted">Duration</td>
                {services.map((s) => (
                  <td key={s.id} className="py-3 pr-4">
                    ~{s.durationMinutes} min
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 text-muted">Rating</td>
                {services.map((s, i) => (
                  <td
                    key={s.id}
                    className={`py-3 pr-4 ${highlight(
                      services.map((x) => -x.rating),
                      i
                    )}`}
                  >
                    {s.rating} ★
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top text-muted">Included tasks</td>
                {services.map((s) => (
                  <td key={s.id} className="py-3 pr-4 align-top">
                    <ul className="list-disc pl-4 text-muted">
                      {s.includedTasks.slice(0, 3).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top text-muted">Add-ons</td>
                {services.map((s) => (
                  <td key={s.id} className="py-3 pr-4 align-top text-muted">
                    {s.addOns.length
                      ? s.addOns.map((a) => a.name).join(", ")
                      : "None listed"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 text-muted">Key difference</td>
                {services.map((s) => (
                  <td key={s.id} className="py-3 pr-4 text-muted">
                    {s.excludedTasks[0] ?? s.shortDescription}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
