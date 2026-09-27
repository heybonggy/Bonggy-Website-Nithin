"use client";

import * as React from "react";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/track";
import { CAL_LINK } from "./cta-button";
import { useEntrance, usePrefersReducedMotion } from "./_motion";

const PLACEHOLDER = "give your first bot a purpose…";
const MAX = 280;
const STORAGE_KEY = "bonggy:first-purpose";

/** The booking link with the purpose prefilled in cal.com's "Additional notes". */
export function bookingUrlWith(purpose: string) {
  const sep = CAL_LINK.includes("?") ? "&" : "?";
  return `${CAL_LINK}${sep}notes=${encodeURIComponent(purpose)}`;
}

/**
 * The final CTA's composer: a real input. Type what your first bot should do
 * and send it to open a strategy call with it prefilled in the booking notes.
 * A typewriter shows the placeholder until you focus the field or type; it
 * never types over you, and reduced motion shows the placeholder only.
 */
export function CtaComposer() {
  const ref = React.useRef<HTMLFormElement>(null);
  const fieldRef = React.useRef<HTMLTextAreaElement>(null);
  const entrance = useEntrance(ref, 0.6);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [typed, setTyped] = React.useState(0);
  const [hint, setHint] = React.useState<"" | "empty" | "opening">("");
  const [shake, setShake] = React.useState(0);

  // Once the field has been focused or typed in, the typewriter is done for good.
  const ghostOn = !reduced && !touched && !value && entrance === "go" && typed < PLACEHOLDER.length;

  React.useEffect(() => {
    if (!ghostOn) return;
    const id = setInterval(() => setTyped((n) => Math.min(PLACEHOLDER.length, n + 1)), 55);
    return () => clearInterval(id);
  }, [ghostOn]);

  const submit = () => {
    const text = value.trim();
    if (!text) {
      setHint("empty");
      setShake((n) => n + 1);
      fieldRef.current?.focus();
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, text);
    } catch {
      // Private mode: the booking link still carries it.
    }
    trackEvent("cta_purpose_submit", { length: text.length });
    setHint("opening");
    window.open(bookingUrlWith(text), "_blank", "noopener,noreferrer");
  };

  // While the typewriter runs, the ghost text stands in for the placeholder.
  const showGhost = ghostOn || (!touched && !value && !reduced && entrance === "go" && !focused);
  const ghostText = PLACEHOLDER.slice(0, typed);

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="mt-12 w-full max-w-[520px] text-left"
    >
      <label htmlFor="first-purpose" className="sr-only">
        What should your first bot do?
      </label>
      <div
        key={shake}
        className={cn(
          "flex items-end gap-2 rounded-xl border-[0.5px] border-border-strong bg-surface-raised p-1.5 pl-3 shadow-e2 transition-shadow focus-within:ring-2 focus-within:ring-ring/40",
          shake > 0 && "animate-shake",
        )}
      >
        <span className="relative min-w-0 flex-1">
          {showGhost ? (
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-2.5 truncate text-[16px] leading-6 text-fg-3">
              {ghostText}
              <span className="ml-px inline-block h-4 w-px translate-y-[3px] animate-caret bg-foreground" />
            </span>
          ) : null}
          <textarea
            ref={fieldRef}
            id="first-purpose"
            name="purpose"
            rows={1}
            maxLength={MAX}
            enterKeyHint="send"
            value={value}
            placeholder={showGhost ? "" : PLACEHOLDER}
            onFocus={() => {
              setFocused(true);
              setTouched(true);
            }}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setValue(e.target.value);
              setTouched(true);
              if (hint) setHint("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit();
              }
            }}
            aria-describedby="first-purpose-hint"
            className="block max-h-36 min-h-11 w-full resize-none bg-transparent py-2.5 text-[16px] leading-6 text-foreground outline-none [field-sizing:content] placeholder:text-fg-3"
          />
        </span>
        <button
          type="submit"
          aria-label="Book a strategy call with this"
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors",
            value.trim() ? "bg-surface-inverse text-fg-inverse" : "bg-surface-2 text-fg-2 hover:bg-surface-3",
          )}
        >
          <ArrowUp className="size-5" weight="bold" aria-hidden />
        </button>
      </div>
      <p id="first-purpose-hint" aria-live="polite" className="mt-2 min-h-5 text-center text-ui-sm text-fg-3">
        {hint === "empty" ? "type a sentence first" : hint === "opening" ? "opening your strategy call…" : `${value.length ? `${value.length}/${MAX}` : ""}`}
      </p>
    </form>
  );
}
