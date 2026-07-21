"use client";

import { useState } from "react";
import data from "@/data/landing.json";
import { Container, Heading, SectionLabel } from "@/components/atoms/Typography";
import { IconChevronDown, IconChevronUp } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export function FaqSection() {
  const { faq } = data;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <SectionLabel>{faq.label}</SectionLabel>
          <Heading as="h2" className="mt-3">
            {faq.title}
          </Heading>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                      isOpen
                        ? "bg-brand-soft text-brand"
                        : "bg-black/[0.04] text-brand",
                    )}
                  >
                    {isOpen ? (
                      <IconChevronUp size={16} />
                    ) : (
                      <IconChevronDown size={16} />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
