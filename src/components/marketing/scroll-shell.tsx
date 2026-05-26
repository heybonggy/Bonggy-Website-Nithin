"use client";

import * as React from "react";

/**
 * ScrollShell — fixed-body, inner-scroll-container pattern.
 *
 * Why this exists:
 *   On mobile, when the document scrolls, the browser auto-hides/shows the URL
 *   bar and silently patches scrollY at the page-bottom boundary. That patch
 *   is what manifests as the "page jerks down once on scroll-up from footer".
 *   By making the document itself non-scrollable (html/body overflow:hidden,
 *   fixed at 100svh) and scrolling in a child div, the browser sees the page
 *   as non-scrollable — URL bar transitions become inert, no scrollY patch
 *   gets applied, and the user's scroll input is always linear.
 *
 * Trade-offs to be aware of:
 *   - Native `window.scrollY` / `scroll` events are useless inside the shell.
 *     Use `useScrollShell()` to get the container ref and pass it to motion's
 *     `useScroll({ container })`, or attach scroll listeners to the ref.
 *   - Scroll restoration on back/forward navigation may reset to top instead
 *     of the previous position. Acceptable for a marketing site.
 *   - Pull-to-refresh is disabled (the document isn't scrollable).
 */
const ScrollShellContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);

/**
 * Returns the shell ref ONLY when the shell is acting as the scroll container
 * (mobile, <768px). On desktop the page uses native document scroll, so
 * consumers should fall through to `window` — we return null to signal that.
 */
export function useScrollShell() {
  const ref = React.useContext(ScrollShellContext);
  const [isShellActive, setIsShellActive] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsShellActive(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isShellActive ? ref : null;
}

export function ScrollShell({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <ScrollShellContext.Provider value={ref}>
      <div ref={ref} className="bonggy-scroll-shell">
        {children}
      </div>
    </ScrollShellContext.Provider>
  );
}
