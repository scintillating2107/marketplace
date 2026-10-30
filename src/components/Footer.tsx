"use client";

import Link from "next/link";
import { useState } from "react";
import { ProfessionalOnboardingModal } from "@/components/ProfessionalOnboardingModal";
import { Button } from "@/components/ui/Button";

const INFO: Record<string, { title: string; body: string }> = {
  about: {
    title: "About SERVORA",
    body: "SERVORA is a prototype service marketplace focused on transparent discovery, explainable recommendations, and stress-free booking. All listings use sample data for demonstration.",
  },
  contact: {
    title: "Contact",
    body: "For this demo, reach out via hello@servora-demo.example — not a live inbox. Use Customer Support for booking help in the prototype.",
  },
  support: {
    title: "Customer Support",
    body: "Manage bookings under My Bookings. Cancellations and status updates are simulated locally in your browser for demo purposes.",
  },
  terms: {
    title: "Terms of Service (demo)",
    body: "Sample terms placeholder. No real services are sold through this prototype. Prices and professionals are illustrative only.",
  },
  privacy: {
    title: "Privacy (demo)",
    body: "Bookings and location preference are stored in your browser localStorage only. Nothing is sent to a server in this prototype.",
  },
};

export function Footer() {
  const [proOpen, setProOpen] = useState(false);
  const [infoKey, setInfoKey] = useState<string | null>(null);
  const info = infoKey ? INFO[infoKey] : null;

  return (
    <>
      <footer className="mt-auto border-t border-border bg-surface">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                S
              </span>
              <span className="font-bold text-foreground">SERVORA</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Reliable services. Smarter choices. Less hassle.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {(["about", "contact", "support"] as const).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() => setInfoKey(key)}
                  >
                    {key === "support" ? "Customer Support" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <button type="button" className="hover:text-primary" onClick={() => setInfoKey("terms")}>
                  Terms
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-primary" onClick={() => setInfoKey("privacy")}>
                  Privacy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Professionals</h3>
            <p className="mt-3 text-sm text-muted">
              Grow your business with transparent bookings and fair pricing.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setProOpen(true)}
            >
              Become a Professional
            </Button>
            <Link
              href="/explore"
              className="mt-3 block text-sm font-medium text-primary hover:underline"
            >
              Browse services →
            </Link>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted">
          © {new Date().getFullYear()} SERVORA — prototype demo. Sample pricing & professionals.
        </div>
      </footer>

      <ProfessionalOnboardingModal open={proOpen} onClose={() => setProOpen(false)} />

      {info && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setInfoKey(null)} aria-hidden />
          <div
            role="dialog"
            aria-labelledby="footer-info-title"
            className="relative z-10 w-full max-w-md rounded-2xl bg-surface p-6 shadow-elevated"
          >
            <h2 id="footer-info-title" className="text-lg font-bold">
              {info.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{info.body}</p>
            <Button type="button" className="mt-6 w-full" onClick={() => setInfoKey(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
