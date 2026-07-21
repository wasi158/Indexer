"use client";

import { useState } from "react";
import data from "@/data/dashboard.json";
import { DashCard, DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  IconDownload,
  IconGlobe,
  IconMap,
  IconPlus,
  IconSearch,
} from "@/components/atoms/Icon";

export function SitemapView() {
  const { sitemap } = data;
  const [domain, setDomain] = useState("");
  const [urls, setUrls] = useState("");

  return (
    <DashboardShell title={sitemap.title} subtitle={sitemap.subtitle}>
      <div className="space-y-4">
        <DashCard>
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <IconMap size={18} />
            </span>
            <div>
              <h2 className="font-bold text-ink">{sitemap.fetchCard.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {sitemap.fetchCard.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
                <IconGlobe size={16} />
              </span>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder={sitemap.fetchCard.placeholder}
                className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl btn-primary-gradient px-4 text-sm font-semibold text-white shadow-brand transition hover:shadow-brand-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <IconDownload size={16} />
              {sitemap.fetchCard.cta}
            </button>
          </div>
        </DashCard>

        <DashCard className="transition hover:shadow-card-hover">
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <IconSearch size={18} />
            </span>
            <div>
              <h2 className="font-bold text-ink">{sitemap.pasteCard.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {sitemap.pasteCard.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder={sitemap.pasteCard.placeholder}
              rows={5}
              className="w-full flex-1 resize-y rounded-xl border border-border bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl btn-primary-gradient px-4 text-sm font-semibold text-white shadow-brand transition hover:shadow-brand-lg hover:-translate-y-0.5 active:scale-[0.98] lg:mt-0"
            >
              <IconPlus size={16} />
              {sitemap.pasteCard.cta}
            </button>
          </div>
        </DashCard>
      </div>
    </DashboardShell>
  );
}
