import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

const SUBTITLE = "Why we built Bonggy, and the few things we will not do.";

export const metadata: Metadata = pageMetadata({
  path: "/resources/a-note-from-us",
  title: "A note from us",
  description: SUBTITLE,
});

/** The note, verbatim. One string per paragraph. */
const PARAGRAPHS = [
  "Every decade or so, a kind of work gets tooled. The tools multiply, and then something arrives that multiplies them again. What began as one workflow becomes ten products, each promising more output with less of you in it.",
  "Go-to-market is in that moment now. Each quarter brings another AI tool that drafts more, sends more and books more. The pitch is always volume, and the result is predictable. Inboxes fill with messages nobody wrote and nobody would put their name to. Buyers learn to ignore all of it, and the careful message gets ignored along with the rest.",
  "We could have built another one of those tools. We decided not to.",
  "Our starting point is a quieter observation. The problem was never that reps don't work hard enough. A rep moves across eight tools a day, through calls, notes, threads and meetings. The effort is real. It is just scattered across those tools, invisible to the people above, and cut off from the goal it is meant to serve. Adding more automated sending doesn't fix that. It adds noise to work that already lacked a direction.",
  "Bonggy is a workspace where sales, RevOps and marketing teams build their own bots for the work that comes before a conversation: understanding the market, researching the account, preparing the brief. A team describes a bot in a sentence, and it runs a flow the team designs. Sweet Spot maps the segments worth pursuing. Dossier studies the account and the people in it. Draftsmith turns that research into something a rep can use. Bots can hand work to one another, and every flow ties back to the revenue goal the team set.",
  "Underneath it all is one loop. Bonggy tracks the work across your tools, aligns it to the goal, nudges when it drifts, and reports a single picture that reads the same from rep to CRO.",
  "We hold a few lines firmly. A person approves everything customer-facing before it goes out. Nothing is sent at volume. The conversation, the relationship and the judgment stay with the rep, and the bots do the preparation. We measure work against the goal, never reps against each other. There is no leaderboard, and we do not intend to build one.",
  "Most GTM software asks for a year of faith before it shows its worth. We think the work should prove itself as it happens.",
  "We built this for the rep whose effort never showed up anywhere it counted. For the manager who wants to coach strategy instead of activity. For the leader who set a clear goal and watched it blur on the way down. And for the RevOps and marketing teams who make all of it possible.",
  "The effort was always there. Now it has somewhere to go.",
];

export default function ANoteFromUsPage() {
  return (
    <SubPageShell eyebrow="Resources · Note" title="A note from us" lede={SUBTITLE} narrow>
      <article className="mx-auto w-full max-w-prose">
        <div className="space-y-5 text-body-lg text-fg-2">
          {PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <p className="mt-12 text-body-lg italic text-fg-2 sm:mt-14">The Bonggy team</p>
      </article>
    </SubPageShell>
  );
}
