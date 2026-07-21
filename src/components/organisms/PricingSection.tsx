"use client";

import { useState } from "react";
import data from "@/data/landing.json";
import { Button } from "@/components/atoms/Button";
import { Container, Heading, SectionLabel, Text } from "@/components/atoms/Typography";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconLink,
} from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export function PricingSection() {
  const { pricing } = data;
  const [selectedBundle, setSelectedBundle] = useState(pricing.vip.bundles[0]);

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <SectionLabel>{pricing.label}</SectionLabel>
          <Heading as="h2" className="mt-3">
            {pricing.title}
          </Heading>
          <Text size="lg" className="mt-4">
            {pricing.description}
          </Text>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="card-lift rounded-2xl border border-border bg-white p-6 sm:p-7 animate-fade-up">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <IconLink size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{pricing.normal.title}</h3>
                <p className="text-sm text-ink-muted">{pricing.normal.subtitle}</p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {pricing.normal.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-ink">{tier.name}</p>
                    <p className="text-sm text-ink-muted">
                      {tier.links.toLocaleString()} links
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-ink">${tier.price.toFixed(2)}</p>
                    <p className="text-xs text-ink-muted">
                      ${tier.perLink.toFixed(3)} / link
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full" href="#cta">
              {pricing.normal.cta}
            </Button>
          </article>

          <article className="relative overflow-hidden rounded-2xl panel-dark p-6 sm:p-7 text-white shadow-[0_30px_60px_-28px_rgba(13,148,136,0.5)] transition-all duration-300 hover:-translate-y-1 animate-fade-up delay-100">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand/35 to-transparent" />
            <span className="relative mb-5 inline-flex items-center gap-1.5 rounded-full btn-primary-gradient px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase animate-pulse-soft">
              <IconBolt size={12} />
              {pricing.vip.badge}
            </span>

            <div className="relative mb-6 flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-light/40 text-brand-light">
                <IconBolt size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">{pricing.vip.title}</h3>
                <p className="text-sm text-brand-light">{pricing.vip.subtitle}</p>
              </div>
            </div>

            <div className="relative mb-5 flex items-end gap-2">
              <span className="text-5xl font-bold text-brand-light">
                ${pricing.vip.price.toFixed(2)}
              </span>
              <span className="mb-2 text-sm text-white/50">{pricing.vip.priceLabel}</span>
            </div>

            <ul className="relative mb-6 space-y-2.5">
              {pricing.vip.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
                  <span className="mt-0.5 text-brand-light">
                    <IconCheck size={16} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="relative mb-3 text-[11px] font-semibold tracking-[0.16em] text-white/40 uppercase">
              Bundles
            </p>
            <div className="relative mb-6 grid grid-cols-3 gap-2">
              {pricing.vip.bundles.map((bundle) => (
                <button
                  key={bundle}
                  type="button"
                  onClick={() => setSelectedBundle(bundle)}
                  className={cn(
                    "rounded-xl border px-2 py-3 text-sm font-semibold transition-all duration-200",
                    selectedBundle === bundle
                      ? "border-brand-light bg-brand/25 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-brand-light/40",
                  )}
                >
                  {bundle} links
                </button>
              ))}
            </div>

            <Button variant="vip" className="relative w-full" href="#cta">
              {pricing.vip.cta}
              <IconArrowRight size={16} />
            </Button>
          </article>
        </div>
      </Container>
    </section>
  );
}
