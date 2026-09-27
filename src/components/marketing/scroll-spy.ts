"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * The homepage section currently in the middle band of the viewport
 * (rootMargin "-45% 0px -50% 0px"), for highlighting nav links. Returns null
 * off the homepage or when no tracked section is in that band.
 */
export function useScrollSpy(ids: string[]): string | null {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);
  const key = ids.join(",");

  React.useEffect(() => {
    if (pathname !== "/") return;
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        // The first tracked section (in page order) inside the band wins.
        const hit = els.find((el) => visible.get(el.id));
        setActive(hit ? hit.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, key]);

  return pathname === "/" ? active : null;
}

/** "/#flows" → "flows". */
export const hashOf = (href: string) => (href.includes("#") ? href.split("#")[1] : null);
