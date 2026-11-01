"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, services as allServices } from "@/data/services";
import { filterServices } from "@/lib/booking";
import { PAGE_HEROES } from "@/data/content";
import type { Service } from "@/types";
import { ServiceCard } from "@/components/ServiceCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";
import { PageBanner } from "@/components/PageBanner";

const ServiceDetailsDrawer = dynamic(
  () =>
    import("@/components/ServiceDetailsDrawer").then((m) => ({
      default: m.ServiceDetailsDrawer,
    })),
  { ssr: false }
);

const ComparisonModal = dynamic(
  () =>
    import("@/components/ComparisonModal").then((m) => ({
      default: m.ComparisonModal,
    })),
  { ssr: false }
);

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("category") ?? "all";

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState<"relevance" | "price_asc" | "price_desc" | "rating">(
    "relevance"
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [drawerService, setDrawerService] = useState<Service | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (category !== "all") params.set("category", category);
      const next = params.toString();
      const current =
        typeof window !== "undefined"
          ? window.location.search.replace(/^\?/, "")
          : searchParams.toString();
      if (next !== current) {
        router.replace(next ? `/explore?${next}` : "/explore", { scroll: false });
      }
    }, 500);
    return () => window.clearTimeout(handle);
  }, [query, category, router, searchParams]);

  const results = useMemo(
    () =>
      filterServices({
        query,
        categoryId: category,
        minRating: minRating || undefined,
        minPrice,
        maxPrice,
        sort,
      }),
    [query, category, minRating, minPrice, maxPrice, sort]
  );

  const compareServices = allServices.filter((s) => compareIds.includes(s.id));

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setMinRating(0);
    setMinPrice(0);
    setMaxPrice(5000);
    setSort("relevance");
  };

  const book = useCallback(
    (service: Service) => {
      router.push(`/book?serviceId=${service.id}`);
    },
    [router]
  );

  return (
    <>
      <PageBanner title={PAGE_HEROES.explore.title} image={PAGE_HEROES.explore.image} />
      <div className="container-page py-6 sm:py-8">
        <form
          className="max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services"
          />
        </form>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
            category === "all" ? "bg-primary text-white" : "bg-surface border border-border"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              category === cat.id ? "bg-primary text-white" : "bg-surface border border-border"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">{results.length}</span> results
        </p>
        <div className="flex flex-wrap gap-2 max-sm:[&_button]:flex-1 max-sm:[&_button]:justify-center">
          <Button type="button" variant="outline" size="sm" onClick={() => setFiltersOpen(!filtersOpen)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          {compareIds.length > 0 && (
            <Button type="button" size="sm" onClick={() => setCompareOpen(true)}>
              Compare ({compareIds.length})
            </Button>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      </div>

      {filtersOpen && (
        <div className="mt-4 grid gap-4 rounded-xl border border-border bg-surface p-4 sm:grid-cols-4">
          <label className="text-sm">
            Min rating
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border px-2 py-1.5"
            >
              <option value={0}>Any</option>
              <option value={4.7}>4.7+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </label>
          <label className="text-sm">
            Min price (₹)
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border px-2 py-1.5"
            />
          </label>
          <label className="text-sm">
            Max price (₹)
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border px-2 py-1.5"
            />
          </label>
          <label className="text-sm">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="mt-1 w-full rounded-lg border border-border px-2 py-1.5"
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
      )}

      {results.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-xl border border-border px-6 py-12 text-center">
          <X className="h-8 w-8 text-muted" />
          <h2 className="mt-3 font-semibold">No results</h2>
          <Button type="button" className="mt-4" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-2 xl:gap-8">
          {results.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selectable
              selected={compareIds.includes(service.id)}
              onToggleSelect={() => toggleCompare(service.id)}
              onExplore={() => setDrawerService(service)}
            />
          ))}
        </div>
      )}

      </div>

      <ServiceDetailsDrawer
        service={drawerService}
        open={!!drawerService}
        onClose={() => setDrawerService(null)}
        onBook={(s) => {
          setDrawerService(null);
          book(s);
        }}
      />

      <ComparisonModal
        services={compareServices}
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
      />
    </>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-muted">Loading…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
