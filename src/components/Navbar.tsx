"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  MapPin,
  ChevronDown,
  User,
} from "lucide-react";
import { LOCATIONS } from "@/data/services";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";
import { ProfessionalOnboardingModal } from "@/components/ProfessionalOnboardingModal";

const navLinks = [
  { href: "/explore", label: "Explore Services" },
  { href: "/assistant", label: "Smart Assistant" },
  { href: "/dashboard", label: "My Bookings" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { location, setLocation } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");

  const searchNavigate = (q: string) => {
    const query = q.trim();
    if (!query) return;
    router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
              S
            </span>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold tracking-tight text-foreground">
                SERVORA
              </span>
              <span className="-mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-muted">
                Smarter choices
              </span>
            </div>
          </Link>

          <div className="hidden max-w-md flex-1 lg:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                searchNavigate(String(fd.get("q") ?? ""));
              }}
            >
              <SearchBar name="q" placeholder="Search services…" />
            </form>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLocOpen(!locOpen)}
                className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-surface hover:text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="max-w-[100px] truncate">{location}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {locOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLocOpen(false)}
                    aria-hidden
                  />
                  <ul className="absolute right-0 top-full z-50 mt-1 max-h-64 w-44 overflow-auto rounded-xl border border-border bg-surface py-1 shadow-elevated">
                    {LOCATIONS.map((loc) => (
                      <li key={loc}>
                        <button
                          type="button"
                          className={cn(
                            "w-full px-3 py-2 text-left text-sm hover:bg-accent-soft",
                            loc === location && "font-semibold text-primary"
                          )}
                          onClick={() => {
                            setLocation(loc);
                            setLocOpen(false);
                          }}
                        >
                          {loc}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-accent-soft text-primary"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setProOpen(true)}
            >
              Become a Professional
            </Button>

            <button
              type="button"
              className="rounded-full border border-border p-2 text-muted hover:border-primary/30 hover:text-primary"
              aria-label="Login (demo)"
              title="Demo only — sign-in not enabled in this prototype"
              onClick={() =>
                alert("Demo login: account features are not enabled in this prototype.")
              }
            >
              <User className="h-5 w-5" />
            </button>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-surface shadow-elevated">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-bold text-primary">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto p-4">
              <label className="text-xs font-medium text-muted">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <SearchBar
                placeholder="Search services"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                onSearch={() => {
                  searchNavigate(mobileQuery);
                  setMobileOpen(false);
                }}
              />

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-border px-4 py-3 font-medium"
                >
                  {link.label}
                </Link>
              ))}

              <Button variant="outline" onClick={() => { setProOpen(true); setMobileOpen(false); }}>
                Become a Professional
              </Button>
            </div>
          </div>
        </div>
      )}

      <ProfessionalOnboardingModal open={proOpen} onClose={() => setProOpen(false)} />
    </>
  );
}
