import type { Metadata } from "next";
import { ClipboardText, HandPalm, Lock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { EmailLink } from "@/components/marketing/email-link";
import { COMPLIANCE_LINE, SECURITY_LINE } from "@/content/site";

export const metadata: Metadata = pageMetadata({ slug: "security" });

// TODO(security): none of these claims can be verified from this repo (it's
// the marketing site only). Confirm each with engineering before launch, and
// don't name specific protocols or ciphers until they're confirmed.
const COMMITMENTS = [
  {
    Icon: HandPalm,
    title: "Approval by action",
    body: "Nothing customer-facing (emails, posts, sequencer pushes, published content) goes out without a person approving it. Internal output (a brief in chat, a Slack summary) can run without approval if your team chooses.",
  },
  {
    Icon: ShieldCheck,
    title: "Bots only use the permissions you connect",
    body: "You choose which tools each bot can reach. Bots are built to be read-only by default and write back only where a flow your team sets up allows it. Nothing beyond what you connect.",
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
    body: `${SECURITY_LINE} We don't use it to train AI models, and you can ask us to delete your data at any time.`,
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd graph={graphFor("security")} />

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
          {COMPLIANCE_LINE} If your procurement needs documentation ahead of a pilot, email{" "}
          <EmailLink />{" "}
          and we&apos;ll share where we are.
        </p>
      </div>
    </SubPageShell>
    </>
  );
}
