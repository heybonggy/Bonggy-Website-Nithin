import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Bonggy — The command centre for outbound",
    template: "%s · Bonggy",
  },
  description:
    "Run your whole outbound motion from one place. Installable agents that watch your accounts, score signals against closed-won, draft outreach grounded in what actually changed, and hand it to your reps. Your best rep's instinct, given to every SDR.",
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
    title: "Bonggy — The command centre for outbound",
    description:
      "Installable agents that find the signal, score the account, and draft the outreach. Your best rep's instinct, given to every SDR.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bonggy — the command centre for outbound",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonggy — The command centre for outbound",
    description:
      "Installable agents that find the signal, score the account, and draft the outreach.",
    images: ["/og.png"],
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0c" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Organization structured data — readable for AI agents + search */}
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
                "The command centre for outbound. Installable agents that find the signal, score the account, and draft the outreach.",
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
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <div aria-hidden className="grain-layer" />
        {children}
      </body>
    </html>
  );
}
