"use client";

import { useState } from "react";
import data from "@/data/landing.json";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Typography";
import {
  IconArrowRight,
  IconClose,
  IconLogoMark,
  IconMenu,
} from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { site, nav } = data;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass-nav">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 shrink-0 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl btn-primary-gradient text-white shadow-brand transition-all duration-300 group-hover:scale-105 group-hover:shadow-brand-lg">
            <IconLogoMark size={18} />
          </span>
          <span className="text-[15px] font-bold text-ink tracking-tight">
            {site.name}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors duration-200 hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={nav.cta.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {nav.cta.label}
            <IconArrowRight size={16} />
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-ink transition hover:bg-black/[0.03]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose size={18} /> : <IconMenu size={18} />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-white transition-all duration-300",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-brand-soft hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button href={nav.cta.href} className="mt-2 sm:hidden" onClick={() => setOpen(false)}>
            {nav.cta.label}
            <IconArrowRight size={16} />
          </Button>
        </Container>
      </div>
    </header>
  );
}
