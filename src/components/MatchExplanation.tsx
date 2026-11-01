import type { RecommendationResult } from "@/types";
import { formatINR } from "@/lib/booking";
import { dummyImage } from "@/lib/dummy-image";
import Image from "next/image";

interface Props {
  result: RecommendationResult;
}

export function MatchExplanation({ result }: Props) {
  if (!result.services.length) return null;

  const top = result.services[0];

  return (
    <aside className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-sm">
      <div className="relative h-28">
        <Image
          src={dummyImage(`match-${top.service.id}`, 400, 200)}
          alt=""
          fill
          className="object-cover"
          sizes="340px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <div className="p-5">
      <h3 className="text-sm font-bold uppercase tracking-wide text-uc-accent">
        Explain my match (dummy)
      </h3>
      <p className="mt-2 text-xs text-muted">
        Placeholder breakdown of how the rule engine scored your request against sample services.
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-muted">Problem detected</dt>
          <dd className="font-medium">{result.problemDetected}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted">Recommended service</dt>
          <dd className="font-medium">{top.service.title}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted">Why it fits</dt>
          <dd className="text-muted">{top.reason}</dd>
        </div>
        <div className="flex gap-6">
          <div>
            <dt className="text-xs font-medium text-muted">Indicative cost</dt>
            <dd className="font-semibold text-primary">
              {formatINR(result.costRange.min)} – {formatINR(result.costRange.max)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted">Est. duration</dt>
            <dd>~{result.durationMinutes} min</dd>
          </div>
        </div>
        {result.optionalAddOns.length > 0 && (
          <div>
            <dt className="text-xs font-medium text-muted">Optional add-ons</dt>
            <dd className="text-muted">
              {result.optionalAddOns.map((a) => a.name).join(", ")}
            </dd>
          </div>
        )}
      </dl>
      </div>
    </aside>
  );
}
