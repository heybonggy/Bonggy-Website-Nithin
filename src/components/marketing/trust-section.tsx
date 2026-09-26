"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUUpLeft,
  Check,
  ClipboardText,
  LockKey,
  ShieldCheck,
  UserCheck,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { SPRING_BOUNCE, usePrefersReducedMotion } from "./_motion";

const POINTS = [
  {
    Icon: UserCheck,
    title: "Nothing goes out without approval.",
    body: "Every message, brief or CRM update an agent proposes waits for someone on your team. Approved drafts go out from the rep's connected account or get pushed to your own email or sequencer.",
  },
  {
    Icon: LockKey,
    title: "Agents only use the permissions you connect.",
    body: "You choose which tools each agent can reach and what it's allowed to do there.",
  },
  {
    // TODO(security): confirm the product keeps a per-agent audit log
    // (drafts, edits, approvals, sends, and who approved) before launch.
    Icon: ClipboardText,
    title: "A full log of what each agent did.",
    body: "Every draft, edit, approval and send is recorded against the agent and the person who approved it.",
  },
  {
    // TODO(security): confirm this statement with engineering/legal. Keep the
    // title wording exactly as approved.
    Icon: ShieldCheck,
    title: "No training on your data.",
    body: "Your data isn't used to train shared models.",
  },
];

type Status = "pending" | "approved" | "returned";

const QUEUE = [
  { id: "q1", agent: "Brief Writer", item: "Account brief · Northwind Freight" },
  { id: "q2", agent: "Account Researcher", item: "CRM update · 2 new stakeholders at Helix Health" },
  { id: "q3", agent: "Renewal Scout", item: "Email draft · renewal check-in with Atlas Corp" },
];

export function TrustSection() {
  return (
    <Section id="trust" eyebrow="Human in the loop">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16">
        <div>
          <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
            Bots draft.{" "}
            <span className="text-muted-foreground/85">You decide.</span>
          </h2>
          <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-muted-foreground">
            Agents do the research and the first draft. People own the send,
            the relationship and the call.
          </p>

          <ul className="mt-10 space-y-6">
            {POINTS.map(({ Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/80 bg-card/60 text-signal">
                  <Icon weight="regular" className="size-4" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[16px] font-normal tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-[56ch] text-[14.5px] leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/security"
            className="group mt-10 inline-flex items-center gap-2 rounded font-mono text-[11px] uppercase tracking-[0.16em] text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            How we handle security
            <ArrowRight
              weight="bold"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <ApprovalQueue />
      </div>
    </Section>
  );
}

/** Interactive example queue: the visitor makes every decision. No loop. */
function ApprovalQueue() {
  const reduce = usePrefersReducedMotion();
  const [status, setStatus] = React.useState<Record<string, Status>>({});
  const pending = QUEUE.filter((q) => !status[q.id]).length;

  const decide = (id: string, s: Status) => setStatus((prev) => ({ ...prev, [id]: s }));

  return (
    <figure
      aria-label="Example approval queue"
      className="terminal-corners relative flex flex-col self-start rounded-lg border border-border/80 bg-card/60"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Approval queue
        </span>
        <span className="rounded-[3px] border border-border/80 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
          Example · try it
        </span>
      </div>

      <ul className="space-y-2 p-4">
        {QUEUE.map((q) => {
          const s = status[q.id] ?? "pending";
          return (
            <li
              key={q.id}
              className={cn(
                "rounded-md border p-3.5 transition-colors duration-300",
                s === "approved"
                  ? "border-signal/35 bg-signal/[0.05]"
                  : "border-border/70 bg-background/50",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {q.agent}
                  </div>
                  <div className="mt-1 text-[14px] leading-snug text-foreground">{q.item}</div>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={s}
                    initial={reduce ? false : { scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING_BOUNCE}
                    className={cn(
                      "shrink-0 rounded-[3px] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em]",
                      s === "pending" && "border border-border/80 text-foreground",
                      s === "approved" && "bg-signal/15 text-signal",
                      s === "returned" && "border border-border/60 text-muted-foreground",
                    )}
                  >
                    {s === "pending" ? "Needs approval" : s === "approved" ? "Approved" : "Sent back"}
                  </motion.span>
                </AnimatePresence>
              </div>

              {s === "pending" ? (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => decide(q.id, "approved")}
                    aria-label={`Approve: ${q.item}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md bg-signal px-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-signal-foreground transition-colors hover:bg-signal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <Check weight="bold" className="size-3" aria-hidden />
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(q.id, "returned")}
                    aria-label={`Send back: ${q.item}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border/80 px-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                  >
                    <ArrowUUpLeft weight="bold" className="size-3" aria-hidden />
                    Send back
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-[12.5px] text-muted-foreground">
                  {s === "approved"
                    ? "Approved by you. Ready to go out from the rep's account."
                    : "Returned to the agent with your notes. Nothing was sent."}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-border/60 px-5 py-3">
        <p className="text-[12px] text-muted-foreground" aria-live="polite">
          {pending > 0
            ? `${pending} waiting on a person. Nothing goes out on its own.`
            : "Queue clear. Every decision was yours."}
        </p>
        {pending === 0 ? (
          <button
            type="button"
            onClick={() => setStatus({})}
            className="shrink-0 rounded font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            Reset example
          </button>
        ) : null}
      </div>
    </figure>
  );
}
