import type { Metadata } from "next";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/metadata";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { RolesStrip } from "@/components/marketing/roles-strip";
import { NewAgentSection } from "@/components/marketing/new-agent-section";
import { AnalyticsSection } from "@/components/marketing/analytics-section";
import { ContextSection } from "@/components/marketing/context-section";
import { TrustSection } from "@/components/marketing/trust-section";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { HomeFaq } from "@/components/marketing/home-faq";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { SectionRule } from "@/components/marketing/section";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description: SITE_DESCRIPTION,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <RolesStrip />
        <SectionRule />
        <NewAgentSection />
        <SectionRule />
        <AnalyticsSection />
        <SectionRule />
        <ContextSection />
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
