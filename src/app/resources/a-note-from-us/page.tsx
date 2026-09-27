import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = pageMetadata({
  path: "/resources/a-note-from-us",
  title: "A note from us",
  description:
    "A note from the Bonggy team on why GTM is drowning in AI slop, and why the fix is not more sending. It is bots that do the work before the conversation, with people deciding what customers see.",
});

export default function ANoteFromUsPage() {
  return (
    <SubPageShell
      eyebrow="Resources · Note"
      title="A note from us"
      titleAccent="<3"
      lede="On why GTM is drowning in AI slop, and why the fix is not more sending. It is bots that do the work before the conversation, with people deciding what customers see."
      narrow
    >
      <article className="mx-auto w-full max-w-prose">
        <p className="text-body-lg italic text-fg-2">
          The Bonggy team
        </p>

        {/* 1. The pattern, the slop */}
        <section className="mt-10 space-y-5 text-body-lg text-fg-2">
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

        <div aria-hidden className="my-12 border-t border-border sm:my-14" />

        {/* 2. What we are not */}
        <section className="space-y-5 text-body-lg text-fg-2">
          <p>
            We want to be honest about what Bonggy is, because the easy thing
            would have been to build more slop.
          </p>
          <p>
            We don&apos;t build tools that blast outreach. Nothing customer-facing
            a bot drafts goes out without a person approving it. We are not
            trying to add volume to the pile.
          </p>
          <p>
            Bonggy is an agent workspace where sales, RevOps and marketing
            teams build their own bots for the work before the conversation:
            modelling the market, researching the account, drafting the brief. Every piece of that work ties back
            to the goal you are actually trying to hit.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border sm:my-14" />

        {/* 3. The real problem */}
        <section className="space-y-5 text-body-lg text-fg-2">
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

        <div aria-hidden className="my-12 border-t border-border sm:my-14" />

        {/* 4. What we do */}
        <section className="space-y-5 text-body-lg text-fg-2">
          <p>So we built a workspace for it.</p>
          <p>
            Teams build bots from a sentence: a Market Modeller that maps the
            segments, an Account Researcher that digs into accounts and people,
            a Brief Writer that turns it into something a rep can use. Each one
            runs a flow the team designs, and bots hand off work in groups.
          </p>
          <p>
            Every flow runs on one loop. Track the work across your tools,
            align it to a revenue goal, nudge when it drifts, and report one
            picture from rep to CRO. Think of it as the research bench every
            rep wishes they had. Not a chatbot you prompt when you feel like
            it.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border sm:my-14" />

        {/* 5. The human, the line */}
        <section className="space-y-5 text-body-lg text-fg-2">
          <p>
            We do not replace the rep. Bots draft; people decide. Nothing
            customer-facing goes out on its own, and nothing gets sent at volume.
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

        <div aria-hidden className="my-12 border-t border-border sm:my-14" />

        {/* 6. The wedge, who it is for */}
        <section className="space-y-5 text-body-lg text-fg-2">
          <p>
            Most GTM tools take a year to prove their worth, if they ever do.
            Our whole job is proof.
          </p>
          <p>
            We built Bonggy for the rep who has been working hard with no way to
            show that it counted. For the manager coaching on activity instead
            of strategy. For the leader who set a goal and watched it dilute on
            the way down. And for every seat in between, sales and success
            alike, and the RevOps and marketing teams beside them.
          </p>
          <p>
            The effort was always there. Now it gets a bench, and a line to the
            goal.
          </p>
        </section>

        <p className="mt-12 text-body-lg italic text-fg-2 sm:mt-14">
          The Bonggy team
        </p>
      </article>
    </SubPageShell>
  );
}
