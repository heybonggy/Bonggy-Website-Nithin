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

/** A dismissal lasts this long, or until a new `id` ships. */
export const NEWS_DISMISS_DAYS = 14;

/**
 * Inline in <head>.
 * - Before first paint: hides the banner if this item was dismissed within
 *   the last NEWS_DISMISS_DAYS, so it never flashes in and collapses.
 *   Stored as {"id", "at"}; an old plain-string value counts as dismissed
 *   now (and is rewritten that way).
 * - Dismiss: a delegated click on [data-news-dismiss] stores {id, at}.
 * The header follows the banner in pure CSS (sticky), so there's no scroll
 * listener here.
 */
export const NEWS_INIT_SCRIPT = `(function(){var K='${NEWS_DISMISSED_KEY}',I='${news.id}',T=${NEWS_DISMISS_DAYS}*864e5;try{var v=localStorage.getItem(K),d=null;if(v){try{d=JSON.parse(v)}catch(_){d=v}}if(typeof d==='string'){if(d===I){d={id:I,at:Date.now()};localStorage.setItem(K,JSON.stringify(d))}else d=null}if(d&&d.id===I&&Date.now()-d.at<T)document.documentElement.classList.add('news-dismissed')}catch(_){}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('[data-news-dismiss]');if(!b)return;try{localStorage.setItem(K,JSON.stringify({id:I,at:Date.now()}))}catch(_){}document.documentElement.classList.add('news-dismissed')})})();`;
