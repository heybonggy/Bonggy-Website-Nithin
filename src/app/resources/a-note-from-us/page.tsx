import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = {
  title: "A note from us",
  description:
    "A note from the Bonggy team on the difference between building a tool and running the work — and why we think outbound sales is the next category where service replaces software.",
};

export default function ANoteFromUsPage() {
  return (
    <SubPageShell
      eyebrow="Resources · Note"
      title="A note from us"
      titleAccent="<3"
      lede="On the difference between building a tool and running the work — and why we think outbound sales is the next category where service replaces software."
      narrow
    >
      <article className="mx-auto w-full max-w-[680px]">
        <p className="text-[16px] italic leading-[1.75] text-muted-foreground sm:text-[17px]">
          The Bonggy team
        </p>

        {/* Section 1 — The pattern */}
        <section className="mt-10 space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>There is a pattern in software that repeats every decade or so.</p>
          <p>
            A category of work gets tooled. Someone builds software to help
            with it. The software spreads. Then someone else comes along and
            says: what if instead of giving you the tool, we just do the work?
          </p>
          <p>
            That is how Salesforce became a data entry platform that consulting
            firms operate for you. That is how every content scheduling tool
            eventually spawned agencies that run it. That is how every category
            of productivity software eventually produces a class of companies
            that wrap it in a service, because the software alone was never
            really the point.
          </p>
          <p>The point was always the outcome.</p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 2 — Service not tool */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            We want to be honest about what kind of company Bonggy is, because
            we think it is worth saying plainly.
          </p>
          <p>
            We are not building software that helps sales teams do research
            and write messages. We are building the research and the messages.
            The difference sounds small. It is not.
          </p>
          <p>
            A tool sits on your desk and waits for you to use it well. A
            service runs whether you open it or not. A tool requires training,
            adoption, configuration, and ongoing attention to stay useful. A
            service requires a conversation about what you need, and then it
            runs.
          </p>
          <p>
            Bonggy runs. When you close your laptop, the agents are reading.
            When you are on a call, the signals are being ranked. When you
            walk in on a Monday morning, the accounts that fired over the
            weekend are already queued, already researched, already drafted.
          </p>
          <p>
            That is what we mean when we say agents. Not a chatbot you prompt
            when you feel like it. A continuous layer that is doing the work
            your team cannot do, at the hours your team is not there, across
            the sources no human could monitor alone.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 3 — What's left for the rep */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>The question people ask us is: what is left for the rep?</p>
          <p>Everything that matters.</p>
          <p>
            The conversation is still the rep&apos;s. The relationship is
            still the rep&apos;s. The judgment about when to push and when to
            hold back, when a deal is real and when a prospect is just being
            polite, that is still the rep&apos;s. We are not trying to build a
            machine that sells. We do not think a machine can sell. Selling is
            the part that requires being a person in the room.
          </p>
          <p>
            What we are taking off the rep&apos;s plate is the part that
            should never have been on it in the first place.
          </p>
          <p>
            Reading fourteen sources every morning. Monitoring every account
            for signals. Remembering what a contact said on a podcast six
            months ago. Drafting seven versions of a message to find one that
            is actually calibrated to this specific person at this specific
            moment. That work is important. It is also the work that was
            quietly destroying the rep&apos;s time and attention without
            anyone naming it as the problem.
          </p>
          <p>
            The rep should be spending their day in conversations. Not in
            tabs.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 4 — Why this company exists now */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            The old version of this company did not exist because it could
            not.
          </p>
          <p>
            Hiring a research analyst for every rep was not viable at scale.
            Having someone monitor Reddit and G2 and conference attendee lists
            and job postings across two hundred accounts, every day, for a
            hundred reps, was not a business model. It was a daydream.
          </p>
          <p>
            AI changed the economics of that completely. The cost of reading
            fourteen sources, synthesizing what matters, and producing a
            calibrated first draft dropped by a factor that makes a genuine
            service commitment economically real for the first time. Not
            cheaper software. An entirely different category of company.
          </p>
          <p>
            We are building that company. Not a tool that makes research
            slightly faster. A preparation service for outbound sales that
            runs continuously, that happens to be priced like software because
            the unit economics now allow it.
          </p>
          <p>
            We think this is a new category. Not better CRM. Not smarter
            sequencing. Not another enrichment database. A service layer that
            owns the preparation problem entirely, so the rep shows up to
            every conversation ready, every signal already surfaced, every
            draft already written and waiting for a human decision.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 5 — Where this could go wrong */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>There is a version of this that goes wrong.</p>
          <p>
            The version that goes wrong is the one that removes the human
            from the loop entirely. The automated outbound platform that
            sends unsupervised messages, books meetings while the rep sleeps,
            and optimises for volume rather than quality. We have been
            watching those products gain traction and we think they are going
            to be responsible for a meaningful collapse in cold outreach
            response rates over the next two to three years. Because they are
            flooding channels with messages that nobody approved, nobody
            calibrated, and nobody would stand behind.
          </p>
          <p>
            We are not building that. The human approves the send. Always.
            The agent prepares. The human decides. That is the line and we
            are not moving it.
          </p>
          <p>
            The reason we are confident about this is not principle alone. It
            is practical. The thing that makes cold outreach work at all is
            that the recipient believes a real person thought about them
            specifically. The moment that belief disappears, the channel
            dies. We have a strong interest in not killing the channel.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 6 — Direct to the rep */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            If you are a rep reading this: we built it for you. Not for your
            VP, not for your ops team. For you. The person who has been doing
            the reading yourself at 7am because nobody else was going to.
          </p>
        </section>

        <p className="mt-12 text-[16px] italic leading-[1.75] text-muted-foreground sm:mt-14 sm:text-[17px]">
          The Bonggy team
        </p>
      </article>
    </SubPageShell>
  );
}
