"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Mascot } from "@/components/ui/mascot";
import { NEWS_DISMISSED_KEY, news } from "@/content/news";

/**
 * A thin announcement strip above the navbar, linking to the current news
 * item (content/news.ts). Graphite in light, near-white in dark. Fixed
 * heights per breakpoint and a pre-paint dismissal check keep CLS at 0. The
 * navbar follows it as it scrolls away (--banner-scroll).
 */
export function NewsBanner() {
  const pathname = usePathname();
  const hidden = !news.enabled || pathname === news.cta.href;

  // Let the fixed navbar slide up as the banner scrolls away.
  React.useEffect(() => {
    if (hidden) return;
    const root = document.documentElement;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => root.style.setProperty("--banner-scroll", `${Math.min(window.scrollY, 80)}px`));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
      root.style.removeProperty("--banner-scroll");
    };
  }, [hidden]);

  if (hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(NEWS_DISMISSED_KEY, news.id);
    } catch {
      // Private mode: hidden for this page view only.
    }
    document.documentElement.classList.add("news-dismissed");
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="news-banner group relative isolate flex h-14 items-center overflow-hidden bg-surface-inverse text-fg-inverse sm:h-10"
    >
      {/* Bong peeks in from the left edge on hover (desktop, motion allowed). */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-2 hidden -translate-x-[140%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 sm:motion-safe:block"
      >
        <Mascot className="size-7 translate-y-2 text-fg-inverse [&_path]:fill-[var(--foreground-inverse)] [&_rect]:fill-[var(--foreground)]" />
      </span>

      <div className="mx-auto flex w-full min-w-0 max-w-wide items-center justify-center gap-2 pl-3 pr-11 text-[12px] leading-snug sm:gap-3 sm:px-12 sm:text-ui-sm">
        <span aria-hidden className="inline-block shrink-0 animate-bob text-[15px] leading-none">
          {news.emoji}
        </span>
        <span className="line-clamp-2 min-w-0 sm:line-clamp-1">{news.text}</span>
        <Link
          href={news.cta.href}
          className="relative inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 font-medium sm:px-3 ring-1 ring-fg-inverse/40 transition-colors hover:bg-fg-inverse/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-inverse after:absolute after:-inset-2 after:content-['']"
        >
          <span className="sm:hidden" aria-hidden>
            Read
          </span>
          <span className="sr-only sm:not-sr-only">{news.cta.label}</span>
          <span aria-hidden className="hidden sm:inline">→</span>
        </Link>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-fg-inverse/80 transition-colors hover:bg-fg-inverse/10 hover:text-fg-inverse focus-visible:outline-2 focus-visible:outline-fg-inverse after:absolute after:-inset-1 after:content-['']"
      >
        <X className="size-4" weight="bold" aria-hidden />
      </button>
    </div>
  );
}
