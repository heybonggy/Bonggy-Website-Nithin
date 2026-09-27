"use client";

import * as React from "react";
import { BotAvatar, GroupAvatar } from "@/components/ui/mascot";
import { StatusPill } from "@/components/product-mock/status-pill";
import { useAmbientTick } from "@/components/product-mock/ambient";
import { BOTS, TEAM_LIST, type Bot, type StatusKind } from "@/components/product-mock/data";
import { Section, SectionHeader } from "./section";

const TEAM_NAME = { sales: "Sales", revops: "RevOps", marketing: "Marketing" } as const;

/** What each team gets, in one line. */
const TEAM_LINE = {
  sales: "Prep before every call, and a next step on every deal.",
  revops: "A clean pipeline and a forecast you can explain.",
  marketing: "Messages built from what customers say, and leads that reach the right rep.",
} as const;

/** Two real moments per bot; each row alternates between them while in view. */
const MOMENTS: Record<string, [StatusKind, string][]> = {
  "account-researcher": [["running", "researching northwind…"], ["done", "brief ready · 1h ago"]],
  "deal-coach": [["running", "reading 18 open deals…"], ["done", "5 stuck deals flagged · 2m ago"]],
  "brief-writer": [["running", "drafting a follow-up…"], ["held", "1 draft held for you"]],
  "pipeline-watch": [["running", "checking icp fit…"], ["done", "3 accounts off-icp · 2h ago"]],
  "crm-hygiene": [["running", "scanning 212 records…"], ["needs-you", "12 fixes to review"]],
  "forecast-prep": [["scheduled", "thursdays 16:00"], ["running", "comparing this week to last…"]],
  "market-modeller": [["running", "segmenting q3 wins…"], ["done", "mid-market is 40% of wins"]],
  "campaign-researcher": [["running", "reading 24 call notes…"], ["held", "post to #q4-campaign held"]],
  "content-drafter": [["off", "paused by you"], ["scheduled", "next run fri 10:00"]],
  "inbound-router": [["running", "scoring 2 demo requests…"], ["needs-you", "2 leads to route"]],
};

const PILL_LABEL: Partial<Record<StatusKind, string>> = { held: "held" };

function TeamBotRow({ bot, tick, offset }: { bot: Bot; tick: number; offset: number }) {
  const moments = MOMENTS[bot.id] ?? [[bot.status, bot.preview]];
  const [status, line] = moments[(tick + offset) % moments.length];
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-surface-raised p-3 shadow-e1" title={`${bot.name} is a ${bot.role}`}>
      <BotAvatar botId={bot.id} size={36} state={status === "running" ? "working" : status === "needs-you" ? "waiting" : status === "off" ? "drowsy" : "idle"} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-ui font-medium text-foreground">{bot.name}</span>
        <span key={line} className="mt-1 flex animate-label-in items-center gap-2">
          <StatusPill status={status} label={PILL_LABEL[status]} />
          <span className="truncate text-ui-sm text-fg-2">{line}</span>
        </span>
      </span>
    </li>
  );
}

function TeamColumn({ team }: { team: (typeof TEAM_LIST)[number]["id"] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const tick = useAmbientTick(ref, 2600, 1400);
  const bots = BOTS.filter((b) => b.team === team);
  return (
    <div ref={ref} className="reveal flex min-w-0 flex-col gap-4 rounded-3xl bg-surface p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <GroupAvatar botIds={bots.slice(0, 3).map((b) => b.id)} size={28} />
        <h3 className="text-title font-medium text-foreground">{TEAM_NAME[team]}</h3>
      </div>
      <p className="text-ui text-fg-2">{TEAM_LINE[team]}</p>
      <ul className="flex flex-col gap-2">
        {bots.map((b, i) => (
          <TeamBotRow key={b.id} bot={b} tick={tick} offset={i} />
        ))}
      </ul>
    </div>
  );
}

/** #what-we-do: three teams, the bots each one runs, and what they're doing. */
export function TeamsSection() {
  return (
    <Section id="what-we-do" aria-labelledby="teams-title">
      <SectionHeader
        title={<span id="teams-title">One workspace. Three teams.</span>}
        intro="Sales, RevOps and marketing teams each build bots for their own work. Every bot is a modeller, a researcher or a value generator, and every one answers to a revenue goal."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {TEAM_LIST.map((t) => (
          <TeamColumn key={t.id} team={t.id} />
        ))}
      </div>
    </Section>
  );
}
