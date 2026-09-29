"use client";

import * as React from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Copies a boilerplate paragraph.
 *
 * The label is the widest of the two states from the first render, so the
 * button never changes size when it flips to "Copied" and nothing around it
 * moves. The only client JS on this page.
 */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard denied (an insecure origin, or the user said no). The text
      // is on the page to select by hand, so there is nothing to recover.
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full bg-surface-2 px-4 text-ui-sm font-medium text-foreground",
        "transition-colors duration-[var(--dur-fast)] hover:bg-surface-3",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      {copied ? (
        <Check className="size-4 shrink-0" aria-hidden />
      ) : (
        <Copy className="size-4 shrink-0" aria-hidden />
      )}
      <span className="grid">
        {/* Both labels occupy the same cell, so the width is the wider one. */}
        <span className={cn("col-start-1 row-start-1", copied && "invisible")}>{label}</span>
        <span className={cn("col-start-1 row-start-1", !copied && "invisible")} aria-hidden>
          Copied
        </span>
      </span>
      <span className="sr-only" role="status">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
