"use client";

import { useRef } from "react";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ open, onClose, title, children, className, size = "md" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogA11y(open, onClose, panelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 motion-safe:animate-[fade-in_200ms_ease-out]"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={cn(
          "relative z-10 max-h-[90vh] w-full overflow-auto rounded-2xl bg-surface p-6 shadow-elevated motion-safe:animate-[fade-in_220ms_ease-out]",
          sizes[size],
          className
        )}
      >
        <h2 id="modal-title" className="sr-only">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
