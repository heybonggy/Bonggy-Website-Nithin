import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { CtaButton } from "@/components/marketing/cta-button";
import { pageMetadata } from "@/lib/metadata";

/**
 * A 404 has no canonical of its own, so pageMetadata leaves one out.
 *
 * `robots: null` drops the tag this page would otherwise inherit from the
 * layout. Next emits its own <meta name="robots" content="noindex"> for
 * not-found and that one can't be turned off, so anything here is a second,
 * contradicting tag: the layout's default rendered "index, follow" next to
 * Next's "noindex". One tag, saying noindex, is the whole intent — a robots
 * value with no "nofollow" already means follow.
 */
export const metadata: Metadata = { ...pageMetadata({ slug: "not-found" }), robots: null };

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
