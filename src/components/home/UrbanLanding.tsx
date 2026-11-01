"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UC_SPOTLIGHT, UC_SERVICE_SECTIONS, UC_TRUST } from "@/data/home-sections";
import { POPULAR_SEARCHES } from "@/data/services";
import { UcSpotlightRow } from "@/components/home/urban/UcSpotlightRow";
import { UcServiceCarousel } from "@/components/home/urban/UcServiceCarousel";
import { UcHeroCategoryGrid } from "@/components/home/urban/UcHeroCategoryGrid";
import { UcHeroCollage } from "@/components/home/urban/UcHeroCollage";

const MOST_BOOKED_BADGES: Record<number, string> = {
  0: "Super saver",
};

export function UrbanLanding() {
  const router = useRouter();
  const [mostBooked, ...restSections] = UC_SERVICE_SECTIONS;

  const runSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 sm:py-10 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div className="min-w-0">
              <h1 className="text-[1.65rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[2.125rem] lg:leading-[1.15]">
                Home services at your doorstep
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => runSearch(term)}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div className="mt-6 sm:mt-8">
                <UcHeroCategoryGrid />
              </div>
            </div>
            <div className="min-w-0 lg:max-h-[520px]">
              <UcHeroCollage />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-5">
        <div className="container-page flex flex-wrap items-center gap-x-10 gap-y-3">
          <div>
            <p className="text-xl font-bold text-foreground">{UC_TRUST.rating}</p>
            <p className="text-[11px] text-muted">{UC_TRUST.ratingLabel}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{UC_TRUST.customers}</p>
            <p className="text-[11px] text-muted">{UC_TRUST.customersLabel}</p>
          </div>
        </div>
      </section>

      <UcSpotlightRow title="In the spotlight" tiles={UC_SPOTLIGHT} seeAllHref="/explore" />

      {mostBooked && <UcServiceCarousel section={mostBooked} badges={MOST_BOOKED_BADGES} />}

      {restSections.map((section) => (
        <UcServiceCarousel key={section.id} section={section} />
      ))}

      <section className="container-page py-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-foreground px-6 py-8 text-white sm:px-8">
          <h2 className="text-lg font-bold sm:text-xl">Book your next service</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-foreground hover:bg-white/90"
            >
              Explore
            </Link>
            <Link
              href="/assistant"
              className="inline-flex rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10"
            >
              InstaHelp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
