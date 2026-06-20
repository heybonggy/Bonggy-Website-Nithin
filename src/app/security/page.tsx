import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import {
  ShieldCheck,
  Lock,
  Eye,
  Users,
  Database,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Bonggy protects your data. Encryption in transit and at rest, scoped read-only permissions, no model training on your account data. Bonggy reads effort — it never sends or acts.",
  robots: { index: true, follow: true },
};

const COMMITMENTS = [
  {
    Icon: Lock,
    title: "Encrypted in transit and at rest",
    body: "TLS 1.3 in transit. AES-256 at rest. Every connection between Bonggy and your CRM, sequencer, email, and the other tools it reads is encrypted end to end.",
  },
  {
    Icon: ShieldCheck,
    title: "Scoped, read-only permissions",
    body: "We request only the permissions needed to read the effort your team already logs. Bonggy doesn't write back, send, or act on your reps' behalf.",
  },
  {
    Icon: Eye,
    title: "No training on your data",
    body: "Your account context, contact lists, and notes do not train any foundation model or get pooled across customers. Anything we tune runs on your tenant.",
  },
  {
    Icon: Users,
    title: "Read-only by design",
    body: "Bonggy reads and aligns effort — it never sends, sequences, or acts. Nothing leaves your domain, because Bonggy isn't the one doing the sending.",
  },
  {
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
      lede="A privacy-conscious VP doing diligence on a vendor that reads their team's data should walk away comfortable. Here's how we earn that."
      narrow
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {COMMITMENTS.map((c) => (
          <div
            key={c.title}
            className="terminal-corners relative rounded-[6px] border border-border/80 bg-card/60 p-7"
          >
            <c.Icon weight="regular" className="size-6 text-signal" />
            <h3 className="mt-4 text-[18px] font-medium tracking-tight text-foreground">
              {c.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-[6px] border border-dashed border-border/70 bg-card/30 p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          Compliance roadmap
        </div>
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
