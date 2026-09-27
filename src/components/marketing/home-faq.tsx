import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { FaqJsonLd, FaqList, type FaqItem } from "./faq-list";

// Keep these consistent with /faq, which reuses them word for word.
export const HOME_FAQ: FaqItem[] = [
  {
    q: "What is a bot?",
    a: "A bot does one job for your team, like researching accounts before calls. You describe the job in a sentence and it runs as a flow.",
  },
  {
    q: "What's in a flow?",
    a: "Six parts: trigger, context, steps, approval, output and goal. Every part stays editable.",
  },
  {
    q: "What's a hard limit?",
    a: "A rule in your own words, like \"never email anyone\". It becomes part of the flow, and the bot can't cross it.",
  },
  {
    q: "What can bots do without approval?",
    a: "Only internal work (briefs in chat, Slack summaries, reports) and only if your team allows it. Anything customer-facing waits for a person.",
  },
  {
    q: "Do marketing bots send campaigns?",
    a: "No. They research and draft. Campaign sends stay in your own tools, after approval.",
  },
  {
    // TODO(integrations): confirm the real list before naming any vendor.
    q: "Which tools does it connect to?",
    a: "The ones your team already uses: CRM, email, calendar, Slack and call notes. Bots only use the permissions you connect.",
  },
  {
    // TODO(security): confirm with engineering before stating specifics
    // (protocols, ciphers). Keep "not attained" until SOC 2 Type II is done.
    q: "How is my data handled?",
    a: "Bonggy is built for read-scoped permissions, encryption in transit and at rest, and no training on your data. SOC 2 Type II: on the path, not attained.",
  },
  {
    q: "Who is it for?",
    a: "Sales, RevOps and marketing teams. It usually starts with one team's flows and spreads as other teams build their own.",
  },
  {
    q: "How is it priced?",
    a: "Pricing is based on active bots plus usage. Flow runs count toward usage. We're setting plans with our first teams, so there are no public numbers yet.",
  },
  {
    q: "How do we start?",
    a: "A strategy call. We'll map one flow with you on real work.",
  },
];

/** #faq: ten short answers; the rest live on /faq. */
export function HomeFaq() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <FaqJsonLd items={HOME_FAQ} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <h2 id="faq-title" className="text-heading text-foreground sm:text-heading-lg">
            Questions, answered.
          </h2>
          <Link
            href="/faq"
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-ui font-medium text-foreground underline-offset-4 hover:underline"
          >
            See all questions
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <FaqList items={HOME_FAQ} headingLevel={3} />
      </div>
    </Section>
  );
}
