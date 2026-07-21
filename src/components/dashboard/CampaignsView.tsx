"use client";

import data from "@/data/dashboard.json";
import { DashCard, DashboardShell } from "@/components/dashboard/DashboardShell";
import { IconPlus } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import { useCampaignModal } from "@/components/dashboard/NewCampaignModal";

function ThroughputChart({ points }: { points: number[] }) {
  const width = 320;
  const height = 88;
  const max = Math.max(...points, 1);
  const step = width / Math.max(points.length - 1, 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = height - (p / max) * (height - 12) - 6;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-24 w-full">
      <path d={path} fill="none" stroke="url(#throughputStroke)" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d={`${path} L${width},${height} L0,${height} Z`}
        fill="url(#throughputFill)"
        opacity="0.25"
      />
      <defs>
        <linearGradient id="throughputStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="throughputFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CampaignsView() {
  const { campaigns } = data;
  const { openModal } = useCampaignModal();

  return (
    <DashboardShell title={campaigns.title} subtitle={campaigns.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {campaigns.stats.map((stat) => (
          <DashCard
            key={stat.label}
            className="relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-ink-muted">{stat.label}</p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  stat.badgeTone === "brand"
                    ? "bg-brand-soft text-brand"
                    : "bg-black/[0.04] text-ink-muted",
                )}
              >
                {stat.badge}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-ink">{stat.value}</p>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand via-accent to-brand" />
          </DashCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DashCard>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">{campaigns.throughput.title}</h2>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-brand uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {campaigns.throughput.liveLabel}
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-ink">{campaigns.throughput.value}</p>
          <ThroughputChart points={campaigns.throughput.points} />
          <div className="mt-1 flex justify-between text-[11px] text-ink-faint">
            {campaigns.throughput.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </DashCard>

        <DashCard className="flex min-h-[220px] flex-col">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">{campaigns.activity.title}</h2>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-brand uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {campaigns.activity.streamLabel}
            </span>
          </div>
          <div className="mt-8 flex flex-1 items-center justify-center">
            <p className="max-w-xs text-center text-sm text-ink-muted">
              {campaigns.activity.empty}
            </p>
          </div>
        </DashCard>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">{campaigns.list.title}</h2>
          <span className="text-sm text-ink-muted">{campaigns.list.total} total</span>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="group flex min-h-[160px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-brand/35 bg-brand-soft/50 transition hover:border-brand hover:bg-brand-soft"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl btn-primary-gradient text-white shadow-brand transition group-hover:scale-110">
            <IconPlus size={28} />
          </span>
        </button>
      </div>
    </DashboardShell>
  );
}
