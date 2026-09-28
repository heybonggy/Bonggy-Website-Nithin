"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { CtaButton, CAL_LINK } from "./cta-button";
import { SPRING } from "./_motion";
import { hashOf, useScrollSpy } from "./scroll-spy";
import { ThemeSegmented, ThemeToggle } from "./theme-toggle";

type NavLink = { label: string; href: string };

const PRODUCT: NavLink[] = [
  { label: "Bots", href: "/#top" },
  { label: "Flows", href: "/#flows" },
  { label: "Approvals", href: "/#approvals" },
  { label: "Analytics", href: "/#analytics" },
  { label: "Make it yours", href: "/#make-it-yours" },
];

const LINKS: NavLink[] = [
  { label: "Teams", href: "/#teams" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

// Links go from fg-2 to full ink on hover / focus-visible (150ms) with the
// surface-2 pill; the section in view (scrollspy) gets the same treatment.
const LINK_CLASS =
  "inline-flex h-9 items-center gap-1 rounded-full px-3 text-ui-sm font-medium text-fg-2 transition-colors duration-150 hover:bg-surface-2 hover:text-foreground focus-visible:bg-surface-2 focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=true]:bg-surface-2 aria-[current=true]:text-foreground";

const SPY_IDS = [...PRODUCT, ...LINKS].map((l) => hashOf(l.href)).filter((x): x is string => !!x);

export function Navbar() {
  const active = useScrollSpy(SPY_IDS);
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile sheet is open; Escape closes it.
  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);


  return (
    <>
      <header
        className={cn(
          // Sits under the announcement banner until it scrolls away (--nav-top).
          // A transform, not `top`, so following the scroll never counts as a
          // layout shift.
          "fixed inset-x-0 top-0 z-50 h-16 translate-y-[var(--nav-top)] transition-[background-color,backdrop-filter] duration-[var(--dur-quick)]",
          scrolled || menuOpen ? "bg-background/85 backdrop-blur-[12px]" : "bg-transparent",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px bg-border transition-opacity duration-[var(--dur-quick)]",
            scrolled && !menuOpen ? "opacity-100" : "opacity-0",
          )}
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
                Strategy call
              </CtaButton>
            </div>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-full bg-surface-2 text-foreground transition-colors hover:bg-surface-3 lg:hidden"
            >
              {menuOpen ? <X className="size-5" aria-hidden /> : <List className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="sheet"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={SPRING.layout}
            className="fixed inset-x-0 top-0 z-40 flex h-[100svh] flex-col bg-background px-4 pb-8 pt-[calc(5rem+var(--nav-top))] lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[...PRODUCT, ...LINKS].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center border-b border-border text-title text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto grid gap-3">
              <ThemeSegmented className="mb-2" />
              <CtaButton href={CAL_LINK} size="lg" className="w-full">
                Book a strategy call
              </CtaButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
                  className="flex h-9 items-center rounded-md px-3 text-ui-sm font-medium text-fg-2 transition-colors duration-150 hover:bg-surface-2 hover:text-foreground focus-visible:bg-surface-2 focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-[current=true]:bg-surface-2 aria-[current=true]:text-foreground"
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
