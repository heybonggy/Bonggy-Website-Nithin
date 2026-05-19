import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/hooks/useTheme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bonggy - Pipeline, in the second you need it.",
  description:
    "Bonggy is the live pipeline copilot for sales, marketing, and recruiting teams. Turn every signal into pipeline - at the exact second your rep needs it.",
  keywords: [
    "lead generation",
    "sales intelligence",
    "outbound",
    "AI sales copilot",
    "buying signals",
    "ABM",
    "recruiting outbound",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg?v=3", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body className="antialiased bg-bonggy-bg text-bonggy-text-primary">
        <ThemeProvider>
          {children}
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
