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
import { INTRO_INIT_SCRIPT, THEME_INIT_SCRIPT } from "@/components/marketing/theme-script";
import { ScrollMotionFallback } from "@/components/marketing/scroll-motion-fallback";
import { MotionGate } from "@/components/marketing/motion-gate";
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
  // No themeColor here: the theme script creates <meta name="theme-color">
  // and keeps it in step with the site toggle. (Rendering it from React made
  // hydration add a second tag once the script had changed its content.)
  width: "device-width",
  initialScale: 1,
  // On-screen keyboard only (not the URL bar): Chromium browsers resize the
  // layout viewport when the keyboard opens, so the composers and forms
  // stay in view. Safari ignores this key.
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
        {/* Hero intro only when first shown at the top (decided before paint). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_INIT_SCRIPT }} />
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
        <a
          href="#main"
          className="fixed left-3 top-3 z-[100] -translate-y-[200%] rounded-full bg-surface-inverse px-4 py-2.5 text-ui font-medium text-fg-inverse opacity-0 focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>
        <NewsBanner />
        {children}
        <ScrollMotionFallback />
        <MotionGate />
      </body>
    </html>
  );
}
