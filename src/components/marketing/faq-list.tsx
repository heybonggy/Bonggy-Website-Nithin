"use client";

import * as React from "react";
import { Stagger } from "./entrances";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { q: string; a: string };

/**
 * A stable id for one question, from the question itself: `#what-is-a-bot`.
 *
 * Linking to an answer only works if the id doesn't move, so it comes from the
 * words rather than the position in the list.
 */
export function faqId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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
  const [open, setOpen] = React.useState<string[]>(() =>
    openFirst && items[0] ? [items[0].q] : [],
  );

  /**
   * A link to a question opens it. Reading the hash in an effect rather than
   * during render keeps the server and the first client paint identical, and a
   * hashchange handles a second link to the same page.
   */
  React.useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const match = items.find((item) => faqId(item.q) === hash);
      if (!match) return;
      setOpen((current) => (current.includes(match.q) ? current : [...current, match.q]));
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  return (
    <Stagger deep>
      <Accordion value={open} onValueChange={(value) => setOpen(value as string[])}>
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q} id={faqId(item.q)} className="scroll-mt-28">
            <AccordionTrigger headingLevel={headingLevel}>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Stagger>
  );
}
