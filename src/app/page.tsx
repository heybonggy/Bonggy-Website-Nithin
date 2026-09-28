import type { Metadata } from "next";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/metadata";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TeamsSection } from "@/components/marketing/teams-section";
import { FlowsSection } from "@/components/marketing/flows-section";
import { BotJobsSection } from "@/components/marketing/bot-jobs-section";
import { GroupsSection } from "@/components/marketing/groups-section";
import { MakeItYours } from "@/components/marketing/make-it-yours";
import { ApprovalsSection } from "@/components/marketing/approvals-section";
import { AnalyticsSection } from "@/components/marketing/analytics-section";
import { ContextSection } from "@/components/marketing/context-section";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { HomeFaq } from "@/components/marketing/home-faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description: SITE_DESCRIPTION,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex flex-col outline-none">
        <Hero />
        <TeamsSection />
        <FlowsSection />
        <BotJobsSection />
        <MakeItYours />
        <GroupsSection />
        <ApprovalsSection />
        <AnalyticsSection />
        <ContextSection />
        <HowItWorks />
        <PricingTeaser />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
