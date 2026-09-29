import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { pageMetadata } from "@/lib/metadata";

// A 404 has no canonical of its own, so pageMetadata leaves one out; the
// noindex is this page's only override.
export const metadata: Metadata = {
  ...pageMetadata({ slug: "not-found" }),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SubPageShell
      eyebrow="404 · Not found"
      title="This page drifted."
      titleAccent="Let's point you back."
      lede="The link may be old or mistyped. Everything Bonggy does starts from the homepage."
      narrow
    >
      <CtaButton href="/" size="lg">
        Back to home
      </CtaButton>
    </SubPageShell>
  );
}
