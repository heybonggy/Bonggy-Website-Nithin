"use client";

import * as React from "react";
import { ArrowUp, Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * The chat composer, drawn (not a real input). `value` shows scripted typing;
 * empty shows the placeholder with a blinking caret when `caret` is set.
 */
export function ChatComposer({
  value = "",
  caret = false,
  sending = false,
  placeholder = "tell a bot what to do, in your own words",
  className,
}: {
  value?: string;
  caret?: boolean;
  sending?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-2 rounded-xl border-[0.5px] border-border-strong bg-surface-raised/95 p-2 shadow-e2 sm:bg-surface-raised/85 sm:backdrop-blur-[8px]",
        className,
      )}
    >
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-fg-3">
        <Plus className="size-4" aria-hidden />
      </span>
      <TypedLine value={value} caret={caret} placeholder={placeholder} />
      <span
        data-cursor-target="send"
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-[var(--dur-quick)]",
          value || sending ? "bg-surface-inverse text-fg-inverse" : "bg-surface-2 text-fg-3",
        )}
      >
        <ArrowUp className="size-4" weight="bold" aria-hidden />
      </span>
    </div>
  );
}

/**
 * One line, like a real text field: long text shows its end. The line never
 * changes height, and the text slides left with a transform (not a layout
 * move), so scripted typing never counts as a layout shift. The caret is
 * re-created per character for the same reason.
 */
function TypedLine({ value, caret, placeholder }: { value: string; caret: boolean; placeholder: string }) {
  const boxRef = React.useRef<HTMLParagraphElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [shift, setShift] = React.useState(0);
  React.useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    setShift(box && text && value ? Math.max(0, text.scrollWidth - box.clientWidth) : 0);
  }, [value]);
  return (
    <p ref={boxRef} className="min-h-7 min-w-0 flex-1 overflow-hidden whitespace-nowrap py-1 text-[14px] leading-5">
      {value ? (
        <span ref={textRef} className="inline-block text-foreground" style={shift ? { transform: `translateX(${-shift}px)` } : undefined}>
          {value}
          <span key={value.length} aria-hidden className="ml-px inline-block h-4 w-px translate-y-[3px] animate-caret bg-foreground" />
        </span>
      ) : (
        <span className="block truncate text-fg-3">
          {placeholder}
          {caret ? <span aria-hidden className="ml-px inline-block h-4 w-px translate-y-[3px] animate-caret bg-foreground" /> : null}
        </span>
      )}
    </p>
  );
}
