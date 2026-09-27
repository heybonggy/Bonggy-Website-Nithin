import { AnalyticsView } from "@/components/product-mock/analytics-view";
import { Section, SectionHeader } from "./section";

/** #analytics: what every bot did, and the goal behind it. */
export function AnalyticsSection() {
  return (
    <Section id="analytics" aria-labelledby="analytics-title">
      <SectionHeader
        title={<span id="analytics-title">See what every bot did, and why.</span>}
        intro="Runs, approvals and the revenue goal behind each one. Filter by team."
      />
      <AnalyticsView className="mt-12" />
    </Section>
  );
}
