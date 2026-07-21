import data from "@/data/landing.json";
import { Button } from "@/components/atoms/Button";
import { Container, Heading, Text } from "@/components/atoms/Typography";
import { Icon, IconArrowRight, type IconName } from "@/components/atoms/Icon";

export function FinalCtaSection() {
  const { finalCta } = data;

  return (
    <section
      id="cta"
      className="relative overflow-hidden panel-dark py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute left-[20%] top-[30%] h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(11,18,32,0.55)_100%)]" />
      <Container className="relative mx-auto max-w-3xl text-center animate-fade-up">
        <Heading as="h2" className="text-white">
          {finalCta.title}
        </Heading>
        <Text size="lg" className="mx-auto mt-5 max-w-xl text-white/65">
          {finalCta.description}
        </Text>

        <div className="mt-8 flex justify-center">
          <Button
            href={finalCta.cta.href}
            variant="vip"
            size="lg"
            className="shadow-[0_0_56px_rgba(45,212,191,0.45)]"
          >
            {finalCta.cta.label}
            <IconArrowRight size={18} />
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {finalCta.trustBadges.map((badge) => (
            <div
              key={badge.text}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-sm text-white/90 transition-all duration-300 hover:border-brand-light/50 hover:bg-brand/15"
            >
              <Icon name={badge.icon as IconName} size={15} className="text-brand-light" />
              {badge.text}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
