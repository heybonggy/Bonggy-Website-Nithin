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
 * Inline in <head>.
 * - Before first paint: hides the banner once this item was dismissed, so it
 *   never flashes in and collapses.
 * - Dismiss: a delegated click on [data-news-dismiss] stores the id.
 * The header follows the banner in pure CSS (sticky), so there's no scroll
 * listener here.
 */
export const NEWS_INIT_SCRIPT = `try{var h=document.documentElement;if(localStorage.getItem('${NEWS_DISMISSED_KEY}')==='${news.id}')h.classList.add('news-dismissed')}catch(_){}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('[data-news-dismiss]');if(!b)return;try{localStorage.setItem('${NEWS_DISMISSED_KEY}','${news.id}')}catch(_){}document.documentElement.classList.add('news-dismissed')});`;
