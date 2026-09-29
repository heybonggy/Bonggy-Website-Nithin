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
 * No client component: dismissing is handled by the inline NEWS_INIT_SCRIPT,
 * so the banner adds no hydration work. It sits in flow with fixed heights
 * per breakpoint; the sticky header after it follows in pure CSS. The
 * pre-paint dismissal check and CSS that hides it on the news item's own
 * page (NewsHere) keep CLS at 0.
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

      {/* Phones: the whole message is the link (one big target). It ends
          56px from the right edge, leaving 8px of dead space before the
          dismiss button's own 44x44 target, so a slightly-off tap on "Read"
          can't dismiss. */}
      <a
        href={news.cta.href}
        className="flex h-full min-w-0 flex-1 items-center justify-center gap-2 pl-3 pr-14 text-[12px] leading-snug focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg-inverse sm:hidden"
      >
        <span aria-hidden className="inline-block shrink-0 animate-bob text-[15px] leading-none">
          {news.emoji}
        </span>
        <span className="line-clamp-2 min-w-0">
          {news.text} <span className="whitespace-nowrap font-medium underline underline-offset-2">Read&nbsp;→</span>
        </span>
      </a>

      <div className="mx-auto hidden w-full min-w-0 max-w-wide items-center justify-center gap-3 px-14 text-ui-sm sm:flex">
        <span aria-hidden className="inline-block shrink-0 animate-bob text-[15px] leading-none">
          {news.emoji}
        </span>
        <span className="line-clamp-1 min-w-0">{news.text}</span>
        <a
          href={news.cta.href}
          className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-3 font-medium ring-1 ring-fg-inverse/40 transition-colors hover:bg-fg-inverse/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-inverse"
        >
          {news.cta.label}
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* Its own 44x44 target, no extended hit area. Handled by
          NEWS_INIT_SCRIPT's delegated click listener. */}
      <button
        type="button"
        data-news-dismiss
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-fg-inverse/80 transition-colors hover:bg-fg-inverse/10 hover:text-fg-inverse focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg-inverse"
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
