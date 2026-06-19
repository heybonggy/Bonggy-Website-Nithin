import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { IntegrationsMarquee } from "@/components/marketing/integrations-marquee";
import { GlobeSection } from "@/components/marketing/globe-section";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TheLine } from "@/components/marketing/the-line";
import { SectionRule } from "@/components/marketing/section";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <IntegrationsMarquee />
        <SectionRule />
        <GlobeSection />
        <SectionRule />
        <HowItWorks />
        <SectionRule />
        <TheReframeFix />
        <SectionRule />
        <TheLine />
      </main>
      <Footer />
    </>
  );
}
