import Link from "next/link";
import { CalendarSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  title?: string;
  message?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function EmptyState({
  title = "No bookings yet",
  message = "When you confirm a demo booking, it will appear here — even after refresh.",
  ctaHref = "/explore",
  ctaLabel = "Explore Services",
}: Props) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-primary">
        <CalendarSearch className="h-8 w-8" />
      </div>
      <h2 className="mt-6 text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted">{message}</p>
      <Link href={ctaHref} className="mt-8">
        <Button size="lg">{ctaLabel}</Button>
      </Link>
    </div>
  );
}
