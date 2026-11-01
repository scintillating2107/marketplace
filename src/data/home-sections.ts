import type { ServiceCategoryId } from "@/types";
import { categories, getServiceById } from "@/data/services";

const catImg = (id: ServiceCategoryId) =>
  categories.find((c) => c.id === id)?.image ?? categories[0].image;

const svcImg = (id: string) => getServiceById(id)?.image ?? catImg("cleaning");

const PAINTING_IMAGE =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop";

export const UC_TRUST = {
  rating: "4.8",
  ratingLabel: "Service Rating*",
  customers: "12M+",
  customersLabel: "Customers Globally*",
};

export interface UcCategoryTile {
  id: string;
  label: string;
  href: string;
  image: string;
  accent?: string;
}

export const UC_HERO_COLLAGE = [
  { src: svcImg("svc-salon"), alt: "Salon at home" },
  { src: catImg("beauty"), alt: "Spa and grooming" },
  { src: svcImg("svc-ac-service"), alt: "AC service" },
] as const;

/** Main grid — mirrors Urban Company home category tiles */
export const UC_MAIN_CATEGORIES: UcCategoryTile[] = [
  {
    id: "instahelp",
    label: "InstaHelp",
    href: "/assistant",
    image: catImg("beauty"),
  },
  {
    id: "beauty-w",
    label: "Women's salon & spa",
    href: "/explore?category=beauty",
    image: svcImg("svc-salon"),
  },
  {
    id: "beauty-m",
    label: "Men's salon & massage",
    href: "/explore?category=beauty",
    image: catImg("beauty"),
  },
  {
    id: "cleaning",
    label: "Cleaning & pest control",
    href: "/explore?category=cleaning",
    image: svcImg("svc-deep-clean"),
  },
  {
    id: "wall",
    label: "Wall makeover",
    href: "/explore?category=carpentry",
    image: catImg("carpentry"),
  },
  {
    id: "painting",
    label: "Painting & water-proofing",
    href: "/explore",
    image: PAINTING_IMAGE,
  },
  {
    id: "ac",
    label: "AC & appliance repair",
    href: "/explore?category=ac",
    image: svcImg("svc-ac-service"),
  },
  {
    id: "repair",
    label: "Electrician, plumber & carpenter",
    href: "/explore?category=electricians",
    image: svcImg("svc-electrician"),
  },
];

export const UC_SPOTLIGHT: UcCategoryTile[] = [
  {
    id: "deep",
    label: "Full home cleaning",
    href: "/book?serviceId=svc-deep-clean",
    image: svcImg("svc-deep-clean"),
  },
  {
    id: "ac",
    label: "AC service",
    href: "/book?serviceId=svc-ac-service",
    image: svcImg("svc-ac-service"),
  },
  {
    id: "salon",
    label: "Salon at home",
    href: "/book?serviceId=svc-salon",
    image: svcImg("svc-salon"),
  },
  {
    id: "electric",
    label: "Electrician visit",
    href: "/book?serviceId=svc-electrician",
    image: svcImg("svc-electrician"),
  },
  {
    id: "sofa",
    label: "Sofa cleaning",
    href: "/book?serviceId=svc-sofa",
    image: svcImg("svc-sofa"),
  },
];

export const UC_NATIVE_PRODUCTS: UcCategoryTile[] = [
  {
    id: "native-1",
    label: "Smart water purifier",
    href: "/explore?category=appliance",
    image: svcImg("svc-fridge"),
  },
  {
    id: "native-2",
    label: "Native AC care kit",
    href: "/explore?category=ac",
    image: svcImg("svc-ac-repair"),
  },
  {
    id: "native-3",
    label: "Home security check",
    href: "/explore?category=electricians",
    image: svcImg("svc-electrician"),
  },
  {
    id: "native-4",
    label: "Eco pest shield",
    href: "/explore?category=pest",
    image: svcImg("svc-pest"),
  },
];

export interface UcServiceSection {
  id: string;
  title: string;
  subtitle?: string;
  seeAllHref: string;
  serviceIds: string[];
  categoryId?: ServiceCategoryId;
}

export const UC_SERVICE_SECTIONS: UcServiceSection[] = [
  {
    id: "most-booked",
    title: "Most booked services",
    seeAllHref: "/explore",
    serviceIds: [
      "svc-bathroom-clean",
      "svc-ac-service",
      "svc-sofa",
      "svc-ac-repair",
      "svc-deep-clean",
      "svc-salon",
      "svc-electrician",
      "svc-plumber-inspect",
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning essentials",
    seeAllHref: "/explore?category=cleaning",
    categoryId: "cleaning",
    serviceIds: [
      "svc-bathroom-clean",
      "svc-sofa",
      "svc-deep-clean",
      "svc-bathroom-clean",
      "svc-pest",
    ],
  },
  {
    id: "beauty",
    title: "Salon for women",
    seeAllHref: "/explore?category=beauty",
    categoryId: "beauty",
    serviceIds: ["svc-salon", "svc-salon", "svc-salon"],
  },
  {
    id: "appliance",
    title: "Appliance repair & service",
    seeAllHref: "/explore?category=ac",
    categoryId: "ac",
    serviceIds: [
      "svc-ac-service",
      "svc-ac-repair",
      "svc-fridge",
      "svc-ac-service",
      "svc-fridge",
    ],
  },
  {
    id: "home-repair",
    title: "Home repair & installation",
    seeAllHref: "/explore?category=electricians",
    serviceIds: [
      "svc-electrician",
      "svc-carpentry",
      "svc-plumber-inspect",
      "svc-plumber-inspect",
      "svc-plumber-drain",
      "svc-carpentry",
    ],
  },
];

export const LOCATION_HINT: Record<string, string> = {
  Mumbai: "1201, Cliff Ave · Hiranandani Gardens, Powai, Mumbai 400076",
  "Delhi NCR": "Tower B, Sector 62 · Noida, Uttar Pradesh 201301",
  Bangalore: "5th Block, Koramangala · Bengaluru, Karnataka 560034",
  Hyderabad: "Hitech City · Hyderabad, Telangana 500081",
  Chennai: "Adyar · Chennai, Tamil Nadu 600020",
  Pune: "Baner · Pune, Maharashtra 411045",
  Kolkata: "Salt Lake · Kolkata, West Bengal 700091",
};
