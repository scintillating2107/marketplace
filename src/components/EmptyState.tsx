import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EMPTY_BOOKINGS } from "@/data/content";

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
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-dashed border-border bg-surface">
      <div className="relative h-44 sm:h-52">
        <Image
          src={EMPTY_BOOKINGS.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 800px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
      </div>
      <div className="flex flex-col items-center px-6 pb-12 pt-4 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-muted">{message}</p>
        <p className="mt-3 max-w-lg text-xs text-muted">{EMPTY_BOOKINGS.extra}</p>
        <Link href={ctaHref} className="mt-8">
          <Button size="lg">{ctaLabel}</Button>
        </Link>
      </div>
    </div>
  );
}
