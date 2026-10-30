import type { RecommendationResult } from "@/types";
import { formatINR } from "@/lib/booking";

interface Props {
  result: RecommendationResult;
}

export function MatchExplanation({ result }: Props) {
  if (!result.services.length) return null;

  const top = result.services[0];

  return (
    <aside className="rounded-[var(--radius-card)] border border-primary/20 bg-accent-soft/40 p-5">
      <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
        Explain my match
      </h3>
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
    </aside>
  );
}
