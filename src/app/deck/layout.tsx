import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bonggy · Investor brief",
  description:
    "The command centre for sales teams. Bonggy puts AI on the judgement so reps can stay on the send. Twelve-slide brief — product, vision, team.",
  // Keep the deck out of search indexes — it's a sharable VC asset, not a
  // landing page. The URL still works for anyone you send it to.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Bonggy · Investor brief",
    description:
      "The command centre for sales teams. The thinking part of outbound, automated — your reps stay on the send.",
    type: "website",
  },
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
