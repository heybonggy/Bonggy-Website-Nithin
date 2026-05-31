"use client";

import { motion } from "motion/react";
import { Compass } from "@phosphor-icons/react/dist/ssr";
import { Section } from "./section";
import { SPRING } from "./_motion";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

type RoleContent = {
  id: string;
  label: string;
  badge?: string;
  title: string;
  description: string;
  outcomes: string[];
  imageUrl: string;
};

// Stable, known-good Unsplash photos. Each is a darkly-lit, editorial frame
// that sits well behind the gradient tint we apply on top.
const ROLES: RoleContent[] = [
  {
    id: "sdr",
    label: "SDR / BDR",
    badge: "The beachhead",
    title: "SDR / BDR",
    description:
      "Spend your day in conversations, not in tabs. Walk into every account already knowing the angle. The research and the first draft are done; you review and send.",
    outcomes: [
      "Research — done before the rep opens the tab",
      "First draft — signal-backed, ready to review",
      "Prioritization — top 5 accounts for today, surfaced",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "ae",
    label: "AE",
    title: "Account Executives",
    description:
      "Walk into every call with the account's full context: what changed, who's involved, what to lead with.",
    outcomes: [
      "Stakeholder map — current and historical decision-makers",
      "Trigger timeline — what fired, when, why it matters",
      "Talking points — three opening lines tailored to this call",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: "am",
    label: "AM",
    title: "Account Managers",
    description:
      "Catch renewal risk, expansion signals, and champion job-changes before they become a problem.",
    outcomes: [
      "Renewal-risk score — signal-backed, not just usage data",
      "Expansion windows — surfaced from buying-intent triggers",
      "Champion alerts — when your champion moves teams or companies",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "revops",
    label: "RevOps",
    title: "RevOps",
    description:
      "One sync replaces the export-clean-upload waterfall. Every data point reviewable before the CRM.",
    outcomes: [
      "Single source of truth — no more dedupe spreadsheets",
      "Field-by-field approval — every CRM write is reviewable",
      "Cost-per-field visibility across enrichment providers",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "agencies",
    label: "Agencies",
    title: "Agencies",
    description:
      "Run signal-led outbound across every client from per-client workspaces. Same headcount, more accounts.",
    outcomes: [
      "Per-client workspaces — clean separation of data and brand",
      "Same team, 3× the account coverage",
      "Portfolio-wide pattern sharing — what works for client A informs client B",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: "founders",
    label: "Founders",
    title: "Founders doing their own sales",
    description:
      "Your instinct, systematized. Run the motion an SDR would, without hiring one yet.",
    outcomes: [
      "Run the playbook in your head — but at scale",
      "First-touch quality even when you’re shipping product all day",
      "When you do hire, the system is already in place",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
  },
];

function RolePanel({ role }: { role: RoleContent }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
      {/* Visual — Unsplash photo with editorial tint so it sits in the
          Bonggy palette rather than popping against the dark card. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 md:aspect-[5/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={role.imageUrl}
          alt={role.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/15 to-background/60"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
        />
      </div>

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
      eyebrow="Built for SDRs first · Built for the whole GTM motion"
    >
      <motion.h2
        initial={{ y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={SPRING}
        className="text-display mb-10 max-w-[20ch] text-balance text-[36px] font-medium leading-none tracking-tight sm:text-[44px] md:mb-12 lg:text-[56px]"
      >
        One command centre.{" "}
        <span className="text-muted-foreground/85">
          Every outbound role.
        </span>
      </motion.h2>

      <AnimatedTabs tabs={tabs} defaultTab="sdr" layoutGroupId="use-cases" />
    </Section>
  );
}
