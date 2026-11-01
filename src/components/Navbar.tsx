"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, MapPin, ChevronDown, User } from "lucide-react";
import { LOCATIONS } from "@/data/services";
import { UC_MAIN_CATEGORIES } from "@/data/home-sections";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";
import { ProfessionalOnboardingModal } from "@/components/ProfessionalOnboardingModal";

const utilityLinks = [
  { href: "/explore", label: "All services" },
  { href: "/assistant", label: "InstaHelp" },
  { href: "/dashboard", label: "My bookings" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { location, setLocation, user, openLogin, logout } = useApp();
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
      <header className="sticky top-0 z-50 border-b border-border bg-surface shadow-sm">
        <div className="container-page flex h-14 items-center gap-3 sm:h-[3.25rem] sm:gap-4">
          <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight text-foreground">
            SERVORA
          </Link>

          <div className="relative hidden min-w-0 flex-1 md:block">
            <form
              className="mx-auto max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                searchNavigate(String(fd.get("q") ?? ""));
              }}
            >
              <SearchBar
                name="q"
                placeholder="Search for services"
                containerClassName="rounded-full border-border/80 bg-background py-2.5"
              />
            </form>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setLocOpen(!locOpen)}
                className="flex max-w-[140px] items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:border-primary/30"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate">{location}</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
              </button>
              {locOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLocOpen(false)} aria-hidden />
                  <ul className="absolute right-0 top-full z-50 mt-1 max-h-64 w-48 overflow-auto rounded-xl border border-border bg-surface py-1 shadow-elevated">
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

            {user ? (
              <button
                type="button"
                className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium sm:flex"
                title={user.email}
                onClick={() => void logout()}
              >
                <User className="h-4 w-4 text-primary" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="hidden rounded-full px-4 sm:inline-flex"
                onClick={openLogin}
              >
                Login / Sign up
              </Button>
            )}

            <button
              type="button"
              className="rounded-full p-2 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav
          className="hidden border-t border-border/70 md:block"
          aria-label="Service categories"
        >
          <div className="container-page flex items-center gap-5 overflow-x-auto py-2.5 [scrollbar-width:thin]">
            {UC_MAIN_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                prefetch={false}
                className="shrink-0 whitespace-nowrap text-sm font-semibold text-foreground/85 transition-colors hover:text-primary"
              >
                {cat.label}
              </Link>
            ))}
            <div className="ml-auto flex shrink-0 items-center gap-4 pl-4">
              {utilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className={cn(
                    "whitespace-nowrap text-sm font-semibold transition-colors",
                    pathname === link.href ? "text-primary" : "text-muted hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
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
                containerClassName="rounded-full"
              />

              <p className="text-xs font-bold uppercase tracking-wide text-muted">Categories</p>
              {UC_MAIN_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground"
                >
                  {cat.label}
                </Link>
              ))}

              <hr className="border-border" />

              {utilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-border px-4 py-3 font-medium"
                >
                  {link.label}
                </Link>
              ))}

              <Button
                variant="outline"
                onClick={() => {
                  setProOpen(true);
                  setMobileOpen(false);
                }}
              >
                Become a professional
              </Button>
              {!user && (
                <Button
                  onClick={() => {
                    openLogin();
                    setMobileOpen(false);
                  }}
                >
                  Login / Sign up
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <ProfessionalOnboardingModal open={proOpen} onClose={() => setProOpen(false)} />
    </>
  );
}
