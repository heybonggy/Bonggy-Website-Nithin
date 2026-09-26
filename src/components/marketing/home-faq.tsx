import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { FaqList, type FaqItem } from "./faq-list";

// Keep these consistent with the matching answers on /faq.
export const HOME_FAQ: FaqItem[] = [
  {
    q: "Is this an AI SDR?",
    a: "No. AI SDRs send more and mean less. Bonggy is a studio where your team builds agents that model your market, research your accounts and draft the work. Nothing is blasted out, and a person approves anything that goes out.",
  },
  {
    q: "Does it send emails?",
    a: "Only after someone on your team approves them. Nothing goes out on its own. Approved drafts go out from the rep's connected account or get pushed to your own email or sequencer.",
  },
  {
    q: "Can I build my own bots?",
    a: "Yes. Start from a template like Market Modeller, Account Researcher or Brief Writer, or build one from scratch: give it a role, instructions, the tools it can use and a revenue goal. Then group bots into pods that share memory.",
  },
  {
    // TODO(integrations): confirm the supported tools before naming any.
    q: "Which tools does it connect to?",
    a: "The tools your team already works in: CRM, email, calendar, Slack and call notes. Agents only use the permissions you connect.",
  },
  {
    q: "How is it priced?",
    a: "By active agents plus usage. We're setting plans with our early-access teams, so book a 30-minute call and we'll walk you through it.",
  },
];

export function HomeFaq() {
  return (
    <Section id="faq" eyebrow="FAQ">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
            Short answers.{" "}
            <span className="text-muted-foreground/85">
              The long ones are on the FAQ page.
            </span>
          </h2>
          <Link
            href="/faq"
            className="group mt-8 inline-flex items-center gap-2 rounded font-mono text-[11px] uppercase tracking-[0.16em] text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See all questions
            <ArrowRight
              weight="bold"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
        <FaqList items={HOME_FAQ} headingLevel="h3" />
      </div>
    </Section>
  );
}
