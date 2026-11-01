"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getServiceById } from "@/data/services";
import type { UcServiceSection } from "@/data/home-sections";
import { UcServiceCard } from "@/components/home/urban/UcServiceCard";

interface Props {
  section: UcServiceSection;
  badges?: Record<number, string>;
}

export function UcServiceCarousel({ section, badges }: Props) {
  const services = section.serviceIds
    .map((id) => getServiceById(id))
    .filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <section className="border-b border-border py-8 sm:py-10" aria-labelledby={section.id}>
      <div className="container-page">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={section.id} className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-0.5 text-sm text-muted">{section.subtitle}</p>
            )}
          </div>
          <Link
            href={section.seeAllHref}
            prefetch={false}
            className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-uc-accent hover:underline"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="-mx-4 mt-5 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:gap-5">
          {services.map((service, i) => (
            <UcServiceCard key={`${service.id}-${i}`} service={service} badge={badges?.[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
