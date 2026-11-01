import type { BookingStatus } from "@/types";
import { cn } from "@/lib/utils";

const STEPS: { key: BookingStatus | "booking"; label: string }[] = [
  { key: "booking", label: "Requested" },
  { key: "confirmed", label: "Confirmed" },
  { key: "on_the_way", label: "On the way" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
];

const order: Record<string, number> = {
  requested: 0,
  confirmed: 1,
  on_the_way: 2,
  in_progress: 3,
  completed: 4,
  cancelled: -1,
};

interface Props {
  status: BookingStatus;
  compact?: boolean;
}

export function BookingProgress({ status, compact }: Props) {
  if (status === "cancelled") {
    return (
      <p className="text-sm font-medium text-red-600">Booking cancelled (demo)</p>
    );
  }

  const current = order[status] ?? 0;

  return (
    <div className={compact ? "scale-90 origin-left" : ""}>
      <ol className="flex items-center gap-1 sm:gap-2">
        {STEPS.map((step, i) => {
          const done = i <= current;
          const active = i === current;
          return (
            <li key={step.label} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-2 w-full max-w-[40px] rounded-full sm:max-w-none",
                  done ? "bg-primary" : "bg-border",
                  active && "ring-2 ring-accent ring-offset-1"
                )}
              />
              <span
                className={cn(
                  "hidden text-[10px] sm:block",
                  done ? "text-primary font-medium" : "text-muted"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-[10px] text-muted sm:hidden">
        Status: {STEPS[Math.min(current, STEPS.length - 1)]?.label}
      </p>
    </div>
  );
}

export const BOOKING_FLOW_STEPS = [
  "Select service",
  "Choose professional",
  "Schedule",
  "Review price",
  "Confirm",
];

interface FlowProps {
  step: number;
}

export function BookingFlowProgress({ step }: FlowProps) {
  return (
    <nav aria-label="Booking progress" className="mb-6 sm:mb-8">
      <ol className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
        {BOOKING_FLOW_STEPS.map((label, i) => (
          <li
            key={label}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium sm:text-xs",
              i <= step ? "bg-primary text-white" : "bg-border/60 text-muted"
            )}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
