"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { SPRING } from "./_motion";

const AREAS = [
  "Engineering",
  "Design",
  "Go-to-market",
  "Product",
  "Other",
];

export function CareersForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [area, setArea] = React.useState("");
  const [areaError, setAreaError] = React.useState(false);
  const areaButtonRef = React.useRef<HTMLButtonElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if ((formData.get("hp_field") as string)?.length) {
      setSubmitted(true);
      return;
    }
    // The area is a hidden input, which native `required` validation skips,
    // and the API rejects a pitch without one.
    if (!area) {
      setAreaError(true);
      areaButtonRef.current?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const body = Object.fromEntries(formData);
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok && res.status >= 500) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("careers submit failed", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
          No listed roles · Hiring quietly
        </div>
        <h2 className="mt-3 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[32px]">
          Tell us what you would build.
        </h2>
        <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-muted-foreground">
          We&apos;re hiring in waves for engineering, design, and early GTM. We
          don&apos;t list roles publicly — if you want to build agents that do
          real GTM work with people in charge, send us your take and we&apos;ll figure
          out the right shape together.
        </p>
        <ul className="mt-7 space-y-2.5 text-[14px] text-muted-foreground">
          {[
            "Async-first, written-first, demo-first",
            "Everyone here ships — no layers",
            "We respond within 48 hours",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-2 size-1 flex-none rounded-full bg-signal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/80 bg-card/60 p-6 sm:p-7">
        {submitted ? (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={SPRING.gentle}
            className="rounded-lg border border-signal/30 bg-signal/[0.05] p-5"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              Pitch received
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">
              We read every one. If there&apos;s a match, you&apos;ll hear from
              us within 48 hours. If not, we&apos;ll still tell you.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="mb-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
                Send a pitch
              </div>
              <h3 className="mt-1.5 text-[16px] font-medium tracking-tight text-foreground">
                What would you build at Bonggy?
              </h3>
            </div>

            {/* Honeypot */}
            <label
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              Leave empty
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
            </label>

            <Field
              label="Your name"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
            />
            <AreaSelect
              value={area}
              onChange={(v) => {
                setArea(v);
                setAreaError(false);
              }}
              error={areaError}
              buttonRef={areaButtonRef}
            />
            <Field
              label="Links (optional)"
              name="links"
              placeholder="Links: portfolio, GitHub, LinkedIn (optional)"
              autoComplete="off"
            />
            <TextArea
              label="Your pitch"
              name="pitch"
              placeholder="What would you build? What's the take you keep arguing for?"
              required
              rows={4}
            />
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "group/cta relative mt-2 inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-zinc-950 px-5 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-signal transition-all duration-200 active:translate-y-[1px] disabled:opacity-60",
                )}
                style={{
                  boxShadow:
                    "0 0 12px -3px oklch(0.78 0.13 152 / 18%)",
                }}
              >
                {submitting ? (
                  <>
                    <CircleNotch weight="bold" className="size-4 animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span className="size-1 rounded-full bg-signal" />
                    <span>Send pitch</span>
                    <ArrowUpRight
                      weight="bold"
                      className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    />
                  </>
                )}
              </button>

            <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/90">
              48-hour response · We read every one
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------- field primitives ---------- */

/** Short inline validation message, announced when it appears. */
function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-[12.5px] text-destructive">
      {children}
    </p>
  );
}

/** Visually hidden label; the placeholder alone isn't an accessible name. */
function HiddenLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="sr-only">
      {children}
    </label>
  );
}

function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, className, ...rest } = props;
  const id = React.useId();
  return (
    <>
      <HiddenLabel htmlFor={id}>{label}</HiddenLabel>
      <input
        {...rest}
        id={id}
        className={cn(
          "h-11 w-full rounded-md border border-border/80 bg-background/60 px-3.5 text-[14px] text-foreground placeholder:text-muted-foreground/90 outline-none transition-colors focus:border-signal/60 focus:ring-2 focus:ring-signal/20",
          className,
        )}
      />
    </>
  );
}

function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string },
) {
  const { label, className, ...rest } = props;
  const id = React.useId();
  return (
    <>
      <HiddenLabel htmlFor={id}>{label}</HiddenLabel>
      <textarea
        {...rest}
        id={id}
        className={cn(
          "w-full rounded-md border border-border/80 bg-background/60 px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/90 outline-none transition-colors focus:border-signal/60 focus:ring-2 focus:ring-signal/20",
          "resize-none",
          className,
        )}
      />
    </>
  );
}

function AreaSelect({
  value,
  onChange,
  error,
  buttonRef,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const labelId = React.useId();
  const valueId = React.useId();
  const errorId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="area" value={value} />
      <span id={labelId} className="sr-only">
        Area of interest
      </span>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border bg-background/60 px-3.5 text-left text-[14px] outline-none transition-colors",
          error
            ? "border-destructive/70 ring-2 ring-destructive/20"
            : "border-border/80 hover:border-border focus:border-signal/60 focus:ring-2 focus:ring-signal/20",
          open && !error && "border-signal/60 ring-2 ring-signal/20",
        )}
      >
        <span
          id={valueId}
          className={value ? "text-foreground" : "text-muted-foreground/90"}
        >
          {value || "Area of interest"}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn(
            "size-3 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {error ? <FieldError id={errorId}>Pick an area of interest.</FieldError> : null}

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-md border border-border/80 bg-card p-1 shadow-[0_18px_40px_-12px_oklch(0_0_0_/_60%),inset_0_1px_0_oklch(1_0_0_/_6%)]"
          >
            {AREAS.map((r) => {
              const active = r === value;
              return (
                <li key={r}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(r);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-[13.5px] transition-colors",
                      active
                        ? "bg-signal/10 text-signal"
                        : "text-foreground/90 hover:bg-foreground/[0.05] hover:text-foreground",
                    )}
                  >
                    <span>{r}</span>
                    {active && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="size-3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
