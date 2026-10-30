"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Shield,
  Receipt,
  Calendar,
  Star,
  ClipboardList,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";
import {
  categories,
  services,
  POPULAR_SEARCHES,
  LOCATIONS,
} from "@/data/services";
import { homeQuickRecommend } from "@/lib/booking";
import { useApp } from "@/context/AppContext";
import { CategoryCard } from "@/components/CategoryCard";
import { ServiceCard } from "@/components/ServiceCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";
import { ProfessionalOnboardingModal } from "@/components/ProfessionalOnboardingModal";

export default function HomePage() {
  const router = useRouter();
  const { location, setLocation } = useApp();
  const [query, setQuery] = useState("");
  const [problem, setProblem] = useState("");
  const [quickMatch, setQuickMatch] = useState<{ serviceId: string; blurb: string } | null>(
    null
  );
  const [proOpen, setProOpen] = useState(false);

  const popularServices = services.slice(0, 4);

  const runSearch = (q: string) => {
    router.push(`/explore?q=${encodeURIComponent(q.trim())}`);
  };

  const analyzeProblem = () => {
    const match = homeQuickRecommend(problem);
    setQuickMatch(match);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Reliable services. Smarter choices. Less hassle.
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Your Home Deserves Better Care.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted">
              From everyday repairs to expert home services, find the right professional without
              the usual hassle.
            </p>

            <form
              className="mt-8 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                runSearch(query);
              }}
            >
              <SearchBar
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try AC servicing, deep cleaning, electrician…"
              />
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent outline-none"
                    aria-label="Location"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" size="lg">
                  Find a Service
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => runSearch(term)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-primary/40 hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated lg:aspect-auto lg:h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=900&fit=crop"
              alt="Professional providing home service"
              fill
              className="object-cover"
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-surface/95 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium">Transparent pricing · Sample demo data</p>
              <p className="text-xs text-muted">See estimates before you book</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Explore by category</h2>
            <p className="mt-1 text-muted">Curated for how you actually live at home.</p>
          </div>
          <Link href="/explore" className="hidden text-sm font-medium text-primary sm:inline-flex">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              href={`/explore?category=${cat.id}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-accent-soft/30 py-14">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Popular services</h2>
          <p className="mt-1 text-muted">Starting prices shown — final quote at booking.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onExplore={() => router.push(`/explore?q=${encodeURIComponent(service.title)}`)}
                onBook={() => router.push(`/book?serviceId=${service.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 rounded-2xl border border-border bg-surface p-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Smart Service Finder
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-bold">Not Sure What You Need?</h2>
            <p className="mt-2 text-muted">
              Describe the problem — our rule-based assistant suggests a sensible starting service
              with a clear explanation.
            </p>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows={3}
              placeholder="My AC is making noise and isn't cooling properly."
              className="mt-4 w-full rounded-xl border border-border px-4 py-3 text-sm"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button type="button" onClick={analyzeProblem}>
                Get recommendation
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  router.push(
                    `/assistant?problem=${encodeURIComponent(problem || "My AC is not cooling")}`
                  )
                }
              >
                Open full assistant
              </Button>
            </div>
          </div>
          <div className="rounded-xl bg-background p-6">
            {quickMatch ? (
              <>
                <p className="text-sm font-semibold text-primary">Suggested service</p>
                <p className="mt-2 text-lg font-bold">
                  {services.find((s) => s.id === quickMatch.serviceId)?.title}
                </p>
                <p className="mt-2 text-sm text-muted">{quickMatch.blurb}</p>
                <Button
                  type="button"
                  className="mt-4"
                  onClick={() =>
                    router.push(
                      `/assistant?problem=${encodeURIComponent(problem)}&serviceId=${quickMatch.serviceId}`
                    )
                  }
                >
                  Continue with this match
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted">
                Enter a problem above to see an instant recommendation — or open the full assistant
                for a conversational flow.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold">Why SERVORA</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: Shield,
                title: "Verified-style profiles",
                text: "Demo profiles show how verification appears at booking time.",
              },
              {
                icon: Receipt,
                title: "Transparent pricing",
                text: "Itemized estimates with fees and tax before you confirm.",
              },
              {
                icon: Calendar,
                title: "Flexible scheduling",
                text: "Pick date and slot that fit your routine.",
              },
              {
                icon: Star,
                title: "Real review patterns",
                text: "Sample ratings illustrate trust signals on cards.",
              },
              {
                icon: ClipboardList,
                title: "Booking management",
                text: "Track status and rebook from your dashboard.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border p-5 text-center">
                <Icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-xs text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-8 py-10 text-white sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold">Grow with SERVORA</h2>
            <p className="mt-2 text-white/80">
              Join as a professional — demo onboarding, no live marketplace signup.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-accent-soft"
            onClick={() => setProOpen(true)}
          >
            Become a Professional
          </Button>
        </div>
      </section>

      <ProfessionalOnboardingModal open={proOpen} onClose={() => setProOpen(false)} />
    </>
  );
}
