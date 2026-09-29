import { Stagger } from "./entrances";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { q: string; a: string };

/** FAQ accordion shared by the homepage and /faq. */
export function FaqList({
  items,
  headingLevel = 2,
  openFirst = true,
}: {
  items: FaqItem[];
  headingLevel?: 2 | 3;
  openFirst?: boolean;
}) {
  return (
    <Stagger deep>
    <Accordion defaultValue={openFirst ? [items[0]?.q] : []}>
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger headingLevel={headingLevel}>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </Stagger>
  );
}
