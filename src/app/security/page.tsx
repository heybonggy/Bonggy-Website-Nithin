import type { Metadata } from "next";
import { ClipboardText, HandPalm, Lock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { EmailLink } from "@/components/marketing/email-link";
import { COMPLIANCE_LINE } from "@/content/site";
import { slug } from "@/lib/slug";
import {
  SECURITY_COMMITMENTS,
  SECURITY_LEDE,
  SECURITY_TITLE,
  SECURITY_TITLE_ACCENT,
} from "@/content/pages/security";

export const metadata: Metadata = pageMetadata({ slug: "security" });

/** The icon each commitment shows, by title. The words live in content. */
const ICONS = [HandPalm, ShieldCheck, ClipboardText, Lock];


export default function SecurityPage() {
  return (
    <>
      <JsonLd graph={graphFor("security")} />

    <SubPageShell
      eyebrow="Security"
      title={SECURITY_TITLE}
      titleAccent={SECURITY_TITLE_ACCENT}
      lede={SECURITY_LEDE}
      narrow
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {SECURITY_COMMITMENTS.map((c, i) => (
          <li key={c.title} id={slug(c.title)} className="scroll-mt-28 rounded-3xl bg-surface p-6 sm:p-7">
            {(() => { const Icon = ICONS[i]; return <Icon className="size-6 text-fg-2" aria-hidden />; })()}
            <h2 className="mt-4 text-title font-medium text-foreground">{c.title}</h2>
            <p className="mt-2 text-ui text-fg-2">{c.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-3xl border border-dashed border-border-strong p-6 sm:p-8">
        <h2 id="compliance" className="text-ui font-semibold text-foreground">Compliance</h2>
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
