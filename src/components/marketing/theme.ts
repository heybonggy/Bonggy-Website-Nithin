"use client";

import * as React from "react";

export type Theme = "light" | "dark";

import { THEME_STORAGE_KEY } from "./theme-script";
import { THEME_COLORS } from "@/lib/metadata";

const listeners = new Set<() => void>();

function stored(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === "dark" || t === "light" ? t : null;
  } catch {
    return null;
  }
}

function system(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Apply without letting colours transition unevenly: no transitions for one frame. */
function apply(theme: Theme) {
  const el = document.documentElement;
  el.classList.add("theme-switching");
  el.classList.toggle("dark", theme === "dark");
  el.style.colorScheme = theme;
  // Browser chrome follows the site toggle, not only the system setting.
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("theme-switching")));
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStorage);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSystem);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStorage);
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onSystem);
    }
  };
}

// Another tab changed the choice.
function onStorage(e: StorageEvent) {
  if (e.key === THEME_STORAGE_KEY) apply(stored() ?? system());
}

// Follow live system changes only while nothing is stored.
function onSystem() {
  if (!stored()) apply(system());
}

const getSnapshot = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  apply(theme);
}

/** Current theme. The server snapshot is "light", so hydration never mismatches. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, () => "light" as Theme);
  return [theme, setTheme];
}
