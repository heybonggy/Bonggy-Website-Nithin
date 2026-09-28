// Plain module (not "use client") so the root layout can inline the script.

import { THEME_COLORS } from "@/lib/metadata";

export const THEME_STORAGE_KEY = "bonggy-theme";

/**
 * Runs as the first child of <head>, before any stylesheet, so the right
 * theme paints on the first frame (no flash). A stored choice wins;
 * otherwise the system preference decides.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';var m=document.querySelector('meta[name=theme-color]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}m.content=d?'${THEME_COLORS.dark}':'${THEME_COLORS.light}'}catch(_){}`;

/**
 * The hero intro (words and blocks fading up) only plays when the page is
 * first shown at the top. On a reload, back/forward, a #hash link or any
 * restored scroll, the browser may paint the top first and then jump, so a
 * replaying intro would leave the hero blank mid-page. Decided here, before
 * first paint; `.no-intro` switches the intro off (globals.css).
 */
export const INTRO_INIT_SCRIPT = `try{var n=performance.getEntriesByType('navigation')[0],k=n&&n.type;if(k==='reload'||k==='back_forward'||location.hash||scrollY>0)document.documentElement.classList.add('no-intro')}catch(_){}`;
