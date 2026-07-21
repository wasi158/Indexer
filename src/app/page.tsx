import {
  AudienceBar,
  ComparisonSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  LiveDemoSection,
  Navbar,
  PricingSection,
  ProblemSection,
  WhatsAppFab,
} from "@/components/organisms";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AudienceBar />
        <ProblemSection />
        <HowItWorksSection />
        <LiveDemoSection />
        <PricingSection />
        <ComparisonSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <footer className="border-t border-border bg-surface py-6 text-center text-sm text-ink-muted">
        © {new Date().getFullYear()} Instant Indexer. All rights reserved.
      </footer>
      <WhatsAppFab />
    </>
  );
}
