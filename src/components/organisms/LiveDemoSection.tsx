import data from "@/data/landing.json";
import { Badge } from "@/components/atoms/Badge";
import { Container, Heading, Text } from "@/components/atoms/Typography";
import {
  Icon,
  IconArrowLeft,
  IconLogoMark,
  IconSearch,
  type IconName,
} from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

function DashboardPreview() {
  const { dashboard } = data.liveDemo;

  return (
    <div className="relative mt-12 animate-fade-up delay-150">
      <div className="absolute -inset-6 rounded-[2rem] bg-brand/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_80px_-40px_rgba(11,18,32,0.35)]">
        <div className="flex items-center justify-center border-b border-border bg-surface px-4 py-2.5">
          <div className="absolute left-4 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="text-[11px] font-medium text-ink-muted">{dashboard.url}</p>
        </div>

        <div className="grid min-h-[420px] lg:grid-cols-[220px_1fr]">
          <aside className="hidden bg-sidebar p-4 text-white lg:block">
            <div className="mb-8 flex items-center gap-2.5 px-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg btn-primary-gradient text-white shadow-brand">
                <IconLogoMark size={16} />
              </span>
              <span className="text-sm font-bold">{dashboard.brand}</span>
            </div>
            <nav className="space-y-1">
              {dashboard.nav.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition",
                    item.active
                      ? "btn-primary-gradient text-white font-semibold"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon name={item.icon as IconName} size={16} />
                    {item.label}
                  </span>
                  {"badge" in item && item.badge && (
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                        item.active ? "bg-ink/10 text-ink" : "bg-white/10",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          <div className="bg-surface p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-ink">{dashboard.header.title}</h3>
                <p className="text-sm text-ink-muted">{dashboard.header.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-ink-muted">
                  {dashboard.header.credits}
                </span>
                <button
                  type="button"
                  className="rounded-lg btn-primary-gradient px-3 py-2 text-xs font-semibold text-white shadow-brand transition hover:shadow-brand-lg hover:scale-[1.02]"
                >
                  {dashboard.header.cta}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-brand"
            >
              <IconArrowLeft size={14} />
              {dashboard.breadcrumb}
            </button>

            <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-ink">
                  {dashboard.context.title}
                </span>
                <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                  {dashboard.context.status}
                </span>
              </div>
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
              >
                {dashboard.context.action}
              </button>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {dashboard.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-white p-3 transition hover:border-brand/30 hover:shadow-sm"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-ink">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border bg-surface text-[10px] font-semibold tracking-wider text-ink-muted uppercase">
                  <tr>
                    {dashboard.table.columns.map((col) => (
                      <th key={col} className="px-3 py-3 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dashboard.table.rows.map((row) => (
                    <tr
                      key={row.url}
                      className="border-b border-border/70 last:border-0 transition hover:bg-brand-soft/30"
                    >
                      <td className="px-3 py-3 max-w-[220px] truncate text-ink">
                        {row.url}
                      </td>
                      <td className="px-3 py-3">
                        <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-ink-muted">{row.lastChecked}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
                        >
                          <IconSearch size={12} />
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveDemoSection() {
  const { liveDemo } = data;

  return (
    <section id="live-demo" className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <Badge withDot className="mb-4">
            {liveDemo.badge}
          </Badge>
          <Heading as="h2">{liveDemo.title}</Heading>
          <Text size="lg" className="mt-4">
            {liveDemo.description}
          </Text>
        </div>
        <DashboardPreview />
      </Container>
    </section>
  );
}
