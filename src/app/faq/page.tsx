import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageCta, SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { EmailLink } from "@/components/marketing/email-link";
import { FaqList } from "@/components/marketing/faq-list";
import { FAQ_QUESTIONS } from "@/content/pages/faq";

export const metadata: Metadata = pageMetadata({ slug: "faq" });

// The ten homepage answers are reused word for word so the two stay
// consistent, with the longer questions after them.

export default function FaqPage() {
  return (
    <>
      <JsonLd graph={graphFor("faq", { faq: FAQ_QUESTIONS })} />
      <SubPageShell
        eyebrow="FAQ"
        title="The questions"
        titleAccent="every VP asks before booking."
        lede={
          <>
            Straight answers on what Bonggy&apos;s bots do, what they don&apos;t, and how to get started. If your
            question isn&apos;t here, email <EmailLink /> and we&apos;ll add it.
          </>
        }
        narrow
      >
        <FaqList items={FAQ_QUESTIONS} headingLevel={2} />

        <SubPageCta title="Got a different question?">
          <CtaButton size="lg">Book a strategy call</CtaButton>
        </SubPageCta>
      </SubPageShell>
    </>
  );
}
