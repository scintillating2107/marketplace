import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-white hover:bg-primary-hover shadow-sm active:scale-[0.98]",
  secondary: "bg-accent-soft text-foreground hover:bg-accent",
  ghost: "text-foreground hover:bg-accent-soft",
  outline: "border border-border bg-surface hover:border-foreground/30 text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-full",
  md: "px-4 py-2 text-sm font-semibold rounded-full",
  lg: "px-6 py-2.5 text-base font-bold rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
