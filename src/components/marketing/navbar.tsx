"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { CtaButton, CAL_LINK } from "./cta-button";
import { hashOf, useScrollSpy } from "./scroll-spy";
import { ThemeSegmented, ThemeToggle } from "./theme-toggle";

type NavLink = { label: string; href: string };

const PRODUCT: NavLink[] = [
  { label: "Bots", href: "/#agents" },
  { label: "Flows", href: "/#flows" },
  { label: "Approvals", href: "/#approvals" },
  { label: "Analytics", href: "/#analytics" },
  { label: "Make it yours", href: "/#make-it-yours" },
  { label: "Groups", href: "/#groups" },
  { label: "Context", href: "/#context" },
];

const LINKS: NavLink[] = [
  { label: "Teams", href: "/#teams" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

// The mobile sheet lists everything in the order it appears on the page.
const MOBILE: NavLink[] = [
  LINKS[0], // Teams
  PRODUCT[1], // Flows
  PRODUCT[0], // Bots
  PRODUCT[4], // Make it yours
  PRODUCT[5], // Groups
  PRODUCT[2], // Approvals
  PRODUCT[3], // Analytics
  PRODUCT[6], // Context
  ...LINKS.slice(1), // How it works, Pricing, FAQ
];

// Hover / focus-visible: ink text on the light surface-2 pill (150ms).
// Active (the section in view): heavier weight and a small dot, no pill, so
// the two never read as the same state.
const LINK_CLASS =
  "relative inline-flex h-9 items-center gap-1 rounded-full px-3 text-ui-sm font-medium text-fg-2 transition-colors duration-150 hover:bg-surface-2 hover:text-foreground focus-visible:bg-surface-2 focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=true]:font-semibold aria-[current=true]:text-foreground after:absolute after:bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-foreground after:opacity-0 after:transition-opacity after:content-[''] aria-[current=true]:after:opacity-100";

const SPY_IDS = [...PRODUCT, ...LINKS].map((l) => hashOf(l.href)).filter((x): x is string => !!x);

export function Navbar() {
  const active = useScrollSpy(SPY_IDS);
  const [scrolled, setScrolled] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const sheet = useSheet(headerRef, toggleRef);
  const menuOpen = sheet.open;

  // "Scrolled" = an 8px sentinel at the very top of the page has left the
  // viewport. An observer, not a scroll listener: no work per scroll event.
  const sentinelRef = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);


  return (
    <>
      <span ref={sentinelRef} aria-hidden className="pointer-events-none absolute left-0 top-0 h-2 w-px" />
      <header
        ref={headerRef}
        // Pure CSS, so it can't lag behind the scroll: sticky, straight after
        // the in-flow announcement banner. It rides up with the banner, then
        // sticks at the top. -mb-16 keeps it out of the flow (the page starts
        // under it, as with a fixed header). The sticky element itself has no
        // background: iOS Safari samples it for the status-bar tint.
        className="sticky inset-x-0 top-0 z-50 -mb-16 h-16"
      >
        {/* The background is a child, swapped instantly (no colour
            transition), so nothing flickers when fast scrolling passes the
            top. Phones: near-opaque, no backdrop blur. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10",
            scrolled || menuOpen ? "bg-background/95 sm:bg-background/85 sm:backdrop-blur-[8px]" : "hidden",
          )}
        />
        <div
          aria-hidden
          className={cn("absolute inset-x-0 bottom-0 h-px bg-border", scrolled && !menuOpen ? "block" : "hidden")}
        />
        <div className="mx-auto flex h-full w-full max-w-wide items-center justify-between gap-4 px-4 lg:px-6">
          <Link href="/" aria-label="Bonggy, home" className="flex min-h-11 items-center gap-2 rounded-full pr-2">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            <ProductMenu active={active} />
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={LINK_CLASS} aria-current={active === hashOf(l.href) ? "true" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <CtaButton href={CAL_LINK} size="sm">
                Book a strategy call
              </CtaButton>
            </div>
            <button
              ref={toggleRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => (menuOpen ? sheet.close("button") : sheet.openSheet())}
              className="flex size-11 items-center justify-center rounded-full bg-surface-2 text-foreground transition-colors hover:bg-surface-3 lg:hidden"
            >
              {menuOpen ? <X className="size-5" aria-hidden /> : <List className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Mounted once and kept (opening is not a mount). Closed means
          display:none: nothing can paint or be sampled for the iOS status-bar
          tint. The links scroll inside the sheet; the theme switch and the CTA
          stay pinned at the bottom, so they are always in view. */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        hidden={sheet.phase === "closed"}
        onClick={(e) => {
          // A tap on the sheet's empty area closes it.
          if (e.target === e.currentTarget) sheet.close("backdrop");
        }}
        onTransitionEnd={sheet.onTransitionEnd}
        style={{ paddingTop: sheet.top }}
        className={cn(
          "sheet-h fixed inset-x-0 top-0 z-40 flex flex-col overflow-hidden bg-background px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden",
          "transition-[translate,opacity] ease-out-expo motion-reduce:transition-none",
          sheet.shown ? "translate-y-0 opacity-100 duration-[250ms]" : "-translate-y-2 opacity-0 duration-[180ms]",
        )}
      >
        <nav aria-label="Mobile" className="-mx-4 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4">
          {MOBILE.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              // Release the scroll lock before Next scrolls to the hash.
              onClick={() => sheet.close("link")}
              className="flex min-h-12 shrink-0 items-center border-b border-border text-title text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="grid shrink-0 gap-3 pt-4">
          <ThemeSegmented />
          <CtaButton href={CAL_LINK} size="lg" className="w-full">
            Book a strategy call
          </CtaButton>
        </div>
      </div>
    </>
  );
}

/** "Product" disclosure: anchors to the product sections on the homepage. */
function ProductMenu({ active }: { active: string | null }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-current={PRODUCT.some((l) => hashOf(l.href) === active) ? "true" : undefined}
        className={cn(LINK_CLASS, open && "text-foreground")}
      >
        Product
        <CaretDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-10 mt-1 grid min-w-44 gap-0.5 rounded-lg bg-surface-raised p-1.5 shadow-e2"
          >
            {PRODUCT.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === hashOf(l.href) ? "true" : undefined}
                  className="flex h-9 items-center rounded-md px-3 text-ui-sm font-medium text-fg-2 transition-colors duration-150 hover:bg-surface-2 hover:text-foreground focus-visible:bg-surface-2 focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-[current=true]:font-semibold aria-[current=true]:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type CloseReason = "button" | "escape" | "link" | "backdrop";

/**
 * The mobile sheet: closed (display:none) → open → closing → closed.
 * - Open: unhide, then apply the open classes on the next frame so the
 *   fade/slide actually transitions.
 * - Close: drop the open classes; hide on transitionend (or a timeout
 *   fallback). Reduced motion hides at once.
 * - Scroll lock on <html> and <body> (overflow: hidden) while open, with the
 *   scroll position restored on unlock if iOS moved it. For link taps the
 *   lock is released synchronously, before Next scrolls to the hash.
 * - Escape closes. After a close by the button or Escape, focus returns to
 *   the toggle; after a link, focus is left alone.
 */
function useSheet(headerRef: React.RefObject<HTMLElement | null>, toggleRef: React.RefObject<HTMLButtonElement | null>) {
  const [phase, setPhase] = React.useState<"closed" | "open" | "closing">("closed");
  const [shown, setShown] = React.useState(false);
  // Where the content starts: just under the header, wherever it sits now.
  const [top, setTop] = React.useState(80);
  const lock = React.useRef<{ y: number; html: string; body: string } | null>(null);
  const fallback = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const unlock = React.useCallback((restore: boolean) => {
    const l = lock.current;
    if (!l) return;
    lock.current = null;
    document.documentElement.style.overflow = l.html;
    document.body.style.overflow = l.body;
    if (restore && window.scrollY !== l.y) window.scrollTo({ top: l.y, behavior: "instant" });
  }, []);

  const finish = React.useCallback(() => {
    clearTimeout(fallback.current);
    setPhase((p) => (p === "closing" ? "closed" : p));
  }, []);

  const openSheet = React.useCallback(() => {
    clearTimeout(fallback.current);
    setTop(Math.round((headerRef.current?.getBoundingClientRect().bottom ?? 64) + 16));
    if (!lock.current) {
      lock.current = { y: window.scrollY, html: document.documentElement.style.overflow, body: document.body.style.overflow };
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    setPhase("open");
    // Next frame: from the hidden pose to the open one, so it transitions.
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, [headerRef]);

  const close = React.useCallback(
    (reason: CloseReason) => {
      unlock(reason !== "link");
      setShown(false);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) setPhase("closed");
      else {
        setPhase("closing");
        const ms = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dur-moderate")) || 420;
        clearTimeout(fallback.current);
        fallback.current = setTimeout(finish, ms + 50);
      }
      if (reason === "button" || reason === "escape") toggleRef.current?.focus();
    },
    [unlock, finish, toggleRef],
  );

  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === e.currentTarget && e.propertyName === "opacity" && !shown) finish();
  };

  const open = phase === "open";
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close("escape");
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Unmount safety: never leave the page locked.
  React.useEffect(() => () => {
    clearTimeout(fallback.current);
    unlock(false);
  }, [unlock]);

  return { phase, shown, open, top, openSheet, close, onTransitionEnd };
}
