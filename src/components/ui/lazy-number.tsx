"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "@/components/marketing/_motion";

type Format = Intl.NumberFormatOptions;

const DURATION_MS = 600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * A number that counts to its new value. While `live` is false it's plain
 * formatted text. Once live, each change counts from the previous value over
 * 600ms, written straight to the DOM (no React render per frame). Reduced
 * motion: the new value at once. (Replaces NumberFlow, whose mount was a
 * 40ms+ long task on phones.)
 */
export function LazyNumber({
  value,
  live,
  format,
  suffix,
}: {
  value: number;
  live: boolean;
  format?: Format;
  suffix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  // Keyed by content: callers pass `format` as an inline object.
  const formatKey = JSON.stringify(format ?? {});
  const fmt = React.useMemo(() => new Intl.NumberFormat("en-US", JSON.parse(formatKey)), [formatKey]);
  const text = (v: number) => `${fmt.format(v)}${suffix ?? ""}`;
  const shown = React.useRef(value);
  // React renders the first text only; after that the effect owns the text,
  // so React never touches a node the effect has replaced.
  const [initial] = React.useState(() => text(value));

  React.useEffect(() => {
    const el = ref.current;
    const from = shown.current;
    shown.current = value;
    if (!el || !live || reduced || from === value) {
      if (el) el.textContent = text(value);
      return;
    }
    const decimals = format?.maximumFractionDigits ?? 0;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION_MS);
      const v = from + (value - from) * easeOut(p);
      el.textContent = text(p < 1 ? Number(v.toFixed(decimals)) : value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `text` is derived from fmt and suffix.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, live, reduced, fmt, suffix]);

  return <span ref={ref}>{initial}</span>;
}
