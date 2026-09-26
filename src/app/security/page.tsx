import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import {
  ShieldCheck,
  Lock,
  Eye,
  UserCheck,
  ClipboardText,
  Database,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = pageMetadata({
  path: "/security",
  title: "Security",
  description:
    "How Bonggy protects your data: agents only use the permissions you connect, every outbound action needs human approval, there's a full log of what each agent did, and no training on your data.",
  robots: { index: true, follow: true },
});

// TODO(security): none of these claims can be verified from this repo (it's
// the marketing site only). Confirm each with engineering before launch.
const COMMITMENTS = [
  {
    Icon: ShieldCheck,
    title: "Agents only use the permissions you connect",
    body: "You choose which tools each agent can reach and what it's allowed to do there. Nothing beyond what you connect.",
  },
  {
    Icon: UserCheck,
    title: "Every outbound action needs human approval",
    body: "Emails, messages and CRM updates an agent proposes wait for a person on your team. Nothing goes out on its own.",
  },
  {
    // TODO(security): confirm the per-agent audit log exists as described.
    Icon: ClipboardText,
    title: "A full log of what each agent did",
    body: "Every draft, edit, approval and send is recorded against the agent and the person who approved it.",
  },
  {
    // TODO(security): confirm with engineering/legal. Title wording approved.
    Icon: Eye,
    title: "No training on your data",
    body: "Your account context, contact lists and notes don't train any foundation model or get pooled across customers. Anything we tune runs on your tenant.",
  },
  {
    // TODO(security): confirm TLS 1.3 and AES-256.
    Icon: Lock,
    title: "Encrypted in transit and at rest",
    body: "TLS 1.3 in transit. AES-256 at rest. Every connection between Bonggy and the tools you connect is encrypted.",
  },
  {
    // TODO(security): confirm region choice, export and the 30-day grace period.
    Icon: Database,
    title: "Data residency and retention",
    body: "Data lives in your chosen region. You can export everything at any time. If you cancel, we offer a 30-day grace period before deletion. You own your data.",
  },
];

export default function SecurityPage() {
  return (
    <SubPageShell
      eyebrow="Security"
      title="Built for the rep,"
      titleAccent="hardened for the VP doing diligence."
      lede="A privacy-conscious VP doing diligence on a vendor whose agents work with their team's data should walk away comfortable. Here's how we earn that."
      narrow
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {COMMITMENTS.map((c) => (
          <div
            key={c.title}
            className="terminal-corners relative rounded-[6px] border border-border/80 bg-card/60 p-7"
          >
            <c.Icon weight="regular" className="size-6 text-signal" />
            <h2 className="mt-4 text-[18px] font-medium tracking-tight text-foreground">
              {c.title}
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-[6px] border border-dashed border-border/70 bg-card/30 p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
          Compliance roadmap
        </div>
        {/* TODO(security): confirm the SOC 2 Type II timeline. */}
        <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
          SOC 2 Type II is on the path for our first enterprise cohort. If
          your procurement requires it ahead of pilot, email{" "}
          <a
            href="mailto:founders@bonggy.com"
            className="text-foreground underline-offset-4 hover:underline"
          >
            founders@bonggy.com
          </a>{" "}
          and we&apos;ll share the current trust documentation and our
          attestation timeline.
        </p>
      </div>
    </SubPageShell>
  );
}
