import type {
  PriceBreakdown,
  ProfessionalMatch,
  Service,
  StoredBooking,
} from "@/types";
import { professionals, services } from "@/data/services";

export { recommendFromProblem, homeQuickRecommend } from "@/lib/recommendations";

export function matchProfessionals(
  service: Service,
  location: string,
  limit = 3
): ProfessionalMatch[] {
  const scored = professionals
    .map((professional) => {
      let score = 0;
      if (professional.categoryIds.includes(service.categoryId)) score += 35;
      else score += 5;

      if (professional.serviceArea.some((a) => a.toLowerCase() === location.toLowerCase())) {
        score += 25;
      } else if (professional.serviceArea.length) {
        score += 8;
      }

      score += professional.rating * 8;
      score += Math.min(professional.completedJobs / 200, 10);

      if (professional.availability === "today") score += 15;
      else if (professional.availability === "tomorrow") score += 10;
      else score += 5;

      const skillOverlap = professional.skills.some((s) =>
        service.title.toLowerCase().includes(s.toLowerCase().split(" ")[0])
      );
      if (skillOverlap) score += 10;

      let reason =
        "Recommended because of relevant experience, strong customer ratings, and availability for your preferred time.";
      if (!professional.categoryIds.includes(service.categoryId)) {
        reason =
          "Available professional with transferable skills — demo matching for prototype purposes.";
      }

      return { professional, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

const PLATFORM_FEE_RATE = 0.05;
const TAX_RATE = 0.18;

export function calculatePriceBreakdown(
  basePrice: number,
  addOns: { price: number }[]
): PriceBreakdown {
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0);
  const subtotal = basePrice + addOnsTotal;
  const platformFee = Math.round(subtotal * PLATFORM_FEE_RATE);
  const tax = Math.round((subtotal + platformFee) * TAX_RATE);
  const total = subtotal + platformFee + tax;
  return { basePrice, addOnsTotal, platformFee, tax, total };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const STORAGE_KEY = "servora_bookings_v1";
const PREFS_KEY = "servora_prefs_v1";

export function loadBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: StoredBooking[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function generateBookingReference(): string {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SRV-${Date.now().toString(36).toUpperCase().slice(-4)}-${part}`;
}

export function getComplementaryServices(serviceId: string): { service: Service; reason: string }[] {
  const booking = services.find((s) => s.id === serviceId);
  if (!booking) return [];

  if (booking.categoryId === "cleaning" && booking.id === "svc-deep-clean") {
    return [
      {
        service: services.find((s) => s.id === "svc-sofa")!,
        reason: "Fresh floors pair well with upholstery cleaning after a deep clean.",
      },
      {
        service: services.find((s) => s.id === "svc-bathroom-clean")!,
        reason: "Extra bathroom focus keeps high-traffic wet areas spotless.",
      },
    ].filter((x) => x.service);
  }

  if (booking.categoryId === "ac") {
    return [
      {
        service: services.find((s) => s.id === "svc-deep-clean")!,
        reason: "AC servicing often coincides with seasonal home refreshes.",
      },
    ].filter((x) => x.service);
  }

  return services
    .filter((s) => s.categoryId === booking.categoryId && s.id !== serviceId)
    .slice(0, 2)
    .map((service) => ({
      service,
      reason: `Customers who booked ${booking.title} often consider ${service.title}.`,
    }));
}

export interface UserPrefs {
  location: string;
}

export function loadPrefs(): UserPrefs {
  if (typeof window === "undefined") return { location: "Mumbai" };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? (JSON.parse(raw) as UserPrefs) : { location: "Mumbai" };
  } catch {
    return { location: "Mumbai" };
  }
}

export function savePrefs(prefs: UserPrefs): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export const TIME_SLOTS = [
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

export function filterServices(options: {
  query?: string;
  categoryId?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "relevance" | "price_asc" | "price_desc" | "rating";
}): Service[] {
  let list = [...services];
  const q = options.query?.toLowerCase().trim();

  if (q) {
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.includes(q))
    );
  }

  if (options.categoryId && options.categoryId !== "all") {
    list = list.filter((s) => s.categoryId === options.categoryId);
  }

  if (options.minRating) {
    list = list.filter((s) => s.rating >= options.minRating!);
  }

  if (options.minPrice !== undefined) {
    list = list.filter((s) => s.startingPrice >= options.minPrice!);
  }
  if (options.maxPrice !== undefined) {
    list = list.filter((s) => s.startingPrice <= options.maxPrice!);
  }

  switch (options.sort) {
    case "price_asc":
      list.sort((a, b) => a.startingPrice - b.startingPrice);
      break;
    case "price_desc":
      list.sort((a, b) => b.startingPrice - a.startingPrice);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      if (q) {
        list.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(q!) ? 1 : 0;
          const bTitle = b.title.toLowerCase().includes(q!) ? 1 : 0;
          return bTitle - aTitle;
        });
      }
  }

  return list;
}
