import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, HOME_TITLE, SITE_DESCRIPTION } from "@/lib/metadata";
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
    description: SITE_DESCRIPTION,
  },
  twitter: {
    // No `creator`: no X handle is confirmed yet (src/content/site.ts).
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
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
  /**
   * Icons are declared, not file-convention-detected, so their URLs are stable
   * and have no build hash on them: a favicon Google has cached under one URL
   * should stay at that URL (DESIGN.md §7.1).
   *
   * Order matters. A browser takes the last format it understands, so the ICO
   * comes first for the ones that only read ICO, then the adaptive SVG, then
   * the PNGs for everything else.
   */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  // No themeColor here: the theme script creates <meta name="theme-color">
  // and keeps it in step with the site toggle. (Rendering it from React made
  // hydration add a second tag once the script had changed its content.)
  width: "device-width",
  initialScale: 1,
  // No interactiveWidget: it only concerns the on-screen keyboard (not the
  // URL bar), Safari ignores it and logs a console error for it, and the
  // default keyboard behaviour suits our forms.
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
