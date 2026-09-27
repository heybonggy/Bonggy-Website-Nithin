"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { EASE } from "./_motion";
import { useTheme, type Theme } from "./theme";

/** 36px icon button for the header (44px hit area on touch). */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Moon : Sun;
  return (
    <button
      type="button"
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === "dark"}
      onClick={() => setTheme(next)}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-full bg-surface-2 text-foreground transition-colors hover:bg-surface-3",
        "after:absolute after:-inset-1 after:content-['']",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE.pop }}
          className="inline-flex"
        >
          <Icon className="size-4" aria-hidden />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** Light · Dark segmented control for the mobile sheet. */
export function ThemeSegmented({ className }: { className?: string }) {
  const [theme, setTheme] = useTheme();
  return (
    <div role="radiogroup" aria-label="Theme" className={cn("grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1", className)}>
      {(["light", "dark"] as const).map((t) => {
        const Icon = t === "dark" ? Moon : Sun;
        const active = theme === t;
        return (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(t)}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-full text-ui font-medium transition-colors",
              active ? "bg-surface-raised text-foreground shadow-e1" : "text-fg-2 hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {t === "dark" ? "Dark" : "Light"}
          </button>
        );
      })}
    </div>
  );
}
