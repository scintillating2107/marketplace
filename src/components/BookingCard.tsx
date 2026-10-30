"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoredBooking } from "@/types";
import { formatINR } from "@/lib/booking";
import { BookingProgress } from "@/components/BookingProgress";
import { Button } from "@/components/ui/Button";

interface Props {
  booking: StoredBooking;
  onView: () => void;
  onCancel?: () => void;
  onRebook?: () => void;
}

export function BookingCard({ booking, onView, onCancel, onRebook }: Props) {
  const canCancel =
    booking.status === "requested" || booking.status === "confirmed";

  return (
    <article className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image src={booking.serviceImage} alt="" fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{booking.serviceTitle}</h3>
              <p className="text-sm text-muted">{booking.professionalName}</p>
            </div>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium capitalize text-primary">
              {booking.status.replace(/_/g, " ")}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {booking.date} · {booking.timeSlot}
          </p>
          <p className="text-xs text-muted">Ref: {booking.reference}</p>
          <p className="mt-1 font-semibold text-primary">
            {formatINR(booking.priceBreakdown.total)}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <BookingProgress status={booking.status} compact />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onView}>
          View details
        </Button>
        {canCancel && onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onRebook && (
          <Button type="button" variant="secondary" size="sm" onClick={onRebook}>
            Book again
          </Button>
        )}
      </div>
    </article>
  );
}
