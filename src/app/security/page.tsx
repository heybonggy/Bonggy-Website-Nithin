import type { Metadata } from "next";
import { ClipboardText, HandPalm, Lock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = pageMetadata({
  path: "/security",
  title: "Security",
  description:
    "How Bonggy handles your data: bots only use the permissions you connect, anything customer-facing needs a person's approval, every run leaves a receipt, and no training on your data.",
  robots: { index: true, follow: true },
});

// TODO(security): none of these claims can be verified from this repo (it's
// the marketing site only). Confirm each with engineering before launch, and
// don't name specific protocols or ciphers until they're confirmed.
const COMMITMENTS = [
  {
    Icon: HandPalm,
    title: "Approval by action",
    body: "Anything customer-facing (emails, posts, sequencer pushes, published content) needs a person. Internal output (a brief in chat, a Slack summary) can run without approval if your team chooses.",
  },
  {
    Icon: ShieldCheck,
    title: "Bots only use the permissions you connect",
    body: "You choose which tools each bot can reach and what it's allowed to do there. Nothing beyond what you connect.",
  },
  {
    // TODO(security): confirm run receipts and the approval log exist as described.
    Icon: ClipboardText,
    title: "Every run leaves a receipt",
    body: "What the bot read, what it did, who approved it, and what it didn't send.",
  },
  {
    // TODO(security): confirm with engineering/legal before stating specifics.
    Icon: Lock,
    title: "Built to protect your data",
    body: "Bonggy is built for read-scoped permissions, encryption in transit and at rest, and no training on your data.",
  },
];

export default function SecurityPage() {
  return (
    <SubPageShell
      eyebrow="Security"
      title="Built for the rep,"
      titleAccent="ready for the VP doing diligence."
      lede="A VP doing diligence on a vendor whose bots work with their team's data should walk away comfortable. Here's how we approach it."
      narrow
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {COMMITMENTS.map((c) => (
          <li key={c.title} className="rounded-3xl bg-surface p-6 sm:p-7">
            <c.Icon className="size-6 text-fg-2" aria-hidden />
            <h2 className="mt-4 text-title font-medium text-foreground">{c.title}</h2>
            <p className="mt-2 text-ui text-fg-2">{c.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-3xl border border-dashed border-border-strong p-6 sm:p-8">
        <h2 className="text-ui font-semibold text-foreground">Compliance</h2>
        {/* TODO(security): update once SOC 2 Type II is attained; keep "not attained" until then. */}
        <p className="mt-2 max-w-copy text-body text-fg-2">
          SOC 2 Type II: on the path, not attained. If your procurement needs documentation ahead of a pilot, email{" "}
          <a href="mailto:founders@bonggy.com" className="text-foreground underline underline-offset-4">
            founders@bonggy.com
          </a>{" "}
          and we&apos;ll share where we are.
        </p>
      </div>
    </SubPageShell>
  );
}
