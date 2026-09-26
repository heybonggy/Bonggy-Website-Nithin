"use client";

import * as React from "react";

const QUERY = "(max-width: 767px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** True below md (phones), hydration-safe. Used to simplify animations. */
export function useIsNarrow(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
