import data from "@/data/landing.json";
import { Container, Heading, SectionLabel, Text } from "@/components/atoms/Typography";
import { Icon, type IconName } from "@/components/atoms/Icon";

export function HowItWorksSection() {
  const { howItWorks } = data;

  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <SectionLabel>{howItWorks.label}</SectionLabel>
          <Heading as="h2" className="mt-3">
            {howItWorks.title}
          </Heading>
          <Text size="lg" className="mt-4">
            {howItWorks.description}
          </Text>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {howItWorks.steps.map((step, index) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {index < howItWorks.steps.length - 1 && (
                <span className="pointer-events-none absolute left-[calc(50%+2.25rem)] top-7 hidden h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-brand to-accent lg:block" />
              )}
              <div className="group relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl btn-primary-gradient text-white shadow-brand transition-all duration-300 hover:scale-110 hover:shadow-brand-lg">
                <Icon name={step.icon as IconName} size={22} />
              </div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
                STEP {step.step}
              </p>
              <h3 className="mt-2 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
