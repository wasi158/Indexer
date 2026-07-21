import data from "@/data/landing.json";
import { Container, Heading, SectionLabel } from "@/components/atoms/Typography";
import { Icon, IconCheck, IconX, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export function ComparisonSection() {
  const { comparison } = data;

  return (
    <section id="compare" className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <SectionLabel>{comparison.label}</SectionLabel>
          <Heading as="h2" className="mt-3">
            {comparison.title}
          </Heading>
        </div>

        <div className="mt-12 overflow-x-auto animate-fade-up delay-100">
          <div className="min-w-[720px] overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <div className="grid grid-cols-4 border-b border-border">
              <div className="p-4 sm:p-5" />
              {comparison.columns.map((col, index) => (
                <div
                  key={col}
                  className={cn(
                    "p-4 sm:p-5 text-center",
                    index === 0 && "bg-brand-soft/80 border-t-2 border-t-brand",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-bold",
                      index === 0 ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {col}
                  </p>
                  {index === 0 && (
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase">
                      {comparison.youLabel}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {comparison.rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 border-b border-border last:border-0 transition-colors hover:bg-black/[0.015]"
              >
                <div className="flex items-center gap-3 p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-ink-muted">
                    <Icon name={row.icon as IconName} size={16} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{row.feature}</span>
                </div>
                {row.values.map((value, index) => (
                  <div
                    key={`${row.feature}-${index}`}
                    className={cn(
                      "flex items-center justify-center gap-2 p-4 sm:p-5 text-center",
                      index === 0 && "bg-brand-soft/35",
                    )}
                  >
                    {value.positive ? (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full btn-primary-gradient text-white">
                        <IconCheck size={12} />
                      </span>
                    ) : (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-ink-muted">
                        <IconX size={12} />
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        value.positive
                          ? "font-semibold text-ink"
                          : "text-ink-muted",
                      )}
                    >
                      {value.text}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
