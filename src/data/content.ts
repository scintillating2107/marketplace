import { dummyImage } from "@/lib/dummy-image";

export interface DummyPanel {
  title: string;
  image: string;
  paragraphs: string[];
  bullets?: string[];
  footer?: string;
}

export const PAGE_HEROES = {
  explore: {
    title: "Explore services",
    subtitle: "",
    image: dummyImage("hero-explore", 1200, 400),
  },
  assistant: {
    title: "InstaHelp",
    subtitle: "",
    image: dummyImage("hero-assistant", 1200, 400),
  },
  book: {
    title: "Book",
    subtitle: "",
    image: dummyImage("hero-book", 1200, 400),
  },
  dashboard: {
    title: "My bookings",
    subtitle: "",
    image: dummyImage("hero-dashboard", 1200, 400),
  },
} as const;

export const PAGE_DUMMY_PANELS: Record<"home" | "explore" | "assistant" | "book" | "dashboard", DummyPanel> = {
  home: {
    title: "Prototype home — sample catalogue",
    image: dummyImage("panel-home", 800, 320),
    paragraphs: [
      "This landing mirrors a marketplace home: categories, carousels, and trust stats are all filler for stakeholder walkthroughs.",
      "Scroll the service rows, open Explore, or try the assistant — every photo is a seeded placeholder from picsum.photos.",
    ],
    bullets: [
      "Eight category tiles with dummy art",
      "Spotlight rows + most-booked carousel",
      "No real offers or partner data",
    ],
    footer: "SERVORA demo · replace copy and images before launch.",
  },
  explore: {
    title: "Sample marketplace tips",
    image: dummyImage("panel-explore", 800, 320),
    paragraphs: [
      "Lorem-style demo copy: compare up to three services side by side before you commit. Ratings, duration, and package inclusions are all fictional but formatted like a production app.",
      "Use filters for price and rating to see how the catalogue responds. Every professional and slot shown is placeholder data for UX review.",
    ],
    bullets: [
      "Dummy safety badge on every pro profile",
      "Sample GST-style fee breakdown at checkout",
      "Reschedule & cancel flows in My Bookings",
    ],
    footer: "Images and text on this site are placeholders only — not live offers.",
  },
  assistant: {
    title: "How the demo matcher works",
    image: dummyImage("panel-assistant", 800, 320),
    paragraphs: [
      "Type everyday problems in English or Hinglish-style phrases. The engine uses keyword rules — not a live LLM — so you can audit every recommendation.",
      "Each match includes a plain-language reason, indicative price band, and optional add-ons pulled from the sample catalogue.",
    ],
    bullets: [
      "Try: AC not cooling, leaking tap, weekend deep clean",
      "Server-side scoring for transparent demos",
      "One tap to continue to booking",
    ],
    footer: "Assistant responses are generated from dummy rules and sample services.",
  },
  book: {
    title: "Before you confirm (demo)",
    image: dummyImage("panel-book", 800, 320),
    paragraphs: [
      "Packages, add-ons, and tax lines are calculated in your browser for illustration. No payment gateway is connected.",
      "Professionals are ranked with dummy scores for skills, city, and availability — pick any profile to complete the flow.",
    ],
    bullets: [
      "Step 1–4: service → pro → schedule → review",
      "Reference number generated on confirm",
      "Sync bookings when you sign in",
    ],
    footer: "Confirming a booking stores dummy data only.",
  },
  dashboard: {
    title: "Your demo command center",
    image: dummyImage("panel-dashboard", 800, 320),
    paragraphs: [
      "Upcoming, completed, and cancelled tabs mirror a real operations dashboard. Use simulate status to walk through job lifecycle states.",
      "Rate completed jobs and explore complementary service suggestions — all driven by sample rules.",
    ],
    bullets: [
      "Guest: localStorage · Signed in: JSON file API",
      "Cancel eligible requests in one click",
      "Rebook sends you back to the flow",
    ],
    footer: "Dashboard metrics and timelines are fictional.",
  },
};

export const DUMMY_TRUST_STRIP = {
  image: dummyImage("trust-strip", 1600, 120),
  lines: [
    "100% dummy content · Safe for demos",
    "Placeholder pros · Placeholder prices",
    "Sample images via picsum.photos",
  ],
};

export const LOADING_COPY = {
  title: "Loading your experience…",
  subtitle: "Fetching sample services, dummy professionals, and placeholder images.",
  image: dummyImage("loading-hero", 600, 400),
};

export const PLATFORM_STATS = [
  { label: "Verified Pros", value: "500+" },
  { label: "Happy Customers", value: "50K+" },
  { label: "Avg Rating", value: "4.8★" },
  { label: "Support", value: "24/7" },
];

export const HOME_PROMO = {
  headline: "New user offer: Get up to 50% OFF on your first booking!",
  code: "FIRST50",
};

export const HOME_SOCIAL_PROOF = [
  "Rahul S. booked AC Service in Noida",
  "Priya M. booked Deep Cleaning in Bangalore",
  "Amit K. booked Electrician in Delhi NCR",
  "Sneha P. booked Salon at Home in Pune",
  "Vikram D. booked Plumber in Mumbai",
  "Meera I. booked Pest Control in Chennai",
];

export const POPULAR_BADGES = [
  "Popular",
  "Best Value",
  "Trending",
  "Top Rated",
  "Premium",
  "Popular",
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Choose service",
    description: "Browse home services and pick what you need — prices shown upfront.",
  },
  {
    step: 2,
    title: "Select professional",
    description: "Compare ratings, skills, and availability. Pick the right pro.",
  },
  {
    step: 3,
    title: "Get it done",
    description: "Schedule a slot, track status, and pay after service (demo flow).",
  },
];

export const HOME_FAQ = [
  {
    q: "How do I book a service?",
    a: "Choose a category, compare packages, pick a professional and time slot, then confirm. The demo takes under two minutes.",
  },
  {
    q: "Are professionals verified?",
    a: "In this prototype, profiles illustrate verification badges and ratings. A live launch would include background checks and skill assessments.",
  },
  {
    q: "What if I am not satisfied?",
    a: "Production would offer re-visits or refunds. Here you can cancel eligible bookings and rate completed jobs from My Bookings.",
  },
  {
    q: "How do I pay?",
    a: "Payment is simulated in this build. A real app would support UPI, cards, and pay-after-service.",
  },
  {
    q: "Is this connected to real providers?",
    a: "No. All names, photos, prices, and availability are dummy placeholders for design and demo purposes.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes — layouts are responsive. Images are sample placeholders loaded from picsum.photos.",
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Aditi N.",
    city: "Bangalore",
    image: dummyImage("testimonial-1", 120, 120),
    quote:
      "I booked a deep clean and sofa shampooing through SERVORA’s demo flow. The price breakdown before checkout felt like the real app — no surprises on the receipt preview. Placeholder text and photos throughout, but the journey feels complete.",
    service: "Full Home Deep Cleaning",
  },
  {
    id: "t2",
    name: "Mohit S.",
    city: "Delhi NCR",
    image: dummyImage("testimonial-2", 120, 120),
    quote:
      "The smart assistant suggested an AC inspection when I typed about noise and weak cooling. The explanation panel made it obvious why that service fit — all dummy logic, very easy to demo to stakeholders.",
    service: "AC Inspection & Repair",
  },
  {
    id: "t3",
    name: "Lakshmi R.",
    city: "Chennai",
    image: dummyImage("testimonial-3", 120, 120),
    quote:
      "Compare mode helped me choose between plumbing packages. Fictional data, but the UX is what I’d expect from a premium aggregator. Love the sample images on every card.",
    service: "Tap Repair & Inspection",
  },
  {
    id: "t4",
    name: "Karan J.",
    city: "Mumbai",
    image: dummyImage("testimonial-4", 120, 120),
    quote:
      "Dashboard simulate-status is perfect for walkthroughs. Dummy booking refs, dummy pros, dummy addresses — everything labeled clearly for internal reviews.",
    service: "Electrician Visit & Repair",
  },
  {
    id: "t5",
    name: "Divya K.",
    city: "Hyderabad",
    image: dummyImage("testimonial-5", 120, 120),
    quote:
      "Salon at home package copy reads well even as placeholder text. Photos load fast and the rating format matches big marketplaces.",
    service: "Salon at Home — Classic",
  },
  {
    id: "t6",
    name: "Arjun M.",
    city: "Pune",
    image: dummyImage("testimonial-6", 120, 120),
    quote:
      "Signed in with the demo account and my guest bookings synced — still all sample data, but the backend path is easy to explain in pitches.",
    service: "Bathroom Deep Cleaning",
  },
];

export const EXPLORE_TIPS = {
  title: "Booking tips (placeholder copy)",
  image: dummyImage("explore-tips", 600, 400),
  paragraphs: [
    "Check package inclusions before add-ons — base prices cover labour and standard materials only.",
    "Morning slots fill quickly in sample data; afternoon windows show as limited availability.",
    "Use Compare on up to three services to see duration, tasks, and rating differences side by side.",
    "Every image on this page is a dummy photo — safe for screenshots and stakeholder demos.",
  ],
};

export const FOOTER_INFO = {
  about: {
    title: "About SERVORA",
    image: dummyImage("footer-about", 800, 320),
    body: [
      "SERVORA is a prototype service marketplace built to show how customers discover, compare, and book everyday home services with less friction.",
      "We combine category browsing, transparent pricing, explainable recommendations, and a lightweight booking dashboard — all with clearly labelled sample professionals and prices.",
      "This demo does not connect to live providers or payment gateways. It is intended for product evaluation and UX review only.",
    ],
  },
  contact: {
    title: "Contact",
    image: dummyImage("footer-contact", 800, 320),
    body: [
      "Demo inbox: hello@servora-demo.example (not monitored).",
      "For partnership placeholders: partners@servora-demo.example.",
      "Response time in a production launch would typically be under 24 hours on business days.",
    ],
  },
  support: {
    title: "Customer Support",
    image: dummyImage("footer-support", 800, 320),
    body: [
      "Manage bookings from My Bookings — view references, simulate status changes, cancel eligible requests, and submit demo ratings.",
      "If something looks wrong in the prototype, refresh the page; preferences and bookings live in your browser localStorage.",
      "Escalation paths, live chat, and phone support are not enabled in this sample build.",
    ],
  },
  terms: {
    title: "Terms of Service (sample)",
    image: dummyImage("footer-terms", 800, 320),
    body: [
      "All services, prices, and professionals shown are fictional demo content.",
      "No contract is formed when you confirm a booking in this prototype.",
      "A production terms document would cover cancellations, rescheduling, liability caps, and dispute resolution.",
    ],
  },
  privacy: {
    title: "Privacy (sample)",
    image: dummyImage("footer-privacy", 800, 320),
    body: [
      "This prototype stores bookings and your selected city in localStorage on your device only.",
      "No analytics SDK or third-party trackers are bundled in this repository snapshot.",
      "A live privacy policy would describe data retention, deletion requests, and regional compliance.",
    ],
  },
} as const;

export const PRO_ONBOARDING_COPY = {
  headline: "Join SERVORA as a professional",
  image: dummyImage("pro-onboard", 600, 800),
  paragraphs: [
    "Reach customers who value upfront pricing and punctual service. Demo onboarding collects your profile intent only — nothing is submitted to a server.",
    "Typical partners include cleaners, electricians, plumbers, beauticians, and appliance technicians across major Indian cities.",
    "Once approved in a real launch, you would set service areas, rates, and availability from a partner app.",
    "All fields on this form are dummy — submit closes the modal with sample thank-you behaviour.",
  ],
};

export const EMPTY_BOOKINGS = {
  image: dummyImage("empty-bookings", 800, 500),
  extra:
    "Popular starting points: AC servicing from ₹499, bathroom deep cleaning from ₹599, and electrician visits from ₹249 — all sample prices. Photos and reviews are placeholder content.",
};
