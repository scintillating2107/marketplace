import type {
  RecommendationResult,
  RankedService,
  Service,
  ServiceCategoryId,
} from "@/types";
import { services } from "@/data/services";

const CATEGORY_RULES: {
  categoryId: ServiceCategoryId;
  patterns: RegExp[];
  problemLabel: string;
}[] = [
  {
    categoryId: "ac",
    patterns: [/\b(ac|a\/c|air.?condition|cooling|not cooling|gas|compressor|noise)\b/i],
    problemLabel: "Air conditioning issue",
  },
  {
    categoryId: "plumbing",
    patterns: [/\b(plumb|tap|faucet|leak|leaking|pipe|drain|sink|toilet|water)\b/i],
    problemLabel: "Plumbing or water issue",
  },
  {
    categoryId: "electricians",
    patterns: [/\b(electric|wiring|switch|fuse|mcb|light|flicker|power|socket|geyser)\b/i],
    problemLabel: "Electrical issue",
  },
  {
    categoryId: "cleaning",
    patterns: [/\b(clean|cleaning|dust|dirty|deep clean|bathroom|kitchen clean|sofa)\b/i],
    problemLabel: "Cleaning need",
  },
  {
    categoryId: "beauty",
    patterns: [/\b(salon|hair|haircut|beauty|facial|spa|groom|beard|manicure)\b/i],
    problemLabel: "Beauty or grooming",
  },
  {
    categoryId: "pest",
    patterns: [/\b(pest|cockroach|roach|ant|bug|termite|rodent|mosquito)\b/i],
    problemLabel: "Pest concern",
  },
  {
    categoryId: "appliance",
    patterns: [/\b(fridge|refrigerator|washing|microwave|appliance|stove)\b/i],
    problemLabel: "Appliance malfunction",
  },
  {
    categoryId: "carpentry",
    patterns: [/\b(carpent|door|hinge|drawer|furniture|wood|cabinet|lock)\b/i],
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
    services: ranked.length
      ? ranked
      : services.slice(0, 2).map((service) => ({
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
