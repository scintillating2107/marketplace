"use client";

import Link from "next/link";
import { useState } from "react";
import { ProfessionalOnboardingModal } from "@/components/ProfessionalOnboardingModal";
import { FOOTER_INFO } from "@/data/content";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type InfoKey = keyof typeof FOOTER_INFO;

export function Footer() {
  const [proOpen, setProOpen] = useState(false);
  const [infoKey, setInfoKey] = useState<InfoKey | null>(null);
  const info = infoKey ? FOOTER_INFO[infoKey] : null;

  return (
    <>
      <footer className="mt-auto border-t border-border bg-accent-soft/50">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-xs font-black text-white">
                S
              </span>
              <span className="font-bold">SERVORA</span>
            </div>
            <p className="mt-2 text-xs text-muted">Home services, simplified.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {(["about", "contact", "support"] as const).map((key) => (
                <li key={key}>
                  <button type="button" className="hover:text-foreground" onClick={() => setInfoKey(key)}>
                    {key === "support" ? "Help center" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">For customers</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  My bookings
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <button type="button" className="hover:text-foreground" onClick={() => setInfoKey("privacy")}>
                  Privacy policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">For professionals</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <button type="button" className="hover:text-foreground" onClick={() => setProOpen(true)}>
                  Register as a professional
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-foreground" onClick={() => setInfoKey("terms")}>
                  Terms of service
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted">
          © {new Date().getFullYear()} SERVORA
        </div>
      </footer>

      <ProfessionalOnboardingModal open={proOpen} onClose={() => setProOpen(false)} />

      <Modal open={!!info} onClose={() => setInfoKey(null)} title={info?.title ?? "Info"} size="md">
        {info && (
          <>
            <h2 className="text-lg font-bold">{info.title}</h2>
            <div className="mt-3 space-y-3 text-sm text-muted">
              {info.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <Button type="button" className="mt-6 w-full" onClick={() => setInfoKey(null)}>
              Close
            </Button>
          </>
        )}
      </Modal>
    </>
  );
}
