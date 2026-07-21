import data from "@/data/landing.json";
import { Container } from "@/components/atoms/Typography";
import { Icon, type IconName } from "@/components/atoms/Icon";

export function AudienceBar() {
  const { audiences } = data;

  return (
    <section className="border-y border-border bg-surface">
      <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:gap-8">
        <p className="shrink-0 text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
          {audiences.label}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
          {audiences.items.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-2 rounded-full px-1 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-brand"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
                <Icon
                  name={item.icon as IconName}
                  size={14}
                />
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
