import type { Service } from "@/types";

export function formatReviewCount(count: number): string {
  if (count >= 1_000_000) {
    const m = count / 1_000_000;
    return m >= 10 ? `${Math.round(m)}M` : `${m.toFixed(1)}M`;
  }
  if (count >= 1_000) {
    const k = count / 1_000;
    return k >= 100 ? `${Math.round(k)}K` : `${k.toFixed(0)}K`;
  }
  return String(count);
}

export function listPriceFrom(service: Service): number {
  return Math.round(service.startingPrice * (1.08 + (service.id.length % 5) * 0.04));
}

export function formatRating(rating: number): string {
  return rating.toFixed(2);
}
