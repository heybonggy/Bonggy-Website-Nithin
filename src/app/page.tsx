import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { GlobeSection } from "@/components/marketing/globe-section";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { SectionRule } from "@/components/marketing/section";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Fixed hero stays put; the opaque layer below scrolls up over it. */}
      <Hero />
      <div className="page-cover mt-[100svh]">
        <main className="flex flex-col">
          <GlobeSection />
          <SectionRule />
          <HowItWorks />
          <SectionRule />
          <TheReframeFix />
          <CtaPanel />
        </main>
        <Footer />
      </div>
    </>
  );
}
