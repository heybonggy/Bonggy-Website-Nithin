import { AnalyticsView } from "@/components/product-mock/analytics-view";
import { Section, SectionHeader } from "./section";
import { ANALYTICS_SECTION } from "@/content/pages/home";

/** #analytics: what every bot did, and the goal behind it. */
export function AnalyticsSection() {
  return (
    <Section id="analytics" card aria-labelledby="analytics-title">
      <SectionHeader
        title={<span id="analytics-title">{ANALYTICS_SECTION.title}</span>}
        intro={ANALYTICS_SECTION.intro}
      />
      <AnalyticsView className="mt-10" />
    </Section>
  );
}
