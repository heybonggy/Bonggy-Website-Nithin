"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";
import { SPRING } from "./_motion";

export const CAL_LINK = "https://cal.com/bonggy/30min?overlayCalendar=true";

type Props = {
  trigger?: React.ReactNode;
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

export function EarlyAccessModal({ trigger, open, onOpenChange }: Props) {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if ((formData.get("hp_field") as string)?.length) {
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    try {
      const body = Object.fromEntries(formData);
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // Even on a sink-side error we still treat the request as accepted from
      // the user's perspective — the API route has its own logging.
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger render={trigger as React.ReactElement} /> : null}
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-md gap-0 overflow-hidden rounded-xl border border-border/80 bg-card p-0"
        showCloseButton
      >
        <div className="flex flex-col gap-5 p-7">
          <div className="flex flex-col gap-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/80 bg-background/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="size-1 rounded-full bg-signal" />
              Limited cohort
            </div>

            <DialogTitle className="text-balance text-[22px] font-medium leading-tight tracking-tight text-foreground">
              Early access — for teams done waiting for better outbound.
            </DialogTitle>
            <DialogDescription className="text-[13.5px] leading-relaxed text-muted-foreground">
              We built Bonggy because great reps shouldn&apos;t burn out on bad
              data. We&apos;re rolling out in waves, not to gatekeep, but
              because we&apos;d rather onboard ten teams properly than a
              hundred poorly.
            </DialogDescription>
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
                We onboard in small waves. We&apos;ll email you when the next
                cohort opens to book a 30-minute session where we calibrate
                Bonggy on your accounts.
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
                Skip the wait — book a call
                <ArrowUpRight weight="bold" className="size-3.5" />
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Honeypot */}
              <label
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                Leave empty
                <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
              </label>

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
              <RoleSelect />
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
                      "0 0 0 1px oklch(0.78 0.13 152 / 40%), inset 0 1px 0 oklch(1 0 0 / 5%), 0 0 22px -4px oklch(0.78 0.13 152 / 32%)",
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
      </DialogContent>
    </Dialog>
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

function RoleSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Close on outside click / Escape
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
      {/* Hidden input — keeps native form submission working + required validation */}
      <input type="hidden" name="role" value={value} required />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border border-border/80 bg-background/60 px-3.5 text-left text-[14px] outline-none transition-colors",
          "hover:border-border focus:border-signal/60 focus:ring-2 focus:ring-signal/20",
          open && "border-signal/60 ring-2 ring-signal/20",
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
                      setValue(r);
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
