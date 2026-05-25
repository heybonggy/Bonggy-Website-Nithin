import type { Metadata } from "next";
import {
  SubPageShell,
  SubPageBlock,
} from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "You don't operate Bonggy. You install it. Describe the motion you want in plain English, and Bonggy turns it into an agent that runs on its own — watching accounts, scoring intent, drafting outreach, queuing for review.",
};

export default function HowItWorksPage() {
  return (
    <SubPageShell
      eyebrow="How it works"
      title="You don't operate Bonggy."
      titleAccent="You install it."
      lede="Apollo is a database. Clay is a workbench. Bonggy is neither. You describe the motion in plain English and Bonggy builds it into an agent that runs on its own — watching the right signals, scoring the right accounts, drafting outreach grounded in what actually changed."
      narrow
    >
      <div className="divide-y divide-border/60">
        <SubPageBlock
          index="01"
          tag="The input"
          title="Describe the motion"
        >
          <p>
            Type it the way you&apos;d say it. &quot;Every Monday, find
            accounts that just hired a VP Sales, draft a personalized email
            referencing the hire, and queue it for review.&quot;
          </p>
          <p>
            No pipeline to assemble, no formulas, no specialist to hire.
            You&apos;re describing the motion, not building the plumbing.
          </p>
        </SubPageBlock>

        <SubPageBlock
          index="02"
          tag="The compile"
          title="Bonggy builds the agent"
        >
          <p>
            Your description is compiled into a real, running workflow.
            Watchers tied to signal sources, clusterers that turn a stream of
            events into account narratives, scorers that compare against your
            closed-won corpus, and drafters that pull the angle from what
            actually changed.
          </p>
          <p>
            The work a rep would have done by hand, scheduled and continuous.
          </p>
        </SubPageBlock>

        <SubPageBlock
          index="03"
          tag="The execution"
          title="You stay in control"
        >
          <p>
            Every draft is queued for human approval before anything sends.
            Nothing leaves your domain without a sign-off.
          </p>
          <p>
            The thinking is automated; the sending stays a decision. Approved
            drafts get pushed into Instantly, Mailchimp, your CRM, LinkedIn,
            email — the tools you already run.
          </p>
        </SubPageBlock>

        <SubPageBlock
          index="04"
          tag="The compounding"
          title="It gets sharper every week"
        >
          <p>
            Bonggy learns what you actually close. Every approved draft, every
            booked meeting, every signal that converted becomes part of the
            scoring model. The agent that ran last Monday is not the agent
            that runs next Monday.
          </p>
          <p>
            You&apos;re not buying another autopilot. You&apos;re buying the
            part the autopilot never had.
          </p>
        </SubPageBlock>
      </div>

      <div className="mt-20 border-t border-border/60 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <h3 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
            See it run on your accounts, live.
          </h3>
          <div className="flex items-start lg:justify-end">
            <CtaButton variant="signal">Book a strategy session</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
