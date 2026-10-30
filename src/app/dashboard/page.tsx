"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getComplementaryServices,
  loadBookings,
  saveBookings,
} from "@/lib/booking";
import type { StoredBooking } from "@/types";
import { BookingCard } from "@/components/BookingCard";
import { EmptyState } from "@/components/EmptyState";
import { PriceBreakdownView } from "@/components/PriceBreakdown";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [mounted, setMounted] = useState(false);
  const [detail, setDetail] = useState<StoredBooking | null>(null);
  const [ratingBooking, setRatingBooking] = useState<string | null>(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    setBookings(loadBookings());
    setMounted(true);
  }, []);

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

  const updateBookings = (next: StoredBooking[]) => {
    setBookings(next);
    saveBookings(next);
  };

  const cancelBooking = (id: string) => {
    updateBookings(
      bookings.map((b) =>
        b.id === id && (b.status === "requested" || b.status === "confirmed")
          ? { ...b, status: "cancelled" as const }
          : b
      )
    );
  };

  const submitRating = (id: string) => {
    updateBookings(
      bookings.map((b) => (b.id === id ? { ...b, rating } : b))
    );
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
    updateBookings(
      bookings.map((b) => {
        if (b.id !== id) return b;
        const idx = flow.indexOf(b.status);
        const next =
          idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : b.status;
        return { ...b, status: next };
      })
    );
  };

  if (!mounted) {
    return <div className="container-page py-20 text-muted">Loading bookings…</div>;
  }

  return (
    <div className="container-page py-10">
      <header>
        <h1 className="text-3xl font-bold">Everything You Booked. All in One Place.</h1>
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
        <p className="mt-4 text-xs text-muted">
          Status changes below are simulated for this prototype — not live job tracking.
        </p>
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
            <section className="mt-14 rounded-2xl border border-border bg-accent-soft/20 p-8">
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
                      onBook={() => router.push(`/book?serviceId=${service.id}`)}
                    />
                    <p className="mt-2 text-xs text-muted">{reason}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {detail && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setDetail(null)} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl bg-surface p-6">
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
          </div>
        </div>
      )}

      {ratingBooking && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setRatingBooking(null)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-surface p-6">
            <h2 className="font-bold">Rate your experience (demo)</h2>
            <input
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
            <p className="text-center text-2xl font-bold">{rating} ★</p>
            <Button className="mt-4 w-full" onClick={() => submitRating(ratingBooking)}>
              Submit rating
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
