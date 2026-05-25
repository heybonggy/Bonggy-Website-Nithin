import { Nav } from "@/components/marketing/nav";
import { Hero } from "@/components/marketing/hero";
import { GlobeSection } from "@/components/marketing/globe-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TheProblem } from "@/components/marketing/the-problem";
import { TheReframeFix } from "@/components/marketing/the-reframe-fix";
import { TheProof } from "@/components/marketing/the-proof";
import { UseCases } from "@/components/marketing/use-cases";
import { Close } from "@/components/marketing/close";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <GlobeSection />
        <HowItWorks />
        <TheProblem />
        <TheReframeFix />
        <TheProof />
        <UseCases />
        <Close />
      </main>
      <Footer />
    </>
  );
}
