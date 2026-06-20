"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "motion/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { BonggyMark } from "./bonggy-mark";
import { CtaButton } from "./cta-button";
import { EarlyAccessModal } from "./early-access-modal";
import { useScrollShell } from "./scroll-shell";

/* ─────────────────────────── Config ───────────────────────────
   Edit nav items here. `anchor` links smooth-scroll on the home page;
   `route` links navigate. Dropdowns hold a label + items array.        */

type DropdownItem = {
  label: string;
  href: string;
  /** Mono uppercase category chip shown on the card (e.g. "Essay"). */
  tag?: string;
  /** Small accent badge, e.g. "New". */
  badge?: string;
  /** One-line description under the title. */
  desc?: string;
};

type NavItem =
  | { type: "anchor"; label: string; id: string }
  | { type: "route"; label: string; href: string }
  | {
      type: "dropdown";
      label: string;
      /** "cards" = factory-style rich card menu; "list" = simple list. */
      variant?: "list" | "cards";
      viewAllHref?: string;
      items: DropdownItem[];
    };

const NAV_ITEMS: NavItem[] = [
  { type: "anchor", label: "What we do", id: "what-we-do" },
  { type: "anchor", label: "How it works", id: "how-it-works" },
  {
    type: "dropdown",
    label: "Resources",
    variant: "cards",
    viewAllHref: "/resources",
    items: [
      {
        label: "A note from us",
        href: "/resources/a-note-from-us",
        tag: "Essay",
        badge: "New",
        desc: "Why GTM is drowning in AI slop — and why the fix is connecting effort to revenue.",
      },
      {
        label: "Questions, answered",
        href: "/faq",
        tag: "FAQ",
        desc: "How Bonggy reads effort across your tools and proves what's actually working.",
      },
    ],
  },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const HEADER_OFFSET = 76; // px, so smooth-scrolled sections clear the fixed bar

/* ───────────────────────── animated wordmark ───────────────────── */

const LOGO_LETTERS = ["B", "o", "n", "g", "g", "y"];

/** Logo with the original hover personality: the planet mark tilts and the
 *  wordmark letters re-stagger in on every hover. */
function LogoLink() {
  const [hovered, setHovered] = React.useState(false);
  const [hoverKey, setHoverKey] = React.useState(0);

  return (
    <Link
      href="/"
      aria-label="Bonggy, home"
      onMouseEnter={() => {
        setHovered(true);
        setHoverKey((k) => k + 1);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group/logo flex items-center gap-2.5 rounded-md py-1 pr-1",
        FOCUS_RING,
      )}
    >
      <BonggyMark className="size-6 transition-transform duration-500 ease-out group-hover/logo:rotate-[10deg]" />
      <span
        key={hoverKey}
        aria-label="Bonggy"
        className="flex font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-foreground"
      >
        {LOGO_LETTERS.map((char, i) => (
          <motion.span
            key={i}
            initial={hovered ? { opacity: 0.15, y: 2 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}

/* ─────────────────────── smooth-scroll helper ─────────────────── */

function smoothScrollToId(
  id: string,
  shell: React.RefObject<HTMLElement | null> | null,
) {
  const el = document.getElementById(id);
  if (!el) return;
  if (shell?.current) {
    const top =
      el.getBoundingClientRect().top -
      shell.current.getBoundingClientRect().top +
      shell.current.scrollTop -
      HEADER_OFFSET;
    shell.current.scrollTo({ top, behavior: "smooth" });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
}

/* ───────────────────────────── Navbar ─────────────────────────── */

export function Navbar() {
  const pathname = usePathname();
  const shellRef = useScrollShell();
  const { scrollY } = useScroll(
    shellRef ? { container: shellRef as React.RefObject<HTMLElement> } : undefined,
  );
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [eaOpen, setEaOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Lock the scroll-shell while the mobile menu is open (this site scrolls an
  // inner container, not the body).
  React.useEffect(() => {
    const shell = shellRef?.current;
    if (!shell) return;
    if (mobileOpen) shell.style.overflow = "hidden";
    else if (!eaOpen) shell.style.overflow = "";
    return () => {
      if (shell) shell.style.overflow = "";
    };
  }, [mobileOpen, eaOpen, shellRef]);

  const openEarlyAccess = React.useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => setEaOpen(true));
  }, []);

  const handleAnchor = React.useCallback(
    (id: string) => (e: React.MouseEvent) => {
      if (pathname === "/") {
        e.preventDefault();
        smoothScrollToId(id, shellRef);
      }
      // off the home page → let the <Link href="/#id"> navigate normally
    },
    [pathname, shellRef],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200",
          scrolled || mobileOpen
            ? "border-b border-border/60 bg-background/75 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="relative mx-auto flex h-15 w-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* LEFT: wordmark */}
          <LogoLink />

          {/* RIGHT: nav links + early access (desktop) / hamburger (mobile) */}
          <div className="flex items-center gap-2 md:gap-5">
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary"
            >
              {NAV_ITEMS.map((item) =>
                item.type === "dropdown" ? (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    items={item.items}
                    variant={item.variant}
                    viewAllHref={item.viewAllHref}
                  />
                ) : item.type === "anchor" ? (
                  <Link
                    key={item.label}
                    href={`/#${item.id}`}
                    onClick={handleAnchor(item.id)}
                    className={cn(
                      "rounded-md px-3 py-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-150 hover:text-foreground",
                      FOCUS_RING,
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-150 hover:text-foreground",
                      FOCUS_RING,
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <button
              type="button"
              onClick={openEarlyAccess}
              className={cn(
                "hidden h-9 items-center rounded-md border border-border/70 px-4 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground transition-colors duration-150 hover:bg-card/60 md:inline-flex",
                FOCUS_RING,
              )}
            >
              Early access
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "flex size-9 items-center justify-center rounded-md border border-border/60 bg-card/40 text-foreground md:hidden",
                FOCUS_RING,
              )}
            >
              <Hamburger open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            onClose={() => setMobileOpen(false)}
            onOpenEarlyAccess={openEarlyAccess}
            onAnchor={(id) => {
              setMobileOpen(false);
              // wait for the panel to start closing, then scroll
              setTimeout(() => smoothScrollToId(id, shellRef), 80);
            }}
            isHome={pathname === "/"}
          />
        )}
      </AnimatePresence>

      <EarlyAccessModal open={eaOpen} onOpenChange={setEaOpen} />
    </>
  );
}

/* ─────────────────────────── NavDropdown ─────────────────────────
   Opens on hover AND click. Full keyboard support + ARIA menu semantics.   */

function NavDropdown({
  label,
  items,
  variant = "list",
  viewAllHref,
}: {
  label: string;
  items: DropdownItem[];
  variant?: "list" | "cards";
  viewAllHref?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = React.useId();

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = (focusFirst = false) => {
    clearClose();
    setOpen(true);
    if (focusFirst) {
      requestAnimationFrame(() => itemRefs.current[0]?.focus());
    }
  };

  const closeMenu = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Hover intent: small delay on leave so moving cursor into the panel
  // doesn't snap it shut.
  const onLeave = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Click-outside + Escape (global, only while open)
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu(true);
    } else if (e.key === "Escape") {
      closeMenu();
    }
  };

  const onItemKeyDown = (i: number) => (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      itemRefs.current[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      itemRefs.current[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
    } else if (e.key === "Tab") {
      setOpen(false); // let focus leave naturally
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => openMenu(false)}
      onMouseLeave={onLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu() : openMenu(false))}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 font-mono text-[11.5px] uppercase tracking-[0.1em] transition-colors duration-150",
          open ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          FOCUS_RING,
        )}
      >
        {label}
        <CaretDown
          weight="bold"
          className={cn(
            "size-2.5 opacity-55 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open &&
          (variant === "cards" ? (
            <motion.div
              id={menuId}
              role="menu"
              aria-label={label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-full mt-3 w-[min(600px,calc(100vw-2.5rem))] rounded-[14px] border border-border/70 bg-popover/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            >
              {/* Header row — label + view-all, like factory's NEWS menu */}
              <div className="mb-2.5 flex items-center justify-between px-2 pt-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                  {label}
                </span>
                {viewAllHref ? (
                  <Link
                    href={viewAllHref}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground",
                      FOCUS_RING,
                    )}
                  >
                    View all <span aria-hidden>↗</span>
                  </Link>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {items.map((it, i) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    ref={(node) => {
                      itemRefs.current[i] = node;
                    }}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => setOpen(false)}
                    onKeyDown={onItemKeyDown(i)}
                    className={cn(
                      "group/card flex flex-col rounded-[10px] border border-border/60 bg-card/30 p-4 transition-colors hover:border-signal/40 hover:bg-card/70",
                      FOCUS_RING,
                    )}
                  >
                    <div className="mb-3 flex items-center gap-1.5">
                      {it.tag ? (
                        <span className="rounded-[3px] bg-signal/15 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-signal">
                          {it.tag}
                        </span>
                      ) : null}
                      {it.badge ? (
                        <span className="rounded-[3px] border border-border/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                          {it.badge}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[14px] font-medium tracking-tight text-foreground">
                      {it.label}
                    </span>
                    {it.desc ? (
                      <span className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
                        {it.desc}
                      </span>
                    ) : null}
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover/card:text-signal">
                      Read <span aria-hidden>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              id={menuId}
              role="menu"
              aria-label={label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-full mt-2 min-w-[200px] rounded-[10px] border border-border/70 bg-popover/90 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              {items.map((it, i) => (
                <Link
                  key={it.href}
                  href={it.href}
                  ref={(node) => {
                    itemRefs.current[i] = node;
                  }}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                  onKeyDown={onItemKeyDown(i)}
                  className={cn(
                    "block rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                    FOCUS_RING,
                  )}
                >
                  {it.label}
                </Link>
              ))}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── Hamburger ─────────────────────────── */

function Hamburger({ open }: { open: boolean }) {
  const t = { type: "spring" as const, stiffness: 380, damping: 28 };
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <motion.line
        x1="3" x2="21" y1="8" y2="8"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        initial={false}
        animate={open ? { rotate: 45, translateY: 4 } : { rotate: 0, translateY: 0 }}
        style={{ transformOrigin: "12px 8px" }}
        transition={t}
      />
      <motion.line
        x1="3" x2="21" y1="16" y2="16"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        initial={false}
        animate={open ? { rotate: -45, translateY: -4 } : { rotate: 0, translateY: 0 }}
        style={{ transformOrigin: "12px 16px" }}
        transition={t}
      />
    </svg>
  );
}

/* ─────────────────────────── MobileMenu ───────────────────────────
   Slide-in panel from the right. Closes on link tap, Escape, backdrop tap.  */

function MobileMenu({
  onClose,
  onOpenEarlyAccess,
  onAnchor,
  isHome,
}: {
  onClose: () => void;
  onOpenEarlyAccess: () => void;
  onAnchor: (id: string) => void;
  isHome: boolean;
}) {
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Escape closes; focus moves into the panel on open.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Flatten the nav config into a single vertical list.
  const flat: { label: string; href: string; id?: string; section?: boolean }[] = [];
  for (const item of NAV_ITEMS) {
    if (item.type === "anchor") flat.push({ label: item.label, href: `/#${item.id}`, id: item.id });
    else if (item.type === "route") flat.push({ label: item.label, href: item.href });
    else item.items.forEach((s) => flat.push({ label: s.label, href: s.href }));
  }

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-40 md:hidden"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-md"
      />

      {/* Right slide-in panel */}
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="absolute inset-y-0 right-0 flex w-[86%] max-w-[360px] flex-col border-l border-border/60 bg-background/95 px-6 pt-24 pb-8 outline-none backdrop-blur-xl"
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {flat.map((l, i) =>
            l.id && isHome ? (
              <button
                key={l.label}
                type="button"
                onClick={() => onAnchor(l.id!)}
                className={cn(
                  "flex items-center justify-between border-b border-border/50 px-1 py-4 text-left text-[17px] text-foreground transition-colors hover:text-signal",
                  FOCUS_RING,
                )}
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between border-b border-border/50 px-1 py-4 text-[17px] text-foreground transition-colors hover:text-signal",
                  FOCUS_RING,
                )}
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ),
          )}
        </nav>

        {/* Pinned CTAs */}
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <button
            type="button"
            onClick={onOpenEarlyAccess}
            className={cn(
              "h-11 rounded-md border border-border/70 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
              FOCUS_RING,
            )}
          >
            Early access
          </button>
          <CtaButton size="lg" magnetic={false} className="w-full">
            Strategize
          </CtaButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
