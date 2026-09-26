"use client";

import * as React from "react";
import { ArrowUp, Microphone, Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Message composer: attach context (+), text, mic, round send button.
 * Controlled when `value` is passed; `onSend` receives the trimmed text.
 */
export function Composer({
  placeholder,
  value,
  onChange,
  onSend,
  id = "composer",
}: {
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  onSend?: (text: string) => void;
  id?: string;
}) {
  const [own, setOwn] = React.useState("");
  const text = value ?? own;
  const setText = onChange ?? setOwn;
  const ready = text.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!ready) return;
        onSend?.(text.trim());
        if (value === undefined) setOwn("");
      }}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-card p-1.5 focus-within:border-foreground/25"
    >
      <button
        type="button"
        aria-label="Attach context"
        className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60"
      >
        <Plus weight="bold" className="size-4" aria-hidden />
      </button>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-8 min-w-0 flex-1 bg-transparent px-1 text-[13.5px] text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="button"
        aria-label="Voice input"
        className="hidden size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 sm:flex"
      >
        <Microphone className="size-4" aria-hidden />
      </button>
      <button
        type="submit"
        aria-label="Send"
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60",
          ready ? "bg-foreground text-background" : "bg-foreground/[0.08] text-muted-foreground",
        )}
      >
        <ArrowUp weight="bold" className="size-3.5" aria-hidden />
      </button>
    </form>
  );
}
