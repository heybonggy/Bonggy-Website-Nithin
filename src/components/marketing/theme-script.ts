// Plain module (not "use client") so the root layout can inline the script.

import { THEME_COLORS } from "@/lib/metadata";

export const THEME_STORAGE_KEY = "bonggy-theme";

/**
 * Runs as the first child of <head>, before any stylesheet, so the right
 * theme paints on the first frame (no flash). A stored choice wins;
 * otherwise the system preference decides.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';var m=document.querySelector('meta[name=theme-color]');if(m)m.content=d?'${THEME_COLORS.dark}':'${THEME_COLORS.light}'}catch(_){}`;
