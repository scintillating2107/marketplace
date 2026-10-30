"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getServiceById } from "@/data/services";
import {
  calculatePriceBreakdown,
  formatINR,
  generateBookingReference,
  loadBookings,
  matchProfessionals,
  saveBookings,
} from "@/lib/booking";
import { useApp } from "@/context/AppContext";
import type { StoredBooking } from "@/types";
import { BookingFlowProgress } from "@/components/BookingProgress";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { BookingScheduler } from "@/components/BookingScheduler";
import { PriceBreakdownView } from "@/components/PriceBreakdown";
import { Button } from "@/components/ui/Button";

function BookContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { location } = useApp();
  const serviceId = params.get("serviceId") ?? "";
  const service = getServiceById(serviceId);

  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState("");
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [professionalId, setProfessionalId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<{ date?: string; time?: string; address?: string }>({});
  const [confirmed, setConfirmed] = useState<StoredBooking | null>(null);

  useEffect(() => {
    if (service && !packageId) {
      setPackageId(service.packages[0]?.id ?? "");
    }
  }, [service, packageId]);

  const selectedPackage = service?.packages.find((p) => p.id === packageId);
  const breakdown = useMemo(() => {
    if (!service || !packageId) {
      return calculatePriceBreakdown(0, []);
    }
    const pkg = service.packages.find((p) => p.id === packageId);
    const addons = service.addOns.filter((a) => addOnIds.includes(a.id));
    if (!pkg) return calculatePriceBreakdown(0, []);
    return calculatePriceBreakdown(pkg.price, addons);
  }, [service, packageId, addOnIds]);

  const matches = useMemo(() => {
    if (!service) return [];
    return matchProfessionals(service, location, 3);
  }, [service, location]);

  useEffect(() => {
    if (matches.length && !professionalId) {
      setProfessionalId(matches[0].professional.id);
    }
  }, [matches, professionalId]);

  if (!service) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-xl font-bold">Select a service first</h1>
        <Link href="/explore" className="mt-4 inline-block text-primary underline">
          Explore services
        </Link>
      </div>
    );
  }

  const validateSchedule = () => {
    const next: typeof errors = {};
    if (!date) next.date = "Pick a date";
    if (!timeSlot) next.time = "Pick a time slot";
    if (!address.trim()) next.address = "Address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const confirmBooking = () => {
    if (!selectedPackage) return;
    const pro = matches.find((m) => m.professional.id === professionalId)?.professional;
    if (!pro) return;

    const booking: StoredBooking = {
      id: crypto.randomUUID(),
      reference: generateBookingReference(),
      serviceId: service.id,
      serviceTitle: service.title,
      serviceImage: service.image,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      professionalId: pro.id,
      professionalName: pro.name,
      professionalImage: pro.image,
      date,
      timeSlot,
      address,
      instructions,
      addOnIds,
      priceBreakdown: breakdown,
      status: "requested",
      createdAt: new Date().toISOString(),
    };

    const all = loadBookings();
    saveBookings([booking, ...all]);
    setConfirmed(booking);
    setStep(4);
  };

  if (confirmed) {
    return (
      <div className="container-page max-w-2xl py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-4 text-2xl font-bold">You&apos;re booked (demo)</h1>
        <p className="mt-2 text-muted">
          Reference: {confirmed.reference} · Status: booking requested
        </p>
        <div className="mt-8 rounded-xl border border-border bg-surface p-6 text-left text-sm">
          <p className="font-semibold">{confirmed.serviceTitle}</p>
          <p className="text-muted">{confirmed.professionalName}</p>
          <p className="mt-2">
            {confirmed.date} · {confirmed.timeSlot}
          </p>
          <p className="mt-2">{confirmed.address}</p>
          <div className="mt-4 border-t border-border pt-4">
            <PriceBreakdownView breakdown={confirmed.priceBreakdown} compact />
          </div>
        </div>
        <p className="mt-4 text-xs text-muted">
          No payment processed. Professional dispatch is simulated.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => router.push("/dashboard")}>View My Bookings</Button>
          <Button variant="outline" onClick={() => router.push("/explore")}>
            Explore more
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <BookingFlowProgress step={step} />

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {step === 0 && (
            <section>
              <h2 className="text-xl font-bold">Selected service</h2>
              <div className="mt-4 flex gap-4 rounded-xl border border-border bg-surface p-4">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image src={service.image} alt="" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted">{service.shortDescription}</p>
                  <Link href="/explore" className="mt-2 inline-block text-sm text-primary">
                    Change service
                  </Link>
                </div>
              </div>
              <h3 className="mt-8 text-sm font-semibold">Choose package</h3>
              <div className="mt-3 space-y-2">
                {service.packages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className={`flex cursor-pointer justify-between rounded-xl border p-4 ${
                      packageId === pkg.id ? "border-primary bg-accent-soft/50" : "border-border"
                    }`}
                  >
                    <span>
                      <input
                        type="radio"
                        name="package"
                        checked={packageId === pkg.id}
                        onChange={() => setPackageId(pkg.id)}
                        className="mr-2 accent-primary"
                      />
                      {pkg.name} · ~{pkg.durationMinutes} min
                    </span>
                    <span className="font-semibold">{formatINR(pkg.price)}</span>
                  </label>
                ))}
              </div>
              {service.addOns.length > 0 && (
                <>
                  <h3 className="mt-6 text-sm font-semibold">Add-ons</h3>
                  <div className="mt-2 space-y-2">
                    {service.addOns.map((a) => (
                      <label key={a.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={addOnIds.includes(a.id)}
                          onChange={(e) => {
                            setAddOnIds((ids) =>
                              e.target.checked ? [...ids, a.id] : ids.filter((x) => x !== a.id)
                            );
                          }}
                          className="accent-primary"
                        />
                        {a.name} (+{formatINR(a.price)})
                      </label>
                    ))}
                  </div>
                </>
              )}
              <Button className="mt-8" onClick={() => setStep(1)}>
                Continue
              </Button>
            </section>
          )}

          {step === 1 && (
            <section>
              <h2 className="text-xl font-bold">Choose a professional</h2>
              <p className="mt-1 text-sm text-muted">
                Ranked by skills, ratings, and demo availability in {location}.
              </p>
              <div className="mt-6 space-y-4">
                {matches.map((match, i) => (
                  <ProfessionalCard
                    key={match.professional.id}
                    match={match}
                    selected={professionalId === match.professional.id}
                    onSelect={() => setProfessionalId(match.professional.id)}
                    recommended={i === 0}
                  />
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button onClick={() => setStep(2)}>Continue</Button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="text-xl font-bold">Schedule appointment</h2>
              <div className="mt-6 max-w-md">
                <BookingScheduler
                  date={date}
                  timeSlot={timeSlot}
                  address={address}
                  instructions={instructions}
                  onDateChange={setDate}
                  onTimeChange={setTimeSlot}
                  onAddressChange={setAddress}
                  onInstructionsChange={setInstructions}
                  errors={errors}
                />
              </div>
              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    if (validateSchedule()) setStep(3);
                  }}
                >
                  Review price
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="text-xl font-bold">Review & confirm</h2>
              <p className="mt-2 text-sm text-muted">
                {selectedPackage?.name} with{" "}
                {matches.find((m) => m.professional.id === professionalId)?.professional.name}
              </p>
              <p className="text-sm text-muted">
                {date} · {timeSlot}
              </p>
              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button size="lg" onClick={confirmBooking}>
                  Confirm booking
                </Button>
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
          <h3 className="font-semibold">Price summary</h3>
          <div className="mt-4">
            <PriceBreakdownView breakdown={breakdown} />
          </div>
          {selectedPackage && (
            <p className="mt-4 text-xs text-muted">
              Duration ~{selectedPackage.durationMinutes} minutes · Sample INR pricing
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="container-page py-20">Loading…</div>}>
      <BookContent />
    </Suspense>
  );
}
