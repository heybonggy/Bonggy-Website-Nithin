import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollShell } from "@/components/marketing/scroll-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bonggy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bonggy: align every rep's effort to revenue",
    template: "%s · Bonggy",
  },
  description:
    "Bonggy is the orchestration layer between rep effort and company goals. It tracks what every rep does across every tool, aligns it to the goal, nudges the drift, and proves what's working.",
  keywords: [
    "outbound sales",
    "SDR",
    "AI SDR alternative",
    "sales signals",
    "intent data",
    "Apollo alternative",
    "Clay alternative",
    "B2B prospecting",
    "account intelligence",
    "sales automation",
    "command centre for sales",
  ],
  authors: [{ name: "Bonggy" }],
  creator: "Bonggy",
  publisher: "Bonggy",
  applicationName: "Bonggy",
  category: "Sales technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bonggy",
    title: "Bonggy: align every rep's effort to revenue",
    description:
      "The orchestration layer between rep effort and company goals. Tracks every rep's effort across every tool, aligns it to the goal, and proves what's working.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonggy: align every rep's effort to revenue",
    description:
      "The orchestration layer between rep effort and company goals. Tracks every rep's effort across every tool, aligns it to the goal, and proves what's working.",
    creator: "@bonggy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons + manifest are auto-detected by Next.js from:
  //   src/app/icon.svg            → favicon (browser tabs)
  //   src/app/apple-icon.svg      → iOS home-screen icon
  //   src/app/opengraph-image.tsx → /opengraph-image (link previews)
  //   src/app/manifest.ts         → /manifest.webmanifest
  // No explicit `icons` field needed.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
  ],
  width: "device-width",
  initialScale: 1,
  // Tell mobile browsers to resize the LAYOUT viewport when the URL bar
  // appears/disappears, instead of leaving the layout untouched and only
  // shifting the visual viewport. With the default ("resizes-visual") the
  // browser performs an internal scrollY adjustment when the URL bar shows
  // back at the page bottom — which manifests as the page jerking down once.
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Organization structured data , readable for AI agents + search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Bonggy",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "The orchestration layer between rep effort and company goals. Tracks every rep's effort across every tool, aligns it to the goal, nudges the drift, and proves what's working.",
              url: SITE_URL,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              creator: {
                "@type": "Organization",
                name: "Bonggy",
                url: SITE_URL,
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <div aria-hidden className="grain-layer" />
        <ScrollShell>
          {children}
        </ScrollShell>
      </body>
    </html>
  );
}
