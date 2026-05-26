"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "@phosphor-icons/react/dist/ssr";

/**
 * Theme toggle. Reads/writes `bonggy-theme` in localStorage and toggles the
 * `dark` class on <html>. The pre-paint script in layout.tsx already sets the
 * initial class, so this component just mirrors that state and flips it.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = React.useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("bonggy-theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  }, []);

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={
        "relative inline-flex size-9 items-center justify-center rounded-md border border-border/60 bg-card/40 text-foreground/80 transition-colors hover:border-border hover:text-foreground " +
        className
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 20, scale: 0.85 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon weight="regular" className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 20, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -20, scale: 0.85 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun weight="regular" className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
