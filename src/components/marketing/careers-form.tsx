"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CaretDown, Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { TypingDots } from "@/components/ui/typing-dots";
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
        <p className="text-ui-sm font-medium text-fg-3">No listed roles · Hiring quietly</p>
        <h2 className="mt-2 text-heading text-foreground">
          Tell us what you would build.
        </h2>
        <p className="mt-4 max-w-copy text-body text-fg-2">
          We&apos;re hiring in waves for engineering, design, and early GTM. We
          don&apos;t list roles publicly. If you want to build bots that do
          real GTM work with people in charge, send us your take and we&apos;ll figure
          out the right shape together.
        </p>
        <ul className="mt-6 space-y-2.5 text-ui text-fg-2">
          {[
            "Async-first, written-first, demo-first",
            "Everyone here ships, no layers",
            "We respond within 48 hours",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check weight="bold" className="mt-1 size-3.5 flex-none text-foreground" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-surface p-6 sm:p-7">
        {submitted ? (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={SPRING.gentle}
            className="rounded-2xl bg-background p-5 hairline"
          >
            <p className="flex items-center gap-1.5 text-ui font-semibold text-foreground">
              <Check weight="bold" className="size-4" aria-hidden />
              Pitch received
            </p>
            <p className="mt-2 text-ui text-fg-2">
              We read every one. If there&apos;s a match, you&apos;ll hear from
              us within 48 hours. If not, we&apos;ll still tell you.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="mb-1">
              <p className="text-ui-sm font-medium text-fg-3">Send a pitch</p>
              <h3 className="mt-1 text-title font-medium text-foreground">
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
                className="group/cta mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-surface-inverse px-5 text-ui font-medium text-fg-inverse transition-opacity duration-[var(--dur-fast)] hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <TypingDots label="Sending" />
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <span>Send pitch</span>
                    <ArrowUpRight
                      weight="bold"
                      className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    />
                  </>
                )}
              </button>

            <p className="mt-1 text-center text-caption text-fg-3">
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
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-ui-sm text-danger">
      <Warning className="size-3.5" aria-hidden />
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
          "h-11 w-full rounded-md border border-input bg-background px-3.5 text-ui text-foreground placeholder:text-fg-3 outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/30",
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
          "w-full rounded-md border border-input bg-background px-3.5 py-3 text-ui text-foreground placeholder:text-fg-3 outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/30",
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
          "flex h-11 w-full items-center justify-between rounded-md border bg-background px-3.5 text-left text-ui outline-none transition-colors",
          error
            ? "border-danger ring-2 ring-danger/20"
            : "border-input hover:border-border-strong focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/30",
          open && !error && "border-foreground",
        )}
      >
        <span
          id={valueId}
          className={value ? "text-foreground" : "text-fg-3"}
        >
          {value || "Area of interest"}
        </span>
        <CaretDown aria-hidden className={cn("size-3.5 text-fg-3 transition-transform", open && "rotate-180")} />
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
            className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg bg-surface-raised p-1 shadow-e3 hairline"
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
                      "flex min-h-10 w-full items-center justify-between rounded-sm px-3 text-left text-ui transition-colors",
                      active
                        ? "bg-wash-selected font-medium text-foreground"
                        : "text-foreground hover:bg-wash-hover",
                    )}
                  >
                    <span>{r}</span>
                    {active && (
                      <Check weight="bold" aria-hidden className="size-3.5" />
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
