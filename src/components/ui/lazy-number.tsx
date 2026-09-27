"use client";

import NumberFlow, { type Format } from "@number-flow/react";

/**
 * NumberFlow only when it's needed. NumberFlow builds digit columns in its
 * own shadow DOM, which is heavy to hydrate; until `live`, this renders the
 * same formatted number as plain text (same width, tabular figures).
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
  if (live) return <NumberFlow value={value} format={format} suffix={suffix} />;
  return (
    <span>
      {new Intl.NumberFormat("en-US", format).format(value)}
      {suffix}
    </span>
  );
}
