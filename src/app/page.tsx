import type { Metadata } from "next";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/metadata";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { TeamsSection } from "@/components/marketing/teams-section";
import { FlowsSection } from "@/components/marketing/flows-section";
import { BotJobsSection } from "@/components/marketing/bot-jobs-section";
import { GroupsSection } from "@/components/marketing/groups-section";
import { ApprovalsSection } from "@/components/marketing/approvals-section";
import { AnalyticsSection } from "@/components/marketing/analytics-section";
import { ContextSection } from "@/components/marketing/context-section";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { HomeFaq } from "@/components/marketing/home-faq";
import { CtaPanel } from "@/components/marketing/cta-panel";
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
        <TeamsSection />
        <FlowsSection />
        <BotJobsSection />
        <GroupsSection />
        <ApprovalsSection />
        <AnalyticsSection />
        <ContextSection />
        <TheReframeFix />
        <PricingTeaser />
        <HomeFaq />
        <CtaPanel />
      </main>
      <Footer />
    </>
  );
}
