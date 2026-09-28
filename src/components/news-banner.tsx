import { X } from "@phosphor-icons/react/dist/ssr";
import { news } from "@/content/news";

/** Bong, drawn inline (static) so the banner needs no client component. */
function PeekFace() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="size-7 translate-y-2">
      <path d="M50 4 C85 4 96 15 96 50 C96 85 85 96 50 96 C15 96 4 85 4 50 C4 15 15 4 50 4 Z" fill="var(--foreground-inverse)" />
      <rect x={31} y={37.5} width={38} height={13} rx={6.5} fill="var(--foreground)" />
    </svg>
  );
}

/**
 * A thin announcement strip above the navbar, linking to the current news
 * item (content/news.ts). Graphite in light, near-white in dark.
 *
 * No client component: dismissing and the navbar following the scroll are
 * handled by the inline NEWS_INIT_SCRIPT, so the banner adds no hydration
 * work before first paint (a client component in the root layout measurably
 * pushed mobile LCP out). Fixed heights per breakpoint, reserved through
 * <html class="news-on">, the pre-paint dismissal check, and CSS that hides
 * it on the news item's own page (NewsHere) keep CLS at 0.
 */
export function NewsBanner() {
  if (!news.enabled) return null;
  return (
    <div
      role="region"
      aria-label="Announcement"
      className="news-banner group relative isolate flex h-14 items-center overflow-hidden bg-surface-inverse text-fg-inverse sm:h-10"
    >
      {/* Bong peeks in from the left edge on hover (desktop, motion allowed). */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-2 hidden -translate-x-[140%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 sm:motion-safe:block"
      >
        <PeekFace />
      </span>

      <div className="mx-auto flex w-full min-w-0 max-w-wide items-center justify-center gap-2 pl-3 pr-11 text-[12px] leading-snug sm:gap-3 sm:px-12 sm:text-ui-sm">
        <span aria-hidden className="inline-block shrink-0 animate-bob text-[15px] leading-none">
          {news.emoji}
        </span>
        <span className="line-clamp-2 min-w-0 sm:line-clamp-1">{news.text}</span>
        <a
          href={news.cta.href}
          className="relative inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 font-medium sm:px-3 ring-1 ring-fg-inverse/40 transition-colors hover:bg-fg-inverse/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-inverse after:absolute after:-inset-2 after:content-['']"
        >
          <span className="sm:hidden" aria-hidden>
            Read
          </span>
          <span className="sr-only sm:not-sr-only">{news.cta.label}</span>
          <span aria-hidden className="hidden sm:inline">→</span>
        </a>
      </div>

      {/* Handled by NEWS_INIT_SCRIPT's delegated click listener. */}
      <button
        type="button"
        data-news-dismiss
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-fg-inverse/80 transition-colors hover:bg-fg-inverse/10 hover:text-fg-inverse focus-visible:outline-2 focus-visible:outline-fg-inverse after:absolute after:-inset-1 after:content-['']"
      >
        <X className="size-4" weight="bold" aria-hidden />
      </button>
    </div>
  );
}

/** Rendered by the news item's own page: the banner hides there. */
export function NewsHere() {
  return <span data-news-here hidden />;
}
