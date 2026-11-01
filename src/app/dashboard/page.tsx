"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getComplementaryServices } from "@/lib/booking";
import { loadBookingsForUser } from "@/lib/bookings-persist";
import { patchBookingApi } from "@/lib/api-client";
import { saveBookings } from "@/lib/booking";
import type { StoredBooking } from "@/types";
import { useApp } from "@/context/AppContext";
import { BookingCard } from "@/components/BookingCard";
import { EmptyState } from "@/components/EmptyState";
import { PriceBreakdownView } from "@/components/PriceBreakdown";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { PageBanner } from "@/components/PageBanner";
import { Modal } from "@/components/ui/Modal";
import { PAGE_HEROES } from "@/data/content";

export default function DashboardPage() {
  const router = useRouter();
  const { user, authReady, openLogin } = useApp();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [mounted, setMounted] = useState(false);
  const [detail, setDetail] = useState<StoredBooking | null>(null);
  const [ratingBooking, setRatingBooking] = useState<string | null>(null);
  const [rating, setRating] = useState(5);

  const reload = useCallback(async () => {
    const list = await loadBookingsForUser(!!user);
    setBookings(list);
  }, [user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authReady) return;
    void reload();
  }, [authReady, reload]);

  const upcoming = bookings.filter(
    (b) => b.status !== "completed" && b.status !== "cancelled"
  );
  const completed = bookings.filter((b) => b.status === "completed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  const recommendations = useMemo(() => {
    const latest = bookings[0];
    if (!latest) return [];
    return getComplementaryServices(latest.serviceId);
  }, [bookings]);

  const persistLocal = (next: StoredBooking[]) => {
    setBookings(next);
    saveBookings(next);
  };

  const applyUpdate = async (id: string, patch: Partial<StoredBooking>) => {
    if (user) {
      const updated = await patchBookingApi(id, patch);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      }
      return;
    }
    persistLocal(bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const cancelBooking = (id: string) => {
    void applyUpdate(id, { status: "cancelled" });
  };

  const submitRating = (id: string) => {
    void applyUpdate(id, { rating });
    setRatingBooking(null);
  };

  const simulateProgress = (id: string) => {
    const flow: StoredBooking["status"][] = [
      "requested",
      "confirmed",
      "on_the_way",
      "in_progress",
      "completed",
    ];
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    const idx = flow.indexOf(booking.status);
    const next =
      idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : booking.status;
    void applyUpdate(id, { status: next });
  };

  if (!mounted || !authReady) {
    return <div className="container-page py-20 text-muted">Loading bookings…</div>;
  }

  return (
    <>
      <PageBanner {...PAGE_HEROES.dashboard} />
      <div className="container-page py-10">
        <header>
          {!user && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-accent-soft/40 px-4 py-3">
              <p className="text-sm text-muted">
                Guest mode: bookings are stored in this browser only.
              </p>
              <Button type="button" size="sm" onClick={openLogin}>
                Sign in to sync
              </Button>
            </div>
          )}
          {user && (
            <p className="text-sm text-muted">
              Signed in as <span className="font-medium text-foreground">{user.email}</span> —
              bookings are saved on the server.
            </p>
          )}
          <p className="mt-2 text-sm text-muted">
            Use &ldquo;Simulate next status&rdquo; to walk through the sample journey timeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-accent-soft px-4 py-1.5 font-medium text-primary">
              {upcoming.length} upcoming
            </span>
            <span className="rounded-full border border-border px-4 py-1.5">
              {completed.length} completed
            </span>
            <span className="rounded-full border border-border px-4 py-1.5">
              {cancelled.length} cancelled
            </span>
          </div>
        </header>

        {bookings.length === 0 ? (
          <div className="mt-12">
            <EmptyState />
          </div>
        ) : (
          <>
            <section className="mt-12">
              <h2 className="text-lg font-bold">Upcoming</h2>
              {upcoming.length === 0 ? (
                <p className="mt-4 text-sm text-muted">No upcoming bookings.</p>
              ) : (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {upcoming.map((b) => (
                    <div key={b.id}>
                      <BookingCard
                        booking={b}
                        onView={() => setDetail(b)}
                        onCancel={() => cancelBooking(b.id)}
                        onRebook={() => router.push(`/book?serviceId=${b.serviceId}`)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-xs"
                        onClick={() => simulateProgress(b.id)}
                      >
                        Simulate next status (demo)
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-12">
              <h2 className="text-lg font-bold">Completed</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {completed.map((b) => (
                  <BookingCard
                    key={b.id}
                    booking={b}
                    onView={() => setDetail(b)}
                    onRebook={() => router.push(`/book?serviceId=${b.serviceId}`)}
                  />
                ))}
              </div>
            </section>

            {cancelled.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-bold">Cancelled</h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {cancelled.map((b) => (
                    <BookingCard
                      key={b.id}
                      booking={b}
                      onView={() => setDetail(b)}
                      onRebook={() => router.push(`/book?serviceId=${b.serviceId}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {recommendations.length > 0 && (
              <section className="mt-14 rounded-2xl border border-border bg-accent-soft/20 p-8 motion-safe:animate-[fade-in_300ms_ease-out]">
                <h2 className="text-lg font-bold">Smart recommendations</h2>
                <p className="mt-1 text-sm text-muted">
                  Based on your latest booking — explained, not random upsells.
                </p>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  {recommendations.map(({ service, reason }) => (
                    <div key={service.id}>
                      <ServiceCard
                        service={service}
                        compact
                        onExplore={() =>
                          router.push(`/explore?q=${encodeURIComponent(service.title)}`)
                        }
                      />
                      <p className="mt-2 text-xs text-muted">{reason}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <Modal open={!!detail} onClose={() => setDetail(null)} title="Booking details" size="md">
          {detail && (
            <>
              <h2 className="text-lg font-bold">Booking details</h2>
              <p className="text-sm text-muted">Ref {detail.reference}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="text-muted">Service</dt>
                  <dd className="font-medium">{detail.serviceTitle}</dd>
                </div>
                <div>
                  <dt className="text-muted">Professional</dt>
                  <dd>{detail.professionalName}</dd>
                </div>
                <div>
                  <dt className="text-muted">When</dt>
                  <dd>
                    {detail.date} · {detail.timeSlot}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Address</dt>
                  <dd>{detail.address}</dd>
                </div>
              </dl>
              <div className="mt-4 border-t border-border pt-4">
                <PriceBreakdownView breakdown={detail.priceBreakdown} compact />
              </div>
              {detail.status === "completed" && !detail.rating && (
                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setRatingBooking(detail.id);
                    setDetail(null);
                  }}
                >
                  Rate this service
                </Button>
              )}
              {detail.rating && (
                <p className="mt-4 text-sm">Your rating: {detail.rating} ★</p>
              )}
              <Button variant="outline" className="mt-4 w-full" onClick={() => setDetail(null)}>
                Close
              </Button>
            </>
          )}
        </Modal>

        <Modal
          open={!!ratingBooking}
          onClose={() => setRatingBooking(null)}
          title="Rate your experience"
          size="sm"
        >
          <h2 className="font-bold">Rate your experience</h2>
          <input
            type="range"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-4 w-full accent-primary"
          />
          <p className="text-center text-2xl font-bold">{rating} ★</p>
          <Button
            className="mt-4 w-full"
            onClick={() => ratingBooking && submitRating(ratingBooking)}
          >
            Submit rating
          </Button>
        </Modal>
      </div>
    </>
  );
}
