"use client";

import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsent() {
  const { status, accept, decline, mounted } = useCookieConsent();

  if (!mounted || status !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6 pointer-events-none">
      <div
        role="dialog"
        aria-label="Cookie consent"
        className="max-w-[760px] mx-auto bg-bonggy-surface border border-bonggy-border rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)] p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto"
      >
        <div className="flex-1 min-w-0">
          <p className="text-[13px] md:text-[14px] text-bonggy-text-secondary leading-[1.6]">
            We use cookies to understand how visitors interact with our site and improve your experience. By clicking Accept, you agree to our{" "}
            <Link href="/privacy" className="text-bonggy-accent hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2 rounded-md text-[13px] text-bonggy-text-secondary border border-bonggy-border hover:border-bonggy-accent/40 hover:text-bonggy-text-primary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 rounded-md text-[13px] font-medium bg-bonggy-accent text-bonggy-bg hover:bg-bonggy-accent-hover transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
