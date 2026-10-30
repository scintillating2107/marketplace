"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, services as allServices } from "@/data/services";
import { filterServices } from "@/lib/booking";
import type { Service } from "@/types";
import { ServiceCard } from "@/components/ServiceCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";

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
    <div className="container-page py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold">Find the Right Service for You</h1>
        <p className="mt-2 text-muted">
          Search, filter, and compare — then book in a few guided steps.
        </p>
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or keyword"
          />
        </form>
      </header>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">{results.length}</span> services match
        </p>
        <div className="flex flex-wrap gap-2">
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
        <div className="mt-12 flex flex-col items-center py-16 text-center">
          <X className="h-10 w-10 text-muted" />
          <h2 className="mt-4 text-lg font-semibold">No services match</h2>
          <p className="mt-2 text-sm text-muted">Try clearing filters or a broader search term.</p>
          <Button type="button" className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selectable
              selected={compareIds.includes(service.id)}
              onToggleSelect={() => toggleCompare(service.id)}
              onExplore={() => setDrawerService(service)}
              onBook={() => book(service)}
            />
          ))}
        </div>
      )}

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
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-muted">Loading…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
