"use client";

import * as React from "react";
import Link from "next/link";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
  LayoutGroup,
} from "motion/react";
import { cn } from "@/lib/utils";
import { BonggyMark } from "./bonggy-mark";
import { Magnetic } from "./magnetic";
import { EarlyAccessModal } from "./early-access-modal";
import { SPRING } from "./_motion";

const LINKS = [
  { href: "/how-it-works", id: "how-it-works", label: "How it works" },
  { href: "/fix", id: "fix", label: "The fix" },
  { href: "/use-cases", id: "use-cases", label: "Use cases" },
];

const MOBILE_LINKS = [
  ...LINKS,
  { href: "/faq", id: "faq", label: "FAQ" },
  { href: "/about", id: "about", label: "About" },
  { href: "/contact", id: "contact", label: "Contact" },
];

const LETTERS = ["B", "O", "N", "G", "G", "Y"];

function LogoLink() {
  const [hovered, setHovered] = React.useState(false);
  const [hoverKey, setHoverKey] = React.useState(0);

  return (
    <Link
      href="/"
      onMouseEnter={() => {
        setHovered(true);
        setHoverKey((k) => k + 1);
      }}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-2.5 pl-2 pr-3"
    >
      <BonggyMark className="size-7 transition-transform duration-500 group-hover:rotate-[10deg]" />
      <span
        key={hoverKey}
        className="flex font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-foreground"
        aria-label="Bonggy"
      >
        {LETTERS.map((char, i) => (
          <motion.span
            key={i}
            initial={hovered ? { opacity: 0.15, y: 2 } : false}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [hoverId, setHoverId] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menu on route changes (best-effort: hash + popstate)
  React.useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { threshold: [0.2, 0.5], rootMargin: "-25% 0px -55% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const showId = hoverId || activeId;

  return (
    <>
      <motion.header
        initial={{ y: -16 }}
        animate={{ y: 0 }}
        transition={SPRING}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-3 sm:px-6 sm:py-4"
      >
        <div
          className={cn(
            "relative flex h-13 w-full max-w-[1180px] items-center justify-between rounded-full px-3 py-2 transition-[background,box-shadow,backdrop-filter,border-color] duration-300 sm:px-4",
            scrolled || mobileOpen
              ? "border border-border/80 bg-card/80 backdrop-blur-xl"
              : "border border-border/30 bg-card/30 backdrop-blur-md",
          )}
          style={{
            boxShadow:
              scrolled || mobileOpen
                ? "inset 0 1px 0 oklch(1 0 0 / 8%), 0 1px 0 oklch(0 0 0 / 30%), 0 20px 60px -20px oklch(0 0 0 / 70%)"
                : "inset 0 1px 0 oklch(1 0 0 / 4%), 0 10px 30px -15px oklch(0 0 0 / 50%)",
          }}
        >
          {/* Logo */}
          <Magnetic pull={0.3} range={80}>
            <LogoLink />
          </Magnetic>

          {/* Desktop center nav */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
            onPointerLeave={() => setHoverId(null)}
          >
            <LayoutGroup>
              {LINKS.map((l) => {
                const isActive = showId === l.id;
                return (
                  <Link
                    key={l.id}
                    href={l.href}
                    onPointerEnter={() => setHoverId(l.id)}
                    className="relative px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-md border border-border/80 bg-background/70"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        style={{
                          boxShadow:
                            "inset 0 1px 0 oklch(1 0 0 / 8%), inset 0 -1px 0 oklch(0 0 0 / 30%)",
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex items-center gap-1",
                        isActive && "text-foreground",
                      )}
                    >
                      <span className="text-foreground/40">·</span>
                      {l.label}
                    </span>
                  </Link>
                );
              })}
            </LayoutGroup>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Early access , desktop */}
            <EarlyAccessModal
              trigger={
                <button
                  type="button"
                  className="group/cta relative hidden h-9 items-center justify-center gap-1.5 rounded-md bg-transparent px-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-signal transition-all duration-200 hover:bg-signal/[0.04] hover:text-signal/95 active:translate-y-[1px] sm:inline-flex"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px oklch(0.78 0.13 152 / 22%), 0 0 12px -4px oklch(0.78 0.13 152 / 16%)",
                  }}
                >
                  <span className="size-1 rounded-full bg-signal" />
                  <span className="relative">Early access</span>
                </button>
              }
            />

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-md border border-border/60 bg-zinc-950/60 text-foreground sm:hidden"
            >
              <Hamburger open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ---------- Animated hamburger ---------- */

function Hamburger({ open }: { open: boolean }) {
  const transition = { type: "spring" as const, stiffness: 380, damping: 28 };
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <motion.line
        x1="3"
        x2="21"
        y1="8"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        initial={false}
        animate={
          open
            ? { rotate: 45, translateY: 4, originX: 0.5, originY: 0.5 }
            : { rotate: 0, translateY: 0 }
        }
        style={{ originX: "12px", originY: "8px", transformOrigin: "12px 8px" }}
        transition={transition}
      />
      <motion.line
        x1="3"
        x2="21"
        y1="16"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        initial={false}
        animate={
          open
            ? { rotate: -45, translateY: -4 }
            : { rotate: 0, translateY: 0 }
        }
        style={{ transformOrigin: "12px 16px" }}
        transition={transition}
      />
    </svg>
  );
}

/* ---------- Mobile menu panel ---------- */

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-40 sm:hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-md"
      />

      {/* Panel */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={SPRING}
        className="relative flex h-full flex-col pt-24 pb-10"
      >
        <nav className="flex flex-col gap-1 px-6">
          {MOBILE_LINKS.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...SPRING, delay: 0.04 + i * 0.04 }}
            >
              <Link
                href={l.href}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-border/60 px-1 py-5 font-mono text-[18px] uppercase tracking-[0.15em] text-foreground transition-colors hover:text-signal"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING, delay: 0.2 }}
          className="mt-auto px-6"
        >
          <EarlyAccessModal
            trigger={
              <button
                type="button"
                onClick={onClose}
                className="group/cta relative inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-zinc-950 px-4 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-signal"
                style={{
                  boxShadow:
                    "0 0 0 1px oklch(0.78 0.13 152 / 22%), 0 0 18px -3px oklch(0.78 0.13 152 / 20%)",
                }}
              >
                <span className="size-1 rounded-full bg-signal" />
                <span>Request early access</span>
              </button>
            }
          />
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
            The command centre for sales teams
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
