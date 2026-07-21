"use client";

import { useState } from "react";
import data from "@/data/dashboard.json";
import { DashCard, DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  IconBolt,
  IconCopy,
  IconLink,
  IconWallet,
  IconWarning,
} from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
    >
      <IconCopy size={13} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function BillingView() {
  const { billing } = data;
  const [selectedBundle, setSelectedBundle] = useState(billing.pricing.vip.bundles[0]);

  return (
    <DashboardShell title={billing.title} subtitle={billing.subtitle}>
      <div className="grid gap-4 md:grid-cols-3">
        <DashCard>
          <p className="text-sm text-ink-muted">{billing.credits.normal.label}</p>
          <p className="mt-3 text-4xl font-bold text-ink">
            {billing.credits.normal.value}
          </p>
          <p className="mt-2 text-sm font-medium text-brand">
            {billing.credits.normal.hint}
          </p>
        </DashCard>

        <DashCard className="panel-dark text-white border-transparent shadow-[0_20px_40px_-24px_rgba(13,148,136,0.5)]">
          <p className="text-sm text-white/55">{billing.credits.vip.label}</p>
          <p className="mt-3 text-4xl font-bold text-brand-light">
            {billing.credits.vip.value}
          </p>
          <p className="mt-2 text-sm font-medium text-brand-light">
            {billing.credits.vip.hint}
          </p>
        </DashCard>

        <a
          href="#top-up"
          className="card-lift flex flex-col items-start justify-between rounded-2xl border-2 border-dashed border-brand/40 bg-brand-soft/70 p-5"
        >
          <p className="text-sm font-medium text-ink-muted">
            {billing.credits.topUpPrompt}
          </p>
          <span className="btn-primary-gradient mt-6 inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:shadow-brand-lg">
            {billing.credits.topUpCta}
          </span>
        </a>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink">{billing.pricing.title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{billing.pricing.description}</p>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <DashCard>
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                <IconLink size={18} />
              </span>
              <div>
                <h3 className="font-bold text-ink">{billing.pricing.normal.title}</h3>
                <p className="text-sm text-ink-muted">
                  {billing.pricing.normal.subtitle}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {billing.pricing.normal.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 transition hover:border-brand/30"
                >
                  <div>
                    <p className="font-semibold text-ink">{tier.name}</p>
                    <p className="text-sm text-ink-muted">
                      {tier.links.toLocaleString()} links
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-ink">
                      ${tier.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-ink-muted">
                      ${tier.perLink.toFixed(3)} / link
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashCard>

          <div className="relative overflow-hidden rounded-2xl panel-dark p-5 text-white shadow-[0_20px_40px_-24px_rgba(13,148,136,0.55)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand/30 to-transparent" />
            <span className="relative mb-4 inline-flex items-center gap-1 rounded-full btn-primary-gradient px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
              <IconBolt size={11} />
              {billing.pricing.vip.badge}
            </span>
            <div className="relative mb-4 flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-light/40 text-brand-light">
                <IconBolt size={18} />
              </span>
              <div>
                <h3 className="font-bold">{billing.pricing.vip.title}</h3>
                <p className="text-sm text-brand-light">{billing.pricing.vip.subtitle}</p>
              </div>
            </div>
            <p className="relative mb-5 text-2xl font-bold text-brand-light">
              {billing.pricing.vip.priceLabel}
            </p>
            <div className="relative grid grid-cols-3 gap-2">
              {billing.pricing.vip.bundles.map((bundle) => (
                <button
                  key={bundle}
                  type="button"
                  onClick={() => setSelectedBundle(bundle)}
                  className={cn(
                    "rounded-xl border px-2 py-4 text-center transition",
                    selectedBundle === bundle
                      ? "border-brand-light bg-brand/25"
                      : "border-white/10 bg-white/5 hover:border-brand-light/40",
                  )}
                >
                  <p className="text-lg font-bold">{bundle}</p>
                  <p className="text-xs text-white/50">links</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DashCard id="top-up" className="mt-8 scroll-mt-8">
        <h2 className="text-xl font-bold text-ink">{billing.topUp.title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          {billing.topUp.description}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2 font-semibold text-ink">
              <IconWallet size={18} className="text-brand" />
              {billing.topUp.easypaisa.label}
            </div>
            <div className="space-y-3">
              {billing.topUp.easypaisa.fields.map((field) => (
                <div
                  key={field.label}
                  className="rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <p className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">
                    {field.label}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="font-semibold text-ink">{field.value}</p>
                    <CopyButton value={field.value} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 font-semibold text-ink">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f7931a] text-[10px] font-bold text-white">
                ₿
              </span>
              {billing.topUp.crypto.label}
            </div>
            <div className="mb-3 flex items-center gap-2 text-sm text-ink-muted">
              <span className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand">
                {billing.topUp.crypto.asset}
              </span>
              {billing.topUp.crypto.network}
            </div>
            <p className="mb-4 break-all rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs text-ink">
              {billing.topUp.crypto.address}
            </p>
            <div className="mx-auto mb-4 flex h-44 w-44 items-center justify-center rounded-xl border border-border bg-white p-3">
              <div
                className="h-full w-full rounded-md"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg,#111 25%,transparent 25%),linear-gradient(-45deg,#111 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#111 75%),linear-gradient(-45deg,transparent 75%,#111 75%)",
                  backgroundSize: "12px 12px",
                  backgroundPosition: "0 0,0 6px,6px -6px,-6px 0",
                }}
                aria-label="Crypto QR code placeholder"
              />
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(billing.topUp.crypto.address)}
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
            >
              <IconCopy size={15} />
              Copy address
            </button>
            <div className="flex gap-2 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-3 text-sm text-amber-800">
              <IconWarning size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <p>{billing.topUp.crypto.warning}</p>
            </div>
          </div>
        </div>
      </DashCard>
    </DashboardShell>
  );
}
