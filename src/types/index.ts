export type ServiceCategoryId =
  | "cleaning"
  | "electricians"
  | "plumbing"
  | "appliance"
  | "ac"
  | "beauty"
  | "pest"
  | "carpentry";

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  description: string;
  image: string;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  included: string[];
  excluded?: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: ServiceCategoryId;
  image: string;
  startingPrice: number;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  availability: "available" | "limited" | "busy";
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  includedTasks: string[];
  excludedTasks: string[];
  keywords: string[];
  reviews: ServiceReview[];
}

export interface ServiceReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Professional {
  id: string;
  name: string;
  image: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experienceYears: number;
  serviceArea: string[];
  availability: "today" | "tomorrow" | "this_week";
  arrivalEstimate: string;
  categoryIds: ServiceCategoryId[];
}

export type BookingStatus =
  | "requested"
  | "confirmed"
  | "on_the_way"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface PriceBreakdown {
  basePrice: number;
  addOnsTotal: number;
  platformFee: number;
  tax: number;
  total: number;
}

export interface StoredBooking {
  id: string;
  reference: string;
  serviceId: string;
  serviceTitle: string;
  serviceImage: string;
  packageId: string;
  packageName: string;
  professionalId: string;
  professionalName: string;
  professionalImage: string;
  date: string;
  timeSlot: string;
  address: string;
  instructions?: string;
  addOnIds: string[];
  priceBreakdown: PriceBreakdown;
  status: BookingStatus;
  createdAt: string;
  rating?: number;
}

export interface RecommendationResult {
  problemDetected: string;
  categoryId: ServiceCategoryId;
  explanation: string;
  services: RankedService[];
  optionalAddOns: ServiceAddOn[];
  costRange: { min: number; max: number };
  durationMinutes: number;
}

export interface RankedService {
  service: Service;
  score: number;
  reason: string;
}

export interface ProfessionalMatch {
  professional: Professional;
  score: number;
  reason: string;
}
