import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionLabel({
  children,
  className,
  align = "center",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[12px] font-semibold tracking-[0.18em] uppercase text-brand",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}

export function Heading({ as: Tag = "h2", children, className }: HeadingProps) {
  const sizes = {
    h1: "text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight",
    h2: "text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] tracking-tight",
    h3: "text-xl sm:text-2xl leading-snug tracking-tight",
  };

  return (
    <Tag className={cn("font-bold text-ink", sizes[Tag], className)}>
      {children}
    </Tag>
  );
}

interface TextProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Text({ children, className, size = "md" }: TextProps) {
  const sizes = {
    sm: "text-sm leading-relaxed",
    md: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed",
  };

  return (
    <p className={cn("text-ink-muted", sizes[size], className)}>{children}</p>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
