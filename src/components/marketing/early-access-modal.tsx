"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  CircleNotch,
  X as XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";
import { SPRING } from "./_motion";

export const CAL_LINK = "https://cal.com/bonggy/30min?overlayCalendar=true";

type Props = {
  trigger?: React.ReactElement;
  /** Optional controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ROLES = [
  "VP Sales / Head of Sales",
  "Founder",
  "Sales Manager",
  "RevOps",
  "SDR / AE",
  "Other",
];

/**
 * Custom modal , NOT using @base-ui/react Dialog. That implementation was
 * misclassifying clicks on form inputs as "outside the popup" on mobile and
 * closing the dialog. This version controls open state explicitly: only
 * closes via the X button, Escape, or backdrop click (never on inputs).
 */
export function EarlyAccessModal({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: Props) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange],
  );

  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [roleError, setRoleError] = React.useState(false);

  // Reset form state whenever the modal opens
  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
      setRoleError(false);
    }
  }, [open]);

  // Lock scroll while open + close on Escape.
  // Under the ScrollShell pattern the document doesn't scroll — the .bonggy-
  // scroll-shell element does. Freeze its overflow to lock; release on close.
  React.useEffect(() => {
    if (!open) return;
    const shell = document.querySelector<HTMLElement>(".bonggy-scroll-shell");
    const prevOverflow = shell?.style.overflow ?? "";
    if (shell) shell.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      if (shell) shell.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if ((formData.get("hp_field") as string)?.length) {
      setSubmitted(true);
      return;
    }
    if (!role) {
      setRoleError(true);
      return;
    }
    setRoleError(false);
    setSubmitting(true);
    try {
      const body = { ...Object.fromEntries(formData), role };
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok && res.status >= 500) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("early-access submit failed", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  // Trigger: clone the user-provided element to attach our onClick
  const triggerEl = trigger
    ? React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          // Preserve any existing onClick the trigger had
          const existing = (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick;
          existing?.(e);
          if (!e.defaultPrevented) setOpen(true);
        },
      } as Partial<React.HTMLAttributes<HTMLElement>>)
    : null;

  return (
    <>
      {triggerEl}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop , closes on click */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Panel , stops propagation so internal clicks NEVER hit backdrop */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ea-title"
              initial={{ y: 12, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 8, scale: 0.97 }}
              transition={SPRING}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_30px_80px_-20px_oklch(0_0_0_/_70%)]"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
              >
                <XIcon weight="bold" className="size-4" />
              </button>

              <div className="flex flex-col gap-5 p-7">
                <div className="flex flex-col gap-2">
                  <h2
                    id="ea-title"
                    className="text-balance text-[22px] font-medium leading-tight tracking-tight text-foreground"
                  >
                    Early access for teams done waiting for better outbound.
                  </h2>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                    We built Bonggy because great reps shouldn&apos;t burn out
                    on bad data. We&apos;re rolling out in waves, not to
                    gatekeep, but because we&apos;d rather onboard ten teams
                    properly than a hundred poorly.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={SPRING}
                    className="flex flex-col gap-3 rounded-lg border border-signal/30 bg-signal/[0.05] p-4"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                      You&apos;re on the list
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-foreground/90">
                      We onboard in small waves. We&apos;ll email you when the
                      next cohort opens to book a 30-minute session where we
                      calibrate Bonggy on your accounts.
                    </p>
                    <a
                      href={CAL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta relative mt-1 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-signal transition-all duration-200 active:translate-y-[1px]"
                      style={{
                        boxShadow:
                          "0 0 0 1px oklch(0.78 0.13 152 / 35%), 0 0 18px -2px oklch(0.78 0.13 152 / 28%)",
                      }}
                    >
                      <span className="size-1 rounded-full bg-signal" />
                      Skip the wait, book a call
                      <ArrowUpRight weight="bold" className="size-3.5" />
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="hp_field"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="sr-only"
                    />

                    <FormField
                      name="email"
                      type="email"
                      placeholder="Work email"
                      autoComplete="email"
                      required
                    />
                    <FormField
                      name="company"
                      placeholder="Company"
                      autoComplete="organization"
                      required
                    />
                    <RoleSelect
                      value={role}
                      onChange={(v) => {
                        setRole(v);
                        setRoleError(false);
                      }}
                      error={roleError}
                    />
                    <FormField
                      name="teamSize"
                      placeholder="Team size (optional)"
                      autoComplete="off"
                    />

                    <Magnetic pull={0.25} range={120}>
                      <button
                        type="submit"
                        disabled={submitting}
                        className={cn(
                          "group/cta relative mt-1 inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-zinc-950 px-5 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-signal transition-all duration-200 active:translate-y-[1px] disabled:opacity-60",
                        )}
                        style={{
                          boxShadow:
                            "0 0 0 1px color-mix(in oklab, var(--signal) 40%, transparent), inset 0 1px 0 oklch(1 0 0 / 5%), 0 0 22px -4px color-mix(in oklab, var(--signal) 32%, transparent)",
                        }}
                      >
                        {submitting ? (
                          <>
                            <CircleNotch
                              weight="bold"
                              className="size-4 animate-spin"
                            />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <span className="size-1 rounded-full bg-signal" />
                            <span>Request early access</span>
                            <ArrowUpRight
                              weight="bold"
                              className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                            />
                          </>
                        )}
                      </button>
                    </Magnetic>

                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                      No card required · 30-min call · We respond within 48h
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- form bits ---------- */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement>;

function FormField({ className, ...rest }: FieldProps) {
  return (
    <input
      {...rest}
      className={cn(
        "h-11 w-full rounded-md border border-border/80 bg-background/60 px-3.5 text-[14px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-signal/60 focus:ring-2 focus:ring-signal/20",
        className,
      )}
    />
  );
}

function RoleSelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        e.stopPropagation();
      }
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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border bg-background/60 px-3.5 text-left text-[14px] outline-none transition-colors",
          error
            ? "border-destructive/70 ring-2 ring-destructive/20"
            : "border-border/80 hover:border-border focus:border-signal/60 focus:ring-2 focus:ring-signal/20",
          open && !error && "border-signal/60 ring-2 ring-signal/20",
        )}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground/60"}>
          {value || "Your role"}
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

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-md border border-border/80 bg-card p-1 shadow-[0_18px_40px_-12px_oklch(0_0_0_/_60%),inset_0_1px_0_oklch(1_0_0_/_6%)]"
          >
            {ROLES.map((r) => {
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
