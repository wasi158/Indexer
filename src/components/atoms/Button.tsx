import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "vip" | "soft";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "btn-primary-gradient text-white shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5",
  secondary:
    "bg-white text-ink border border-border shadow-sm hover:border-brand/40 hover:bg-brand-soft hover:-translate-y-0.5",
  outline:
    "bg-brand-soft text-brand border border-brand/25 hover:bg-brand-soft-strong hover:border-brand/45 hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink-muted hover:text-brand hover:bg-brand-soft",
  vip: "btn-primary-gradient text-white shadow-brand hover:brightness-110 hover:-translate-y-0.5 hover:shadow-brand-lg",
  soft: "bg-brand-soft text-brand border border-brand/15 hover:bg-brand-soft-strong hover:-translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-xl gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-[15px] rounded-2xl gap-2",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold tracking-[-0.01em] transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
