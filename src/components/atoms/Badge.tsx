import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  withDot?: boolean;
  tone?: "brand" | "dark" | "muted";
}

export function Badge({
  children,
  className,
  withDot = false,
  tone = "brand",
}: BadgeProps) {
  const tones = {
    brand: "bg-brand-soft text-brand border border-brand/20",
    dark: "bg-white/10 text-brand-light border border-white/15",
    muted: "bg-black/[0.04] text-ink-muted border border-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {withDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
      )}
      {children}
    </span>
  );
}
