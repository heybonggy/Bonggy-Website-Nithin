import type { Metadata } from "next";
import {
  SubPageShell,
  SubPageBlock,
} from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";

export const metadata: Metadata = {
  title: "The fix",
  description:
    "Your best rep's instinct, given to every SDR. Bonggy watches, clusters, scores, and drafts , the rep reviews and sends. The hard-won judgment is already in the box.",
};

export default function FixPage() {
  return (
    <SubPageShell
      eyebrow="The fix"
      title="Your best rep's instinct,"
      titleAccent="given to every SDR."
      lede="Bonggy watches your accounts, catches the moments that open a buying window, scores them against what you actually close, and drafts the outreach grounded in what changed. The rep doesn't research and doesn't guess the angle , they review a signal-backed draft and send. The hard-won judgment is already in the box."
      narrow
    >
      <div className="divide-y divide-border/60">
        <SubPageBlock index="01" tag="Continuous" title="Watch">
          <p>
            Job changes, funding rounds, stack moves, earnings prints, RFPs,
            org changes. Across 14 sources, continuously, with no rep tab
            open. The research a rep never has time for is now table stakes.
          </p>
        </SubPageBlock>

        <SubPageBlock index="02" tag="Per account" title="Cluster & score">
          <p>
            Several events at one company become one account narrative. Then
            we rank that narrative against what you actually close. The
            prioritization a junior rep gets wrong , done in the background.
          </p>
        </SubPageBlock>

        <SubPageBlock index="03" tag="Per buyer" title="Draft">
          <p>
            A signal-backed message per buyer, in a tone that fits. The angle
            your best rep would have found, written for the rep who
            wouldn&apos;t have found it.
          </p>
        </SubPageBlock>

        <SubPageBlock index="04" tag="Human send" title="Review & send">
          <p>
            Every draft queued for approval, then pushed to the platforms you
            already run , Instantly, Mailchimp, your CRM, LinkedIn, email.
            The rep stays in control. The thinking is just done.
          </p>
        </SubPageBlock>
      </div>

      <div className="mt-16 max-w-3xl">
        <div className="border-l-2 border-signal/70 pl-6">
          <p className="text-balance text-[20px] font-medium leading-snug tracking-tight sm:text-[24px]">
            We&apos;re not an AI SDR and we&apos;re not a sequencer.{" "}
            <span className="text-muted-foreground">
              We don&apos;t replace your reps , we make the average one work
              like the one you wish you could clone.
            </span>
          </p>
        </div>
      </div>

      <div className="mt-20 border-t border-border/60 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <h3 className="text-display text-balance text-[28px] font-normal leading-tight tracking-tight sm:text-[36px]">
            See what the fix looks like on your accounts.
          </h3>
          <div className="flex items-start lg:justify-end">
            <CtaButton variant="signal">Strategize</CtaButton>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
