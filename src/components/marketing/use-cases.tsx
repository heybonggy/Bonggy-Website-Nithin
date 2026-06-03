"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Compass,
  Warning,
  TrendUp,
  CurrencyDollar,
  Check,
  Clock,
  X as XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { cn } from "@/lib/utils";

type RoleContent = {
  id: string;
  label: string;
  badge?: string;
  title: string;
  description: string;
  outcomes: string[];
  visual: React.ReactNode;
};

/* ───────────────────────── Mock helpers ───────────────────────── */

function MockShell({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-[320px] flex-col gap-4 rounded-xl border border-border/60 bg-background/50 p-5 sm:p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
        {eyebrow}
      </div>
      <div className="flex flex-1 flex-col gap-3">{children}</div>
    </div>
  );
}

function MetaRow({
  active,
  primary,
  meta,
  status,
}: {
  active?: boolean;
  primary: string;
  meta: string;
  status: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-3.5 py-2.5 text-[12.5px]",
        active
          ? "border-signal/40 bg-signal/[0.06]"
          : "border-border/60 bg-background/40",
      )}
    >
      <span
        className={cn(
          "mt-1.5 size-1.5 flex-none rounded-full",
          active ? "bg-signal pulse-signal" : "bg-muted-foreground/50",
        )}
      />
      <div className="flex flex-1 flex-col gap-0.5 leading-snug">
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium text-foreground">{primary}</span>
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.18em]",
              active ? "text-signal" : "text-muted-foreground/70",
            )}
          >
            {status}
          </span>
        </div>
        <span className="text-[11.5px] text-muted-foreground">{meta}</span>
      </div>
    </div>
  );
}

/* ───────────────────────── Per-role visuals ───────────────────────── */

const SdrMock = (
  <MockShell eyebrow="Today · 5 ready">
    <MetaRow
      active
      primary="Atlas Corp"
      meta="VP Eng hired · 14d ago"
      status="Draft ready"
    />
    <MetaRow
      primary="Helix Health"
      meta="Series B · 3d ago"
      status="47% intent"
    />
    <MetaRow
      primary="Northwind Labs"
      meta="New CTO · 7d ago"
      status="62% intent"
    />
    <div className="mt-auto pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
      + 2 more in queue
    </div>
  </MockShell>
);

const AeMock = (
  <MockShell eyebrow="Meeting prep · in 12 min">
    <div className="flex flex-col gap-1">
      <div className="text-display text-[20px] font-medium tracking-tight">
        Atlas Corp
      </div>
      <div className="text-[12.5px] text-muted-foreground">
        Sarah Voss · VP Engineering
      </div>
    </div>
    <div className="mt-2 flex flex-col gap-2">
      {[
        { kind: "Open with", body: "Series B + 14 new engineering reqs" },
        { kind: "Acknowledge", body: "Sarah moved from Stripe in April" },
        { kind: "Don't", body: "Pricing, too early in cycle" },
      ].map((t) => (
        <div
          key={t.kind}
          className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 px-3.5 py-2.5"
        >
          <span className="mt-1 size-1.5 flex-none rounded-full bg-signal" />
          <div className="flex-1 text-[12.5px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              {t.kind}
            </span>
            <div className="mt-0.5 text-foreground">{t.body}</div>
          </div>
        </div>
      ))}
    </div>
  </MockShell>
);

const AmMock = (
  <MockShell eyebrow="Account health · Northwind Labs">
    <div className="flex items-baseline gap-3">
      <div className="text-display text-[44px] font-medium leading-none tracking-tight text-signal">
        78
      </div>
      <div className="text-[12.5px] text-muted-foreground">
        Stable · 28d to renewal
      </div>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
      <div className="h-full w-[78%] rounded-full bg-signal/70" />
    </div>
    <div className="mt-2 flex flex-col gap-2">
      {[
        { Icon: Warning, label: "Champion job-change · Sarah left" },
        { Icon: TrendUp, label: "Intent spike · last 7 days" },
        { Icon: CurrencyDollar, label: "Expansion window opening" },
      ].map(({ Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-3.5 py-2.5 text-[12.5px]"
        >
          <Icon weight="regular" className="size-3.5 text-signal" />
          <span className="text-foreground">{label}</span>
        </div>
      ))}
    </div>
  </MockShell>
);

const SmMock = (
  <MockShell eyebrow="Pipeline · Q4 · 4 reps">
    {[
      { rep: "Sarah V.", amount: "$124k", width: 92, flag: null },
      { rep: "Mike P.",  amount: "$89k",  width: 64, flag: null },
      { rep: "Lin H.",   amount: "$156k", width: 100, flag: null },
      { rep: "Tom J.",   amount: "$32k",  width: 22, flag: "coach" },
    ].map((r) => (
      <div key={r.rep} className="flex items-center gap-3">
        <span className="w-[68px] flex-none text-[12.5px] font-medium text-foreground">
          {r.rep}
        </span>
        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-border/60">
          <div
            className={cn(
              "h-full rounded-full",
              r.flag ? "bg-destructive/60" : "bg-signal/70",
            )}
            style={{ width: `${r.width}%` }}
          />
        </div>
        <span className="w-[44px] flex-none text-right font-mono text-[11px] tabular-nums text-muted-foreground">
          {r.amount}
        </span>
        {r.flag && (
          <span className="rounded bg-destructive/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-destructive">
            {r.flag}
          </span>
        )}
      </div>
    ))}
    <div className="mt-auto rounded-lg border border-border/60 bg-background/40 px-3.5 py-2.5 text-[11.5px] text-muted-foreground">
      <span className="text-foreground">Tom J.</span> is stuck on 3 deals.
      Angle review surfaced.
    </div>
  </MockShell>
);

const RevOpsMock = (
  <MockShell eyebrow="Enrichment waterfall">
    <div className="flex items-center gap-2 text-[11px]">
      <span className="rounded border border-border/60 bg-background/40 px-2 py-1 font-mono uppercase tracking-[0.18em] text-muted-foreground">
        Apollo
      </span>
      <span className="text-muted-foreground/50">→</span>
      <span className="rounded border border-signal/40 bg-signal/[0.06] px-2 py-1 font-mono uppercase tracking-[0.18em] text-signal">
        Bonggy
      </span>
      <span className="text-muted-foreground/50">→</span>
      <span className="rounded border border-border/60 bg-background/40 px-2 py-1 font-mono uppercase tracking-[0.18em] text-muted-foreground">
        Salesforce
      </span>
    </div>
    <div className="mt-2 flex flex-col gap-2">
      {[
        { Icon: Check,   color: "text-signal",          label: "Title",  meta: "12 accts" },
        { Icon: Check,   color: "text-signal",          label: "Email",  meta: "12 accts" },
        { Icon: Clock,   color: "text-amber-400",       label: "Phone",  meta: "3 awaiting review" },
        { Icon: XIcon,   color: "text-destructive",     label: "Domain", meta: "1 invalid" },
      ].map(({ Icon, color, label, meta }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-3.5 py-2.5 text-[12.5px]"
        >
          <Icon weight="bold" className={cn("size-3.5", color)} />
          <span className="flex-1 text-foreground">{label}</span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {meta}
          </span>
        </div>
      ))}
    </div>
  </MockShell>
);

const AgenciesMock = (
  <MockShell eyebrow="Client workspaces · 3 active">
    {[
      { name: "Acme Co",      accts: 240, status: "Live",   active: true  },
      { name: "Helix Health", accts: 180, status: "Paused", active: false },
      { name: "Northwind",    accts: 320, status: "Live",   active: false },
    ].map((c) => (
      <MetaRow
        key={c.name}
        active={c.active}
        primary={c.name}
        meta={`${c.accts} accounts`}
        status={c.status}
      />
    ))}
    <div className="mt-auto rounded-lg border border-border/60 bg-background/40 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      Portfolio · 740 accounts · 1 team
    </div>
  </MockShell>
);

const FoundersMock = (
  <MockShell eyebrow="Solo motion · this week">
    <div className="grid grid-cols-3 gap-3">
      {[
        { num: "12", label: "Sequences" },
        { num: "4",  label: "Meetings" },
        { num: "0",  label: "Hrs spent\nresearching" },
      ].map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-1 rounded-lg border border-border/60 bg-background/40 px-3 py-4"
        >
          <div className="text-display text-[28px] font-medium leading-none tracking-tight text-signal">
            {s.num}
          </div>
          <div className="whitespace-pre-line text-[11px] text-muted-foreground">
            {s.label}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-auto flex items-center gap-3 rounded-lg border border-signal/30 bg-signal/[0.06] px-3.5 py-2.5">
      <span className="size-1.5 flex-none rounded-full bg-signal pulse-signal" />
      <span className="text-[12.5px] text-foreground">
        Equivalent output to one SDR, without the hire.
      </span>
    </div>
  </MockShell>
);

/* ───────────────────────── Role data ───────────────────────── */

const ROLES: RoleContent[] = [
  {
    id: "sdr",
    label: "SDR / BDR",
    badge: "The beachhead",
    title: "SDR / BDR",
    description:
      "Spend your day in conversations, not in tabs. Walk into every account already knowing the angle. The research and the first draft are done; you review and send.",
    outcomes: [
      "Research, done before the rep opens the tab",
      "First draft, signal-backed and ready to review",
      "Prioritization, top 5 accounts for today",
    ],
    visual: SdrMock,
  },
  {
    id: "ae",
    label: "AE",
    title: "Account Executives",
    description:
      "Walk into every call with the account's full context: what changed, who's involved, what to lead with.",
    outcomes: [
      "Stakeholder map of current and historical decision-makers",
      "Trigger timeline. What fired, when, why it matters",
      "Three opening lines tailored to this call",
    ],
    visual: AeMock,
  },
  {
    id: "am",
    label: "AM",
    title: "Account Managers",
    description:
      "Catch renewal risk, expansion signals, and champion job-changes before they become a problem.",
    outcomes: [
      "Renewal-risk score backed by signal, not just usage data",
      "Expansion windows, surfaced from buying-intent triggers",
      "Champion alerts when your champion moves teams or companies",
    ],
    visual: AmMock,
  },
  {
    id: "sm",
    label: "Sales Manager",
    title: "Sales Managers",
    description:
      "Coach on strategy, not on “did you research this account.” The research is done.",
    outcomes: [
      "Pipeline reviews backed by signals, not gut feels",
      "Team-wide visibility into which angles are working",
      "Time back for the conversation that actually moves the deal",
    ],
    visual: SmMock,
  },
  {
    id: "revops",
    label: "RevOps",
    title: "RevOps",
    description:
      "One sync replaces the export-clean-upload waterfall. Every data point reviewable before the CRM.",
    outcomes: [
      "Single source of truth. No more dedupe spreadsheets",
      "Field-by-field approval. Every CRM write is reviewable",
      "Cost-per-field visibility across enrichment providers",
    ],
    visual: RevOpsMock,
  },
  {
    id: "agencies",
    label: "Agencies",
    title: "Agencies",
    description:
      "Run signal-led outbound across every client from per-client workspaces. Same headcount, more accounts.",
    outcomes: [
      "Per-client workspaces with clean separation of data and brand",
      "Same team, 3× the account coverage",
      "Portfolio-wide pattern sharing. What works for client A informs client B",
    ],
    visual: AgenciesMock,
  },
  {
    id: "founders",
    label: "Founders",
    title: "Founders doing their own sales",
    description:
      "Your instinct, systematized. Run the motion an SDR would, without hiring one yet.",
    outcomes: [
      "Run the playbook in your head, but at scale",
      "First-touch quality even when you’re shipping product all day",
      "When you do hire, the system is already in place",
    ],
    visual: FoundersMock,
  },
];

/* ───────────────────────── Panel + section ───────────────────────── */

function RolePanel({ role }: { role: RoleContent }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
      {/* Visual — small inline product mock instead of a stock photo */}
      <div className="flex">{role.visual}</div>

      {/* Copy */}
      <div className="flex flex-col gap-5 md:gap-6">
        {role.badge && (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            <Compass weight="fill" className="size-3" />
            {role.badge}
          </div>
        )}
        <h3 className="text-display text-balance text-[28px] font-medium leading-tight tracking-tight sm:text-[32px] lg:text-[38px]">
          {role.title}
        </h3>
        <p className="text-[15.5px] leading-relaxed text-muted-foreground">
          {role.description}
        </p>
        <div className="mt-1 flex flex-col gap-2.5">
          {role.outcomes.map((line) => (
            <div
              key={line}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-[13.5px]"
            >
              <span className="mt-1.5 size-1.5 flex-none rounded-full bg-signal" />
              <span className="text-foreground/90">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UseCases() {
  const tabs = ROLES.map((r) => ({
    id: r.id,
    label: r.label,
    content: <RolePanel role={r} />,
  }));

  return (
    <Section
      id="use-cases"
      eyebrow="An agency for every outbound role"
    >
      <motion.h2
        initial={{ y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="text-display mb-10 max-w-[20ch] text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] md:mb-12 lg:text-[56px]"
      >
        One agency.{" "}
        <span className="text-muted-foreground/85">
          Every seat at the table.
        </span>
      </motion.h2>

      <AnimatedTabs tabs={tabs} defaultTab="sdr" layoutGroupId="use-cases" />
    </Section>
  );
}
