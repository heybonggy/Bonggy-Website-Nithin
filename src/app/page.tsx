import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { RolesStrip } from "@/components/marketing/roles-strip";
import { BotBuilder } from "@/components/marketing/bot-builder";
import { MemoryGraph } from "@/components/marketing/memory-graph";
import { AnalyticsDashboard } from "@/components/marketing/analytics-dashboard";
import { TrustSection } from "@/components/marketing/trust-section";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { HomeFaq } from "@/components/marketing/home-faq";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { SectionRule } from "@/components/marketing/section";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description:
    "Bonggy is a studio for sales agents that model your market, research your accounts and draft the work, aligned to revenue and reviewed by your team.",
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <RolesStrip />
        <SectionRule />
        <BotBuilder />
        <SectionRule />
        <MemoryGraph />
        <SectionRule />
        <AnalyticsDashboard />
        <SectionRule />
        <TheReframeFix />
        <TrustSection />
        <SectionRule />
        <PricingTeaser />
        <SectionRule />
        <HomeFaq />
        <CtaPanel />
      </main>
      <Footer />
    </>
  );
}
