import Link from "next/link";
import type { ReactNode } from "react";
import { IconLogoMark } from "@/components/atoms/Icon";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 section-grid" />
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[12%] bottom-[15%] h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl btn-primary-gradient text-white shadow-brand transition group-hover:scale-105">
              <IconLogoMark size={18} />
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">
              Instant Indexer
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-border bg-white/90 p-6 shadow-card backdrop-blur-sm sm:p-7">
          {children}
        </div>

        {footer && <div className="mt-5 text-center text-sm text-ink-muted">{footer}</div>}
      </div>
    </div>
  );
}
