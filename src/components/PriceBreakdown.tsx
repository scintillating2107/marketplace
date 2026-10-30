import type { PriceBreakdown } from "@/types";
import { formatINR } from "@/lib/booking";

interface Props {
  breakdown: PriceBreakdown;
  compact?: boolean;
}

export function PriceBreakdownView({ breakdown, compact }: Props) {
  const rows = [
    { label: "Base service", value: breakdown.basePrice },
    { label: "Add-ons", value: breakdown.addOnsTotal },
    { label: "Platform fee (5%)", value: breakdown.platformFee },
    { label: "GST (18%)", value: breakdown.tax },
  ];

  return (
    <div className={compact ? "text-sm" : ""}>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex justify-between text-muted">
            <span>{row.label}</span>
            <span>{formatINR(row.value)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-border pt-3 font-bold text-foreground">
        <span>Total estimate</span>
        <span className="text-primary">{formatINR(breakdown.total)}</span>
      </div>
      <p className="mt-2 text-[10px] text-muted">Demo pricing in INR — no payment processed.</p>
    </div>
  );
}
