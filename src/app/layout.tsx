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
    default: "Bonggy: Your own full-stack AI sales agency",
    template: "%s · Bonggy",
  },
  description:
    "Your own full-stack AI sales agency. It works the way your best people work, tailored to how you sell, ten times faster. It reads the world, finds the signal, and writes the outreach. You stay in control.",
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
    title: "Bonggy: Your own full-stack AI sales agency",
    description:
      "Your own full-stack AI sales agency. It works the way your best people work, tailored to how you sell, ten times faster. You stay in control.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonggy: Your own full-stack AI sales agency",
    description:
      "Your own full-stack AI sales agency. It works the way your best people work, tailored to how you sell, ten times faster. You stay in control.",
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

// Inline pre-paint script: read localStorage theme and apply `.dark` to <html>
// BEFORE first paint so there's no white flash on dark-mode visitors.
// Default = dark. Opt-in light persists across sessions.
const themeInitScript = `
(function(){try{
  var t = localStorage.getItem('bonggy-theme');
  if (t !== 'light') document.documentElement.classList.add('dark');
}catch(e){document.documentElement.classList.add('dark');}})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint theme: must run before body to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
                "A full-stack AI sales agency. It reads the world, finds the signal, drafts the outreach. Tailored to how you sell. You stay in control.",
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
