import data from "@/data/landing.json";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Container, Heading, Text } from "@/components/atoms/Typography";
import {
  IconArrowRight,
  IconCheck,
  Icon,
  type IconName,
} from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

function highlightText(text: string, highlights: string[]) {
  const pattern = new RegExp(`(${highlights.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="font-semibold gradient-text">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function HeroMockup() {
  const { mockup } = data.hero;

  return (
    <div className="relative animate-fade-up delay-200">
      <div className="glow-orb absolute -inset-10 rounded-full" />
      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-panel-dark shadow-[0_30px_80px_-28px_rgba(11,18,32,0.55)] ring-1 ring-brand/25">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand/25 to-transparent" />
        <div className="relative flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="text-[11px] text-white/45 font-medium">{mockup.url}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-brand-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-light" />
            </span>
            {mockup.liveLabel}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 border-b border-white/8 px-4 py-4">
          {mockup.steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center gap-2 text-center">
              {index < mockup.steps.length - 1 && (
                <span className="absolute left-[62%] top-4 hidden h-px w-[76%] bg-brand/50 sm:block" />
              )}
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-lg",
                  index < 2 ? "btn-primary-gradient text-white" : "bg-white/8 text-white/50",
                )}
              >
                <Icon name={step.icon as IconName} size={14} />
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-white/45">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3 px-4 py-4">
          {mockup.urls.map((row) => (
            <div key={row.path} className="rounded-xl bg-white/[0.03] px-3 py-2.5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <code className="truncate text-[11px] text-white/55">{row.path}</code>
                {row.status === "Indexed" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand-light">
                    <IconCheck size={12} /> Indexed
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-white/35">
                    Submitted
                  </span>
                )}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full btn-primary-gradient transition-all duration-1000"
                  style={{ width: `${row.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-white/8 px-4 py-4">
          {mockup.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { hero } = data;

  return (
    <section id="top" className="relative overflow-hidden section-grid">
      <div className="pointer-events-none absolute left-[12%] top-16 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-28 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-10 lg:py-20">
        <div className="animate-fade-up">
          <Badge withDot className="mb-5">
            {hero.badge}
          </Badge>
          <Heading as="h1" className="max-w-xl">
            <span className="gradient-text">{hero.title}</span>
          </Heading>
          <Text size="lg" className="mt-5 max-w-lg">
            {highlightText(hero.description, hero.highlights)}
          </Text>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <IconArrowRight size={18} />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <HeroMockup />
      </Container>
    </section>
  );
}
