"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CaretDown, Check, Warning, X as XIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { EARLY_ACCESS_ROLES } from "@/lib/early-access";
import { TypingDots } from "@/components/ui/typing-dots";
import { SPRING } from "./_motion";
import { CAL_LINK } from "./cta-button";

type Props = {
  trigger?: React.ReactElement;
  /** Optional controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ROLES = EARLY_ACCESS_ROLES;

/**
 * Custom modal, not @base-ui/react Dialog. That implementation was
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
  const roleButtonRef = React.useRef<HTMLButtonElement>(null);

  // Reset form state whenever the modal opens. Adjusted during render rather
  // than in an effect, so the reset lands in the same render as the open.
  const [prevOpen, setPrevOpen] = React.useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setSubmitted(false);
      setRoleError(false);
    }
  }

  // Lock page scroll while open; Escape closes.
  React.useEffect(() => {
    if (!open) return;
    const target = document.body;
    const prevOverflow = target?.style.overflow ?? "";
    if (target) target.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      if (target) target.style.overflow = prevOverflow;
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
      roleButtonRef.current?.focus();
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
            {/* Backdrop: closes on click */}
            <div
              className="absolute inset-0 bg-overlay"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Panel: stops propagation so internal clicks never hit the backdrop */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ea-title"
              initial={{ y: 12, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 8, scale: 0.97 }}
              transition={SPRING.layout}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-surface-raised shadow-e4"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-wash-hover hover:text-foreground"
              >
                <XIcon className="size-5" aria-hidden />
              </button>

              <div className="flex flex-col gap-5 p-7 sm:p-8">
                <div className="flex flex-col gap-2">
                  <h2
                    id="ea-title"
                    className="pr-10 text-title text-foreground"
                  >
                    Get early access
                  </h2>
                  <p className="text-ui text-fg-2">
                    Bonggy is the agent workspace for sales, RevOps and
                    marketing teams. Describe the work in a sentence, and a bot
                    turns it into a flow you approve. We&apos;re onboarding in
                    small waves so every team gets set up properly.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={SPRING.layout}
                    className="flex flex-col gap-3 rounded-xl bg-surface p-4"
                  >
                    <div className="flex items-center gap-2 text-ui font-medium text-foreground">
                      <span className="flex size-5 items-center justify-center rounded-full bg-surface-inverse text-fg-inverse">
                        <Check weight="bold" className="size-3" aria-hidden />
                      </span>
                      You&apos;re on the list
                    </div>
                    <p className="text-ui text-fg-2">
                      We&apos;ll email you when the next wave opens, to book a
                      30-minute session where we map your first flow on real
                      work.
                    </p>
                    <a
                      href={CAL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-surface-2 px-5 text-ui font-medium text-foreground transition-colors hover:bg-surface-3 active:scale-[.98]"
                    >
                      Skip the wait, book a call
                      <ArrowUpRight className="size-4" aria-hidden />
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
                      label="Work email"
                      name="email"
                      type="email"
                      placeholder="Work email"
                      autoComplete="email"
                      required
                    />
                    <FormField
                      label="Company"
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
                      buttonRef={roleButtonRef}
                    />
                    <FormField
                      label="Team size (optional)"
                      name="teamSize"
                      placeholder="Team size (optional)"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-surface-inverse px-6 text-body font-medium text-fg-inverse transition-colors hover:bg-surface-inverse/88 active:scale-[.98] disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <span>Sending</span>
                          <TypingDots label="Sending" />
                        </>
                      ) : (
                        "Request early access"
                      )}
                    </button>

                    <p className="text-center text-caption text-fg-3">
                      No card required · 30-min call · We reply within 48 hours
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

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Visually hidden label; the placeholder alone isn't an accessible name. */
  label: string;
};

function FormField({ label, className, ...rest }: FieldProps) {
  const id = React.useId();
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...rest}
        id={id}
        className={cn(
          "h-11 w-full rounded-md border border-input bg-background px-3.5 text-ui text-foreground placeholder:text-fg-3 outline-none transition-colors focus:border-border-strong focus-visible:outline-2 focus-visible:outline-ring",
          className,
        )}
      />
    </>
  );
}

function RoleSelect({
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
      <span id={labelId} className="sr-only">
        Your role
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
          "flex h-11 w-full items-center justify-between rounded-md border bg-background px-3.5 text-left text-ui transition-colors",
          error ? "border-danger" : "border-input hover:border-border-strong",
          open && !error && "border-border-strong",
        )}
      >
        <span
          id={valueId}
          className={value ? "text-foreground" : "text-fg-3"}
        >
          {value || "Your role"}
        </span>
        <CaretDown className={cn("size-4 text-fg-3 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-caption text-danger"
        >
          <Warning className="size-3.5" aria-hidden />
          Pick your role.
        </p>
      ) : null}

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-lg bg-surface-raised p-1 shadow-e2"
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
                      "flex min-h-10 w-full items-center justify-between rounded-md px-3 text-left text-ui transition-colors",
                      active ? "bg-wash-selected font-medium text-foreground" : "text-foreground hover:bg-wash-hover",
                    )}
                  >
                    <span>{r}</span>
                    {active && <Check className="size-4" aria-hidden />}
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
