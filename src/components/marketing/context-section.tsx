import { ContextView } from "@/components/product-mock/context-view";
import { Section, SectionHeader } from "./section";
import { CONTEXT_SECTION } from "@/content/pages/home";

/** #context: company defaults, with team overrides. */
export function ContextSection() {
  return (
    <Section id="context" aria-labelledby="context-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <SectionHeader
          title={<span id="context-title">{CONTEXT_SECTION.title}</span>}
          intro={CONTEXT_SECTION.intro}
        />
        <ContextView />
      </div>
    </Section>
  );
}
