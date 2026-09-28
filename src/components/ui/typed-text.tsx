"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/components/marketing/_motion";
import { TypingDots } from "./typing-dots";

/** Milliseconds per character: the one typing pace for every bot on the site. */
export const CHAR_MS = 28;
/** The caret lingers this long after the last character, then goes. */
const CARET_LINGER_MS = 600;

type Part = { text: string; kind: "plain" | "bold" | "code" };

/** Splits **bold** and `code` out of bot copy (same syntax as RichText). */
function parse(text: string, rich: boolean): Part[] {
  if (!rich) return [{ text, kind: "plain" }];
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((p) =>
      p.startsWith("**") ? { text: p.slice(2, -2), kind: "bold" } : p.startsWith("`") ? { text: p.slice(1, -1), kind: "code" } : { text: p, kind: "plain" },
    );
}

const plainLength = (text: string, rich = true) => parse(text, rich).reduce((n, p) => n + p.text.length, 0);

/** How long `text` takes to type, for scripting demo holds. */
export const typingDuration = (text: string) => plainLength(text) * CHAR_MS + CARET_LINGER_MS;

/**
 * The whole text, always laid out in full: the first `count` characters are
 * visible, the rest hidden (visibility, so they keep their space). Nothing
 * moves as characters appear, even in centred text. The caret is zero-width.
 */
function Rendered({ parts, count, caret = false }: { parts: Part[]; count: number; caret?: boolean }) {
  const starts = parts.map((_, i) => parts.slice(0, i).reduce((n, q) => n + q.text.length, 0));
  const wrap = (kind: Part["kind"], key: string, text: string, hidden: boolean) => {
    const cls = hidden ? "invisible" : undefined;
    return kind === "bold" ? (
      <strong key={key} className={cn("font-semibold", cls)}>
        {text}
      </strong>
    ) : kind === "code" ? (
      <code key={key} className={cn("rounded-xs bg-surface-2 px-1 font-mono text-[0.92em]", cls)}>
        {text}
      </code>
    ) : hidden ? (
      <span key={key} className={cls}>
        {text}
      </span>
    ) : (
      // One span per word: a word's box never moves once it's visible, while
      // one growing span's box would jump left when it wraps to a new line.
      <React.Fragment key={key}>
        {(text.match(/\s+|\S+\s*/g) ?? []).map((w, j) => (
          <span key={j}>{w}</span>
        ))}
      </React.Fragment>
    );
  };
  return (
    <>
      {parts.map((p, i) => {
        const cut = Math.max(0, Math.min(p.text.length, count - starts[i]));
        const atCaret = caret && count >= starts[i] && count < starts[i] + p.text.length + (i === parts.length - 1 ? 1 : 0);
        return (
          <React.Fragment key={i}>
            {cut > 0 ? wrap(p.kind, `${i}a`, p.text.slice(0, cut), false) : null}
            {/* Keyed by position: a fresh caret per character isn't a "moved" element (CLS). */}
            {atCaret ? <Caret key={`c${count}`} /> : null}
            {cut < p.text.length ? wrap(p.kind, `${i}b`, p.text.slice(cut), true) : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * Off inside chat history: messages that were already there don't retype.
 * Wrap with `<TypingOff>`.
 */
const TypingEnabled = React.createContext(true);
export function TypingOff({ children }: { children: React.ReactNode }) {
  return <TypingEnabled.Provider value={false}>{children}</TypingEnabled.Provider>;
}

const noopSubscribe = () => () => {};

/**
 * Text a bot "says": typed out at CHAR_MS per character with a blinking
 * caret that lingers 600ms, optionally after a short typing-dots beat
 * (`dotsMs`).
 *
 * - The full text is laid out invisibly underneath, so the final size is
 *   reserved from the first frame (no layout shift, no bubble jank).
 * - Screen readers get the full text once; the animation is aria-hidden.
 * - Types only while on screen. A new `text` cancels the one in flight and
 *   starts cleanly.
 * - Server-rendered text shows in full on hydration (never blanked for
 *   crawlers or no-JS). It types when first seen only if it was off screen
 *   at hydration; text that mounts or changes later always types.
 * - Reduced motion: the text appears at once, no caret or dots.
 */
export function TypedText({
  text,
  rich = false,
  dotsMs = 0,
  delayMs = 0,
  className,
}: {
  text: string;
  /** Render **bold** and `code`. */
  rich?: boolean;
  /** Show typing dots this long before typing starts. */
  dotsMs?: number;
  /** Wait this long (text hidden, no dots) before starting, e.g. to type paragraphs in turn. */
  delayMs?: number;
  className?: string;
}) {
  const enabled = React.useContext(TypingEnabled);
  const reduced = usePrefersReducedMotion();
  // false while hydrating server HTML, true for anything mounted afterwards.
  const clientMount = React.useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [mountedOnClient] = React.useState(clientMount);
  const animate = enabled && !reduced;

  const parts = React.useMemo(() => parse(text, rich), [text, rich]);
  const total = React.useMemo(() => parts.reduce((n, p) => n + p.text.length, 0), [parts]);

  // "dots" → "typing" → "done". A client mount starts hidden (no flash of the
  // full text before the first effect).
  const [phase, setPhase] = React.useState<"dots" | "typing" | "done">(animate && mountedOnClient ? (dotsMs ? "dots" : "typing") : "done");
  const [count, setCount] = React.useState(animate && mountedOnClient ? 0 : total);
  const [caret, setCaret] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);
  const firstRun = React.useRef(true);

  React.useEffect(() => {
    const el = ref.current;
    const first = firstRun.current;
    firstRun.current = false;
    if (!animate || !el) {
      setPhase("done");
      setCount(total);
      setCaret(false);
      return;
    }
    // Hydrated text that's already on screen stays as it is.
    if (first && !mountedOnClient) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) return;
    }

    setPhase(dotsMs ? "dots" : "typing");
    setCount(0);
    setCaret(false);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let started = false;

    const type = () => {
      setPhase("typing");
      setCaret(true);
      // One timer tick (and one React commit) per character, not per frame.
      const t0 = performance.now();
      let n = 0;
      const step = () => {
        n = Math.min(total, Math.max(n + 1, Math.floor((performance.now() - t0) / CHAR_MS) + 1));
        setCount(n);
        if (n < total) timer = setTimeout(step, CHAR_MS);
        else {
          setPhase("done");
          timer = setTimeout(() => setCaret(false), CARET_LINGER_MS);
        }
      };
      step();
    };
    const start = () => {
      if (started) return;
      started = true;
      if (dotsMs || delayMs) timer = setTimeout(type, delayMs + dotsMs);
      else type();
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        start();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
    // `text` (via parts/total) restarts it; the rest are stable per mount.
  }, [parts, total, animate, dotsMs, delayMs, mountedOnClient]);

  return (
    // Greedy wrapping: balance/pretty can re-break lines as spans change
    // mid-typing, which would move words.
    <span ref={ref} className={cn("relative inline-grid [text-wrap:wrap]", className)}>
      <span className="sr-only">{parts.map((p) => p.text).join("")}</span>
      <span aria-hidden className="[grid-area:1/1]">
        <Rendered parts={parts} count={phase === "dots" ? 0 : count} caret={caret} />
      </span>
      {phase === "dots" ? (
        <span aria-hidden className="[grid-area:1/1] justify-self-start">
          <TypingDots label="typing" className="h-[1lh] align-top" />
        </span>
      ) : null}
    </span>
  );
}

/**
 * Zero-width and a plain inline (not inline-block), so it neither pushes text
 * around nor adds a line-break opportunity inside a half-typed word.
 */
function Caret() {
  return (
    <span className="relative">
      <span className="absolute left-px top-[0.05em] h-[1.05em] w-[1.5px] animate-caret bg-current" />
    </span>
  );
}
