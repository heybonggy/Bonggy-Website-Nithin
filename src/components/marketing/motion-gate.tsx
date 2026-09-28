"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

const REGIONS = "main > section, main section[id], footer, header, .news-banner";

/**
 * Pauses CSS animations that can't be seen. One IntersectionObserver marks
 * each page region (sections, header, footer, banner) with data-offscreen
 * while it's out of view, and <html class="page-hidden"> while the tab is
 * hidden; globals.css pauses every animation inside them. No per-frame work.
 */
export function MotionGate() {
  const pathname = usePathname();

  React.useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(REGIONS)];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.removeAttribute("data-offscreen");
          else e.target.setAttribute("data-offscreen", "");
        }
      },
      // A little margin, so loops are already running as a region scrolls in.
      { rootMargin: "100px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, [pathname]);

  React.useEffect(() => {
    const root = document.documentElement;
    const on = () => root.classList.toggle("page-hidden", document.visibilityState === "hidden");
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  return null;
}
