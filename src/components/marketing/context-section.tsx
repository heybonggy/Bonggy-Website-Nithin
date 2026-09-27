import { ContextView } from "@/components/product-mock/context-view";
import { Section, SectionHeader } from "./section";

/** #context: company defaults, with team overrides. */
export function ContextSection() {
  return (
    <Section id="context" aria-labelledby="context-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <SectionHeader
          title={<span id="context-title">Your context, read first.</span>}
          intro="Company defaults every bot starts from, with overrides where a team works differently."
        />
        <ContextView />
      </div>
    </Section>
  );
}
