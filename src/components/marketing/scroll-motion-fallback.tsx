"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "./_motion";

/**
 * For browsers without CSS scroll-driven animations (`animation-timeline:
 * view()`, e.g. iOS before 26): a one-shot reveal instead of scroll-linked
 * motion on the main thread. Cards below the fold get .reveal-pending and
 * lose it once, as they come into view (CSS transitions opacity/transform).
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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.remove("reveal-pending");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    pending.forEach((el) => {
      el.classList.add("reveal-pending");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      pending.forEach((el) => el.classList.remove("reveal-pending"));
    };
  }, [reduced, pathname]);
  return null;
}
