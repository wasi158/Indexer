import data from "@/data/landing.json";
import { Container, Heading, SectionLabel, Text } from "@/components/atoms/Typography";
import { Icon, type IconName } from "@/components/atoms/Icon";

export function ProblemSection() {
  const { problem } = data;

  return (
    <section id="problem" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl animate-fade-up">
          <SectionLabel align="left">{problem.label}</SectionLabel>
          <Heading as="h2" className="mt-3">
            {problem.title}
          </Heading>
          <Text size="lg" className="mt-4 max-w-xl">
            {problem.description}
          </Text>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problem.cards.map((card, index) => (
            <article
              key={card.title}
              className="group card-lift rounded-2xl border border-border bg-white p-5 animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110 group-hover:btn-primary-gradient group-hover:text-white">
                <Icon name={card.icon as IconName} size={18} />
              </div>
              <h3 className="text-base font-bold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
