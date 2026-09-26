import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = pageMetadata({
  path: "/resources/a-note-from-us",
  title: "A note from us",
  description:
    "A note from the Bonggy team on why GTM is drowning in AI slop, and why the fix is not more sending. It is agents that do the work before the conversation, with people deciding what goes out.",
});

export default function ANoteFromUsPage() {
  return (
    <SubPageShell
      eyebrow="Resources · Note"
      title="A note from us"
      titleAccent="<3"
      lede="On why GTM is drowning in AI slop, and why the fix is not more sending. It is agents that do the work before the conversation, with people deciding what goes out."
      narrow
    >
      <article className="mx-auto w-full max-w-[680px]">
        <p className="text-[16px] italic leading-[1.75] text-muted-foreground sm:text-[17px]">
          The Bonggy team
        </p>

        {/* Section 1 — The pattern, the slop */}
        <section className="mt-10 space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>There is a pattern in software that repeats every decade or so.</p>
          <p>
            A category of work gets tooled. Then the tools multiply. Then AI
            arrives and multiplies them again. What used to be one workflow
            becomes ten products, each promising to do more, faster, with less
            of you in the loop.
          </p>
          <p>
            Right now that is happening to GTM. Every quarter brings another AI
            tool that sends more, drafts more, books more, automates more. The
            pitch is always volume. The result is a flood.
          </p>
          <p>
            We have a word for it. Slop. AI-generated outreach that nobody
            wrote, nobody calibrated, and nobody would stand behind. It is
            everywhere now, and it is quietly making every inbox, every channel,
            and every number worse.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 2 — What we are not */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            We want to be honest about what Bonggy is, because the easy thing
            would have been to build more slop.
          </p>
          <p>
            We are not an AI SDR. We do not blast outreach, and nothing an
            agent drafts goes out without a person approving it. We are not
            trying to add volume to the pile.
          </p>
          <p>
            Bonggy is a studio where your team builds its own agents for the
            work before the conversation: modelling the market, researching
            the account, drafting the brief. Every piece of that work ties back
            to the goal you are actually trying to hit.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 3 — The real problem */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            Here is the thing nobody says out loud. The problem was never that
            reps do not work hard enough.
          </p>
          <p>
            A rep works across eight tools all day. Sends, calls, notes,
            meetings, threads. The effort is enormous. It is just scattered
            across those tools, invisible to the people above them, and
            disconnected from the goal at the top.
          </p>
          <p>
            More AI sending does not fix that. It makes it worse. You get more
            effort pointed in more directions, and still no way to tell which of
            it actually moved the number.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 4 — What we do */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>So we built a studio for it.</p>
          <p>
            Teams build agents and groups of agents: a Market Modeller that
            maps the segments, an Account Researcher that digs into accounts
            and people, a Brief Writer that turns it into something a rep can
            use. They share memory, so what one agent learns the rest can use.
          </p>
          <p>
            Every agent runs on one loop. Track the work across your tools,
            align it to a revenue goal, nudge when it drifts, and report one
            picture from rep to CRO. Think of it as the research bench every
            rep wishes they had. Not a chatbot you prompt when you feel like
            it.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 5 — The human, the line */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            We do not replace the rep. Agents draft; people decide. Nothing
            goes out on its own, and nothing gets sent at volume.
          </p>
          <p>
            The conversation is the rep&apos;s. The relationship is the
            rep&apos;s. The judgment is the rep&apos;s. We are not trying to
            build a machine that sells, and we are not going to flood another
            channel until it dies.
          </p>
          <p>
            We measure work against the goal. We never rank reps against each
            other. No leaderboard, no scoreboard, no new stick for a manager to
            swing. The picture is shared, not weaponized. That is the line and
            we are not moving it.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        {/* Section 6 — The wedge, who it is for */}
        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            Most GTM tools take a year to prove their worth, if they ever do.
            Our whole job is proof.
          </p>
          <p>
            We built Bonggy for the rep who has been working hard with no way to
            show that it counted. For the manager coaching on activity instead
            of strategy. For the leader who set a goal and watched it dilute on
            the way down. And for every seat in between, sales and success
            alike.
          </p>
          <p>
            The effort was always there. Now it gets a bench, and a line to the
            goal.
          </p>
        </section>

        <p className="mt-12 text-[16px] italic leading-[1.75] text-muted-foreground sm:mt-14 sm:text-[17px]">
          The Bonggy team
        </p>
      </article>
    </SubPageShell>
  );
}
