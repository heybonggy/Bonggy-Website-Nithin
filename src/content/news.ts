// Plain module (not "use client"): the root layout inlines NEWS_INIT_SCRIPT.

/** The live-news slot. Ship a new `id` to show the banner again to people
    who dismissed the last one; `enabled: false` hides it everywhere. */
export const news = {
  id: "note-2026-09",
  emoji: "🪐",
  text: "A note from us: why we built Bonggy, and the lines we won't cross.",
  cta: { label: "Read the note", href: "/resources/a-note-from-us" },
  enabled: true,
};

export const NEWS_DISMISSED_KEY = "bonggy:news-dismissed";

/**
 * Runs in <head> before first paint: if this news item was dismissed, hide
 * the banner via a class on <html>, so it never flashes in and collapses.
 */
export const NEWS_INIT_SCRIPT = `try{if(localStorage.getItem('${NEWS_DISMISSED_KEY}')==='${news.id}')document.documentElement.classList.add('news-dismissed')}catch(_){}`;
