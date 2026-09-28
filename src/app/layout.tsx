import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  HOME_TITLE,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SHORT,
  LOGO_URL,
} from "@/lib/metadata";
import { THEME_INIT_SCRIPT } from "@/components/marketing/theme-script";
import { ScrollMotionFallback } from "@/components/marketing/scroll-motion-fallback";
import { NewsBanner } from "@/components/news-banner";
import { NEWS_INIT_SCRIPT } from "@/content/news";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s · Bonggy",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "agent workspace for GTM teams",
    "sales bots",
    "RevOps bots",
    "marketing bots",
    "GTM workflows",
    "account research",
    "human-in-the-loop AI",
    "revenue alignment",
    "RevOps",
  ],
  authors: [{ name: "Bonggy" }],
  creator: "Bonggy",
  publisher: "Bonggy",
  applicationName: "Bonggy",
  category: "Sales technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bonggy",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION_SHORT,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION_SHORT,
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
  //   src/app/apple-icon.tsx      → /apple-icon (iOS home-screen PNG)
  //   src/app/opengraph-image.tsx → /opengraph-image (link previews)
  //   src/app/manifest.ts         → /manifest.webmanifest
  // No explicit `icons` field needed.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1b" },
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme first, before any stylesheet, so there's no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Hide a dismissed announcement before first paint (no layout shift). */}
        <script dangerouslySetInnerHTML={{ __html: NEWS_INIT_SCRIPT }} />
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
              description: SITE_DESCRIPTION,
              url: SITE_URL,
              // No `offers` until pricing is public (it previously claimed a
              // free, in-stock product).
              image: LOGO_URL,
              creator: {
                "@type": "Organization",
                name: "Bonggy",
                url: SITE_URL,
                logo: LOGO_URL,
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <NewsBanner />
        {children}
        <ScrollMotionFallback />
      </body>
    </html>
  );
}
