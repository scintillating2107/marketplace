import type {
  PriceBreakdown,
  ProfessionalMatch,
  RecommendationResult,
  RankedService,
  Service,
  ServiceCategoryId,
  StoredBooking,
} from "@/types";
import { professionals, services } from "@/data/services";

const CATEGORY_RULES: {
  categoryId: ServiceCategoryId;
  patterns: RegExp[];
  problemLabel: string;
}[] = [
  {
    categoryId: "ac",
    patterns: [
      /\b(ac|a\/c|air.?condition|cooling|not cooling|gas|compressor|noise)\b/i,
    ],
    problemLabel: "Air conditioning issue",
  },
  {
    categoryId: "plumbing",
    patterns: [
      /\b(plumb|tap|faucet|leak|leaking|pipe|drain|sink|toilet|water)\b/i,
    ],
    problemLabel: "Plumbing or water issue",
  },
  {
    categoryId: "electricians",
    patterns: [
      /\b(electric|wiring|switch|fuse|mcb|light|flicker|power|socket|geyser)\b/i,
    ],
    problemLabel: "Electrical issue",
  },
  {
    categoryId: "cleaning",
    patterns: [
      /\b(clean|cleaning|dust|dirty|deep clean|bathroom|kitchen clean|sofa)\b/i,
    ],
    problemLabel: "Cleaning need",
  },
  {
    categoryId: "beauty",
    patterns: [
      /\b(salon|hair|haircut|beauty|facial|spa|groom|beard|manicure)\b/i,
    ],
    problemLabel: "Beauty or grooming",
  },
  {
    categoryId: "pest",
    patterns: [
      /\b(pest|cockroach|roach|ant|bug|termite|rodent|mosquito)\b/i,
    ],
    problemLabel: "Pest concern",
  },
  {
    categoryId: "appliance",
    patterns: [
      /\b(fridge|refrigerator|washing|microwave|appliance|stove)\b/i,
    ],
    problemLabel: "Appliance malfunction",
  },
  {
    categoryId: "carpentry",
    patterns: [
      /\b(carpent|door|hinge|drawer|furniture|wood|cabinet|lock)\b/i,
    ],
    problemLabel: "Carpentry or furniture",
  },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function scoreService(service: Service, query: string, categoryId: ServiceCategoryId): number {
  let score = 0;
  const q = normalize(query);

  if (service.categoryId === categoryId) score += 40;

  for (const kw of service.keywords) {
    if (q.includes(kw.toLowerCase())) score += 15;
  }

  if (service.title.toLowerCase().split(" ").some((w) => q.includes(w) && w.length > 3)) {
    score += 10;
  }

  score += service.rating * 2;
  score += Math.min(service.reviewCount / 500, 5);

  if (/\brepair|fix|broken|not working|inspect\b/i.test(q) && /repair|inspect/i.test(service.title)) {
    score += 12;
  }
  if (/\bclean\b/i.test(q) && service.categoryId === "cleaning") score += 15;
  if (/\bleak|tap\b/i.test(q) && service.id.includes("tap")) score += 20;

  return score;
}

function buildExplanation(
  query: string,
  categoryId: ServiceCategoryId,
  top: RankedService | undefined
): string {
  if (!top) {
    return "We couldn't match a specific service. Browse all categories or refine your description.";
  }

  const rule = CATEGORY_RULES.find((r) => r.categoryId === categoryId);
  const base = rule?.problemLabel ?? "General home service";

  if (/\bleak|tap|repair or replace\b/i.test(query)) {
    return `${base} detected. ${top.reason} Starting with an inspection avoids unnecessary replacement costs.`;
  }
  if (/\bac|cool|noise\b/i.test(query)) {
    return `${base} detected. ${top.reason} A diagnostic visit clarifies whether servicing or repair is needed.`;
  }
  if (/\bclean|guest|weekend\b/i.test(query)) {
    return `${base} detected. ${top.reason} Book ahead for preferred slots before busy weekends.`;
  }

  return `${base} detected. ${top.reason}`;
}

export function recommendFromProblem(input: string): RecommendationResult {
  const query = normalize(input);

  if (!query || query.length < 3) {
    return {
      problemDetected: "Describe your issue",
      categoryId: "cleaning",
      explanation: "Add a few words about what you need — for example, a leaking tap or AC not cooling.",
      services: [],
      optionalAddOns: [],
      costRange: { min: 0, max: 0 },
      durationMinutes: 0,
    };
  }

  let bestCategory: ServiceCategoryId = "cleaning";
  let bestCategoryScore = 0;
  let problemDetected = "General home maintenance";

  for (const rule of CATEGORY_RULES) {
    let hits = 0;
    for (const p of rule.patterns) {
      if (p.test(query)) hits++;
    }
    if (hits > bestCategoryScore) {
      bestCategoryScore = hits;
      bestCategory = rule.categoryId;
      problemDetected = rule.problemLabel;
    }
  }

  if (bestCategoryScore === 0) {
    problemDetected = "Uncategorized request";
  }

  const ranked: RankedService[] = services
    .map((service) => {
      const score = scoreService(service, query, bestCategory);
      let reason = "Matches your category and has strong customer ratings.";
      if (service.categoryId !== bestCategory) {
        reason = "Related alternative if your issue spans multiple areas.";
      } else if (/inspect|repair/i.test(service.title)) {
        reason = "Inspection-first approach with transparent pricing before extra work.";
      } else if (/deep|full/i.test(service.title)) {
        reason = "Comprehensive scope suited to thorough home care.";
      }
      return { service, score, reason };
    })
    .filter((r) => r.score > 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const top = ranked[0];
  const explanation = buildExplanation(input, bestCategory, top);

  const optionalAddOns = top?.service.addOns.slice(0, 2) ?? [];
  const prices = ranked.map((r) => r.service.startingPrice);
  const durations = ranked.map((r) => r.service.durationMinutes);

  return {
    problemDetected,
    categoryId: bestCategory,
    explanation,
    services: ranked.length ? ranked : services.slice(0, 2).map((service) => ({
      service,
      score: 20,
      reason: "Popular services you can explore while we refine your match.",
    })),
    optionalAddOns,
    costRange: {
      min: prices.length ? Math.min(...prices) : 199,
      max: prices.length ? Math.max(...prices) + 500 : 999,
    },
    durationMinutes: durations.length ? Math.min(...durations) : 60,
  };
}

export function homeQuickRecommend(input: string): { serviceId: string; blurb: string } | null {
  const result = recommendFromProblem(input);
  const top = result.services[0];
  if (!top) return null;
  return {
    serviceId: top.service.id,
    blurb: result.explanation.split(".")[0] + ".",
  };
}

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
