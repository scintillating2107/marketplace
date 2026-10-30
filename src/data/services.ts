import type { ServiceCategory, Service, Professional } from "@/types";

export const LOCATIONS = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
];

export const categories: ServiceCategory[] = [
  {
    id: "cleaning",
    title: "Cleaning",
    description: "Deep cleans, bathroom & kitchen specialists",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
  },
  {
    id: "electricians",
    title: "Electricians",
    description: "Wiring, fixtures & safety checks",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description: "Leaks, taps, drains & inspections",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca27e27?w=600&h=400&fit=crop",
  },
  {
    id: "appliance",
    title: "Appliance Repair",
    description: "Fridge, washer & microwave fixes",
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&h=400&fit=crop",
  },
  {
    id: "ac",
    title: "AC Services",
    description: "Servicing, gas refill & repairs",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
  },
  {
    id: "beauty",
    title: "Beauty & Wellness",
    description: "Salon at home & spa rituals",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
  },
  {
    id: "pest",
    title: "Pest Control",
    description: "Safe treatments for home pests",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
  {
    id: "carpentry",
    title: "Carpentry",
    description: "Furniture, doors & custom fixes",
    image:
      "https://images.unsplash.com/photo-1581858723640-188c4e0ecbf1?w=600&h=400&fit=crop",
  },
];

const defaultReviews = (serviceName: string) => [
  {
    id: "r1",
    author: "Priya M.",
    rating: 5,
    date: "2025-09-12",
    comment: `Professional and punctual. ${serviceName} was done exactly as described.`,
  },
  {
    id: "r2",
    author: "Rahul K.",
    rating: 4,
    date: "2025-08-28",
    comment: "Clear pricing upfront. Would book again.",
  },
];

export const services: Service[] = [
  {
    id: "svc-deep-clean",
    slug: "full-home-deep-cleaning",
    title: "Full Home Deep Cleaning",
    shortDescription: "Intensive clean for every room with eco-friendly products.",
    fullDescription:
      "Our deep cleaning service covers living areas, bedrooms, kitchen, and bathrooms with detailed attention to corners, surfaces, and high-touch points. Ideal before festivals or after renovations.",
    categoryId: "cleaning",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=600&fit=crop",
    startingPrice: 2499,
    durationMinutes: 240,
    rating: 4.82,
    reviewCount: 1240,
    availability: "available",
    keywords: ["deep clean", "home cleaning", "house clean", "full home"],
    includedTasks: [
      "Floor mopping & vacuuming",
      "Kitchen degreasing",
      "Bathroom sanitization",
      "Dusting all accessible surfaces",
    ],
    excludedTasks: ["Exterior windows", "Heavy furniture moving"],
    packages: [
      {
        id: "pkg-1bhk",
        name: "1 BHK Package",
        price: 2499,
        durationMinutes: 180,
        included: ["1 bedroom", "Hall", "Kitchen", "1 bathroom"],
      },
      {
        id: "pkg-2bhk",
        name: "2 BHK Package",
        price: 3499,
        durationMinutes: 240,
        included: ["2 bedrooms", "Hall", "Kitchen", "2 bathrooms"],
      },
    ],
    addOns: [
      { id: "ao-sofa", name: "Sofa shampooing", price: 799 },
      { id: "ao-balcony", name: "Balcony cleaning", price: 399 },
    ],
    reviews: defaultReviews("Deep cleaning"),
  },
  {
    id: "svc-bathroom-clean",
    slug: "bathroom-deep-cleaning",
    title: "Bathroom Deep Cleaning",
    shortDescription: "Scale removal, sanitization & fixture polish.",
    fullDescription:
      "Focused bathroom service targeting tiles, grout, taps, and sanitaryware with anti-bacterial treatment.",
    categoryId: "cleaning",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
    startingPrice: 599,
    durationMinutes: 90,
    rating: 4.76,
    reviewCount: 890,
    availability: "available",
    keywords: ["bathroom", "toilet clean", "tiles"],
    includedTasks: ["Tile scrubbing", "Tap descaling", "Exhaust fan wipe"],
    excludedTasks: ["Plumbing repairs"],
    packages: [
      {
        id: "pkg-bath-1",
        name: "Single Bathroom",
        price: 599,
        durationMinutes: 90,
        included: ["One bathroom up to 80 sq ft"],
      },
    ],
    addOns: [{ id: "ao-chemical", name: "Premium anti-scale treatment", price: 199 }],
    reviews: defaultReviews("Bathroom cleaning"),
  },
  {
    id: "svc-electrician",
    slug: "electrician-visit",
    title: "Electrician Visit & Repair",
    shortDescription: "Switchboards, wiring issues & fixture installation.",
    fullDescription:
      "Licensed electricians diagnose electrical faults, replace fixtures, and ensure safety compliance. Parts billed separately with approval.",
    categoryId: "electricians",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
    startingPrice: 249,
    durationMinutes: 60,
    rating: 4.79,
    reviewCount: 2100,
    availability: "limited",
    keywords: ["electrician", "wiring", "switch", "fuse", "power"],
    includedTasks: ["Diagnosis", "Basic repairs", "Safety check"],
    excludedTasks: ["Major rewiring without site survey"],
    packages: [
      {
        id: "pkg-elec-basic",
        name: "Standard Visit",
        price: 249,
        durationMinutes: 60,
        included: ["Up to 1 hour on-site", "Diagnosis report"],
      },
      {
        id: "pkg-elec-extended",
        name: "Extended Repair",
        price: 449,
        durationMinutes: 120,
        included: ["Up to 2 hours", "Minor parts fitting"],
      },
    ],
    addOns: [{ id: "ao-mcb", name: "MCB replacement (labour)", price: 150 }],
    reviews: defaultReviews("Electrician visit"),
  },
  {
    id: "svc-plumber-inspect",
    slug: "tap-repair-inspection",
    title: "Tap Repair & Inspection",
    shortDescription: "Leak assessment with repair or replacement guidance.",
    fullDescription:
      "A plumber inspects leaking taps, valves, and connections, then recommends the most cost-effective fix before any extra work.",
    categoryId: "plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca27e27?w=800&h=600&fit=crop",
    startingPrice: 199,
    durationMinutes: 45,
    rating: 4.81,
    reviewCount: 1560,
    availability: "available",
    keywords: ["plumber", "tap", "leak", "kitchen", "pipe", "drain"],
    includedTasks: ["Leak detection", "Washer replacement if needed", "Water pressure check"],
    excludedTasks: ["Concealed pipeline replacement"],
    packages: [
      {
        id: "pkg-tap",
        name: "Inspection + Minor Fix",
        price: 199,
        durationMinutes: 45,
        included: ["One fixture", "Basic spare parts"],
      },
    ],
    addOns: [{ id: "ao-tap-new", name: "Premium tap installation", price: 350 }],
    reviews: defaultReviews("Tap repair"),
  },
  {
    id: "svc-plumber-drain",
    slug: "drain-unclogging",
    title: "Drain Unclogging Service",
    shortDescription: "Kitchen & bathroom blockages cleared safely.",
    fullDescription:
      "Mechanical and eco-safe methods to restore flow in sinks and floor drains without damaging pipes.",
    categoryId: "plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca27e27?w=800&h=600&fit=crop",
    startingPrice: 349,
    durationMinutes: 60,
    rating: 4.74,
    reviewCount: 670,
    availability: "available",
    keywords: ["blocked", "sink", "drain", "clog"],
    includedTasks: ["Snaking / jetting as needed", "Flow test"],
    excludedTasks: ["Underground line excavation"],
    packages: [
      {
        id: "pkg-drain",
        name: "Single Drain",
        price: 349,
        durationMinutes: 60,
        included: ["One drain point"],
      },
    ],
    addOns: [],
    reviews: defaultReviews("Drain service"),
  },
  {
    id: "svc-ac-service",
    slug: "ac-servicing",
    title: "AC Standard Servicing",
    shortDescription: "Filter clean, coil wash & performance check.",
    fullDescription:
      "Seasonal AC maintenance to improve cooling efficiency and reduce power consumption. Includes basic gas level check.",
    categoryId: "ac",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    startingPrice: 499,
    durationMinutes: 75,
    rating: 4.85,
    reviewCount: 3200,
    availability: "available",
    keywords: ["ac", "air conditioner", "cooling", "service", "filter"],
    includedTasks: ["Filter cleaning", "Indoor coil wash", "Drain pipe flush"],
    excludedTasks: ["Gas refill (quoted separately if low)"],
    packages: [
      {
        id: "pkg-ac-split",
        name: "Split AC Service",
        price: 499,
        durationMinutes: 75,
        included: ["One split unit"],
      },
      {
        id: "pkg-ac-window",
        name: "Window AC Service",
        price: 399,
        durationMinutes: 60,
        included: ["One window unit"],
      },
    ],
    addOns: [{ id: "ao-ac-gas", name: "Gas refill (if required)", price: 1999 }],
    reviews: defaultReviews("AC servicing"),
  },
  {
    id: "svc-ac-repair",
    slug: "ac-inspection-repair",
    title: "AC Inspection & Repair",
    shortDescription: "Noise, weak cooling & leak diagnostics.",
    fullDescription:
      "Technicians identify compressor issues, refrigerant leaks, or fan faults and provide a transparent quote before repairs.",
    categoryId: "ac",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    startingPrice: 299,
    durationMinutes: 90,
    rating: 4.78,
    reviewCount: 980,
    availability: "limited",
    keywords: ["ac repair", "not cooling", "noise", "water leakage ac"],
    includedTasks: ["Full diagnostic", "Performance test", "Repair estimate"],
    excludedTasks: ["Compressor replacement without approval"],
    packages: [
      {
        id: "pkg-ac-insp",
        name: "Diagnostic Visit",
        price: 299,
        durationMinutes: 90,
        included: ["Inspection report", "First-hour labour"],
      },
    ],
    addOns: [{ id: "ao-ac-part", name: "Common spare (capacitor etc.)", price: 650 }],
    reviews: defaultReviews("AC repair"),
  },
  {
    id: "svc-fridge",
    slug: "refrigerator-repair",
    title: "Refrigerator Repair",
    shortDescription: "Cooling loss, noise & water leakage fixes.",
    fullDescription:
      "Appliance specialists service single and double-door refrigerators with genuine-part recommendations.",
    categoryId: "appliance",
    image:
      "https://images.unsplash.com/photo-1571175449640-58b1d02b2e2d?w=800&h=600&fit=crop",
    startingPrice: 349,
    durationMinutes: 90,
    rating: 4.72,
    reviewCount: 540,
    availability: "available",
    keywords: ["fridge", "refrigerator", "appliance", "not cooling"],
    includedTasks: ["Diagnosis", "Thermostat check", "Door seal inspection"],
    excludedTasks: ["Panel replacement without quote"],
    packages: [
      {
        id: "pkg-fridge",
        name: "Standard Repair Visit",
        price: 349,
        durationMinutes: 90,
        included: ["Up to 90 min labour"],
      },
    ],
    addOns: [],
    reviews: defaultReviews("Fridge repair"),
  },
  {
    id: "svc-salon",
    slug: "salon-at-home",
    title: "Salon at Home — Classic",
    shortDescription: "Haircut, blow-dry & basic grooming at your doorstep.",
    fullDescription:
      "Hygiene-first beauty professionals bring sanitized kits for cuts, styling, and basic grooming in the comfort of your home.",
    categoryId: "beauty",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    startingPrice: 699,
    durationMinutes: 90,
    rating: 4.88,
    reviewCount: 1800,
    availability: "available",
    keywords: ["salon", "beauty", "haircut", "spa", "facial"],
    includedTasks: ["Consultation", "Hair wash", "Cut & style"],
    excludedTasks: ["Advanced colour without patch test"],
    packages: [
      {
        id: "pkg-salon-w",
        name: "Women — Cut & Blow-dry",
        price: 699,
        durationMinutes: 90,
        included: ["Haircut", "Wash", "Basic styling"],
      },
      {
        id: "pkg-salon-m",
        name: "Men — Haircut & Beard",
        price: 499,
        durationMinutes: 60,
        included: ["Haircut", "Beard trim"],
      },
    ],
    addOns: [{ id: "ao-facial", name: "Express facial add-on", price: 599 }],
    reviews: defaultReviews("Salon at home"),
  },
  {
    id: "svc-pest",
    slug: "general-pest-control",
    title: "General Pest Control",
    shortDescription: "Cockroaches, ants & common household pests.",
    fullDescription:
      "Odour-controlled treatment with follow-up guidance. Safe for pets when instructions are followed.",
    categoryId: "pest",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    startingPrice: 899,
    durationMinutes: 120,
    rating: 4.69,
    reviewCount: 430,
    availability: "available",
    keywords: ["pest", "cockroach", "ant", "bugs", "termite"],
    includedTasks: ["Site assessment", "Gel & spray treatment", "Entry point sealing tips"],
    excludedTasks: ["Structural fumigation"],
    packages: [
      {
        id: "pkg-pest-1bhk",
        name: "1 BHK Treatment",
        price: 899,
        durationMinutes: 120,
        included: ["Kitchen & wet areas focus"],
      },
    ],
    addOns: [{ id: "ao-bedbug", name: "Bed bug follow-up visit", price: 499 }],
    reviews: defaultReviews("Pest control"),
  },
  {
    id: "svc-carpentry",
    slug: "furniture-carpentry",
    title: "Furniture & Door Carpentry",
    shortDescription: "Hinges, drawers, locks & minor woodwork.",
    fullDescription:
      "Skilled carpenters fix alignment issues, install hardware, and restore functional furniture without full replacements.",
    categoryId: "carpentry",
    image:
      "https://images.unsplash.com/photo-1581858723640-188c4e0ecbf1?w=800&h=600&fit=crop",
    startingPrice: 299,
    durationMinutes: 90,
    rating: 4.75,
    reviewCount: 620,
    availability: "available",
    keywords: ["carpenter", "door", "furniture", "wood", "cabinet"],
    includedTasks: ["Hardware adjustment", "Minor patching", "Measurement advice"],
    excludedTasks: ["Custom wardrobe build"],
    packages: [
      {
        id: "pkg-carp",
        name: "Standard Visit",
        price: 299,
        durationMinutes: 90,
        included: ["Up to 2 fixtures"],
      },
    ],
    addOns: [{ id: "ao-lock", name: "Lock set installation", price: 250 }],
    reviews: defaultReviews("Carpentry"),
  },
  {
    id: "svc-sofa",
    slug: "sofa-deep-cleaning",
    title: "Sofa Deep Cleaning",
    shortDescription: "Fabric & leather shampoo with stain treatment.",
    fullDescription:
      "Extract dirt and allergens from upholstery using professional-grade equipment.",
    categoryId: "cleaning",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
    startingPrice: 999,
    durationMinutes: 120,
    rating: 4.8,
    reviewCount: 510,
    availability: "available",
    keywords: ["sofa", "upholstery", "couch clean"],
    includedTasks: ["Vacuum extract", "Shampoo", "Deodorizing"],
    excludedTasks: ["Structural repair"],
    packages: [
      {
        id: "pkg-sofa-3",
        name: "3 Seater",
        price: 999,
        durationMinutes: 120,
        included: ["One sofa up to 3 seats"],
      },
    ],
    addOns: [],
    reviews: defaultReviews("Sofa cleaning"),
  },
];

export const professionals: Professional[] = [
  {
    id: "pro-1",
    name: "Ankit Sharma",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    skills: ["AC repair", "Appliance diagnostics", "Electrical safety"],
    rating: 4.92,
    reviewCount: 312,
    completedJobs: 890,
    experienceYears: 7,
    serviceArea: ["Mumbai", "Pune"],
    availability: "today",
    arrivalEstimate: "60–90 min",
    categoryIds: ["ac", "appliance", "electricians"],
  },
  {
    id: "pro-2",
    name: "Sneha Reddy",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    skills: ["Deep cleaning", "Sanitization", "Eco products"],
    rating: 4.89,
    reviewCount: 445,
    completedJobs: 1200,
    experienceYears: 5,
    serviceArea: ["Bangalore", "Hyderabad", "Chennai"],
    availability: "tomorrow",
    arrivalEstimate: "Morning slot",
    categoryIds: ["cleaning", "pest"],
  },
  {
    id: "pro-3",
    name: "Vikram Patel",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    skills: ["Plumbing", "Tap & drain work", "Leak detection"],
    rating: 4.86,
    reviewCount: 278,
    completedJobs: 650,
    experienceYears: 9,
    serviceArea: ["Delhi NCR", "Mumbai"],
    availability: "today",
    arrivalEstimate: "45–75 min",
    categoryIds: ["plumbing"],
  },
  {
    id: "pro-4",
    name: "Meera Iyer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    skills: ["Salon at home", "Hair styling", "Hygiene protocols"],
    rating: 4.94,
    reviewCount: 520,
    completedJobs: 980,
    experienceYears: 6,
    serviceArea: ["Mumbai", "Bangalore", "Pune"],
    availability: "this_week",
    arrivalEstimate: "As per slot",
    categoryIds: ["beauty"],
  },
  {
    id: "pro-5",
    name: "Rohit Das",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    skills: ["Carpentry", "Furniture repair", "Door alignment"],
    rating: 4.77,
    reviewCount: 190,
    completedJobs: 420,
    experienceYears: 8,
    serviceArea: ["Kolkata", "Delhi NCR"],
    availability: "tomorrow",
    arrivalEstimate: "Afternoon",
    categoryIds: ["carpentry"],
  },
  {
    id: "pro-6",
    name: "Karan Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    skills: ["Electrician", "Switchboards", "Fan & light install"],
    rating: 4.83,
    reviewCount: 401,
    completedJobs: 1100,
    experienceYears: 10,
    serviceArea: ["Delhi NCR", "Hyderabad"],
    availability: "today",
    arrivalEstimate: "30–60 min",
    categoryIds: ["electricians"],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export const POPULAR_SEARCHES = [
  "AC servicing",
  "Deep cleaning",
  "Electrician",
  "Bathroom cleaning",
  "Plumbing",
  "Salon at home",
];

export const ASSISTANT_PROMPTS = [
  "My AC is making noise and isn't cooling properly.",
  "My kitchen tap is leaking — repair or replace?",
  "Lights flicker when I turn on the geyser.",
  "Need a deep clean before guests arrive this weekend.",
  "Cockroaches in the kitchen cabinets again.",
];
