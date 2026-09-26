import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { GlobeSection } from "@/components/marketing/globe-section";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { SectionRule } from "@/components/marketing/section";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description:
    "Bonggy is the orchestration layer between rep effort and company goals. It tracks what every rep does across every tool, aligns it to the goal, nudges the drift, and proves what's working.",
});

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
