"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { HOME_FAQ } from "@/data/content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-page py-16 sm:py-20">
      <p className="section-eyebrow text-center">FAQ</p>
      <h2 className="mt-2 text-center text-2xl font-extrabold sm:text-3xl">Common questions</h2>
      <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-surface">
        {HOME_FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold sm:text-base"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                {item.q}
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-primary transition-transform", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
