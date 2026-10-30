"use client";

import { TIME_SLOTS } from "@/lib/booking";

interface Props {
  date: string;
  timeSlot: string;
  address: string;
  instructions: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
  onAddressChange: (v: string) => void;
  onInstructionsChange: (v: string) => void;
  errors?: { date?: string; time?: string; address?: string };
}

export function BookingScheduler({
  date,
  timeSlot,
  address,
  instructions,
  onDateChange,
  onTimeChange,
  onAddressChange,
  onInstructionsChange,
  errors,
}: Props) {
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Date</label>
        <input
          type="date"
          min={minDate}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
        />
        {errors?.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
      </div>
      <div>
        <label className="text-sm font-medium">Time slot</label>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onTimeChange(slot)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                timeSlot === slot
                  ? "border-primary bg-accent-soft text-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors?.time && <p className="mt-1 text-xs text-red-600">{errors.time}</p>}
      </div>
      <div>
        <label className="text-sm font-medium">Service address</label>
        <textarea
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          rows={2}
          placeholder="Flat, building, street, landmark"
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
        />
        {errors?.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
      </div>
      <div>
        <label className="text-sm font-medium">Instructions (optional)</label>
        <textarea
          value={instructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          rows={2}
          placeholder="Gate code, parking, pets at home…"
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
