"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "./_motion";

/**
 * For browsers without CSS scroll-driven animations (`animation-timeline:
 * view()`, e.g. iOS before 26): a one-shot reveal instead of scroll-linked
 * motion on the main thread. Cards below the fold get .reveal-pending and
 * lose it once, just before they come into view (CSS transitions
 * opacity/transform), or at once (.reveal-now) if a fast scroll outran it.
 * Nothing on screen at mount is hidden. Does nothing where CSS handles it,
 * or under reduced motion.
 */
export function ScrollMotionFallback() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  React.useEffect(() => {
    if (reduced || CSS.supports("animation-timeline: view()")) return;
    const pending = [...document.querySelectorAll<HTMLElement>(".reveal")].filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    if (!pending.length) return;
    // Same rule as useReveal: trigger 15% of a viewport early; if a fast
    // scroll outran the observer, show it at once instead of fading in view.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const vh = e.rootBounds ? e.rootBounds.height / 1.15 : window.innerHeight;
          if (e.boundingClientRect.top < vh * 0.85) e.target.classList.add("reveal-now");
          e.target.classList.remove("reveal-pending");
          io.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 15% 0px" },
    );
    pending.forEach((el) => {
      el.classList.add("reveal-pending");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      pending.forEach((el) => el.classList.remove("reveal-pending", "reveal-now"));
    };
  }, [reduced, pathname]);
  return null;
}
