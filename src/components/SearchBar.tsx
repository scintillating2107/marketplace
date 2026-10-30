"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
  containerClassName?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, onSearch, ...props }, ref) => (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-sm transition-shadow focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-accent-soft",
        containerClassName
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
      <input
        ref={ref}
        type="search"
        className={cn(
          "min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none",
          className
        )}
        {...props}
      />
      {onSearch && (
        <button
          type="button"
          onClick={onSearch}
          className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover"
        >
          Search
        </button>
      )}
    </div>
  )
);
SearchBar.displayName = "SearchBar";
