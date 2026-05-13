import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bonggy — Pipeline, in the second you need it.",
  description:
    "Bonggy is the live pipeline copilot for sales, marketing, and recruiting teams. Turn every signal into pipeline — at the exact second your rep needs it.",
  keywords: [
    "lead generation",
    "sales intelligence",
    "outbound",
    "AI sales copilot",
    "buying signals",
    "ABM",
    "recruiting outbound",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-bonggy-bg text-bonggy-text-primary">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
