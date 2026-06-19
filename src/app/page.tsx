import { Nav } from "@/components/marketing/nav";
import { Hero } from "@/components/marketing/hero";
import { IntegrationsMarquee } from "@/components/marketing/integrations-marquee";
import { GlobeSection } from "@/components/marketing/globe-section";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ForEveryRole } from "@/components/marketing/for-every-role";
import { TheLine } from "@/components/marketing/the-line";
import { SectionRule } from "@/components/marketing/section";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <IntegrationsMarquee />
        <SectionRule />
        <GlobeSection />
        <SectionRule />
        <TheReframeFix />
        <SectionRule />
        <HowItWorks />
        <SectionRule />
        <ForEveryRole />
        <SectionRule />
        <TheLine />
      </main>
      <Footer />
    </>
  );
}
