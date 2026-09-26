"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BuildingOffice,
  ChartBar,
  GearSix,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { AgentRow } from "./agent-row";
import { AgentAvatar, AvatarStack } from "./avatar";
import { USER, type Agent, type Group } from "./data";

export type View = "agents" | "analytics" | "context";

export type SidebarProps = {
  agents: Agent[];
  groups: Group[];
  view: View;
  activeId?: string;
  /** Row to highlight, e.g. one whose preview just changed. */
  highlightId?: string;
  /** Emphasise the "+" button, e.g. while a new agent is being created. */
  newPressed?: boolean;
  onNew?: () => void;
  onSelect?: (id: string) => void;
  onNavigate?: (view: View) => void;
};

const iconBtn =
  "flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60";

/** Full sidebar: search and new agent, agent and group lists, footer links. */
export function Sidebar({
  agents,
  groups,
  view,
  activeId,
  highlightId,
  newPressed = false,
  onNew,
  onSelect,
  onNavigate,
}: SidebarProps) {
  return (
    <nav aria-label="Agents" className="flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-background/60">
      <div className="flex items-center gap-2 p-3">
        <label className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-[12.5px] text-muted-foreground">
          <MagnifyingGlass className="size-3.5 shrink-0" aria-hidden />
          <span className="sr-only">Search agents</span>
          <input
            type="search"
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        <button
          type="button"
          onClick={onNew}
          aria-label="New agent"
          className={cn(iconBtn, newPressed && "border-signal/60 bg-signal/15 text-signal")}
        >
          <Plus weight="bold" className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-1.5">
        <SectionLabel>Agents</SectionLabel>
        <ul className="grid grid-cols-1 gap-0.5">
          <AnimatePresence initial={false}>
            {agents.map((a) => (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              >
                <AgentRow
                  item={a}
                  active={view === "agents" && a.id === activeId}
                  highlight={a.id === highlightId}
                  onSelect={() => onSelect?.(a.id)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <SectionLabel className="mt-4">Groups</SectionLabel>
        <ul className="grid grid-cols-1 gap-0.5">
          {groups.map((g) => (
            <li key={g.id}>
              <AgentRow
                item={g}
                active={view === "agents" && g.id === activeId}
                onSelect={() => onSelect?.(g.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-0.5 border-t border-border p-1.5">
        <NavLink icon={ChartBar} label="Analytics" active={view === "analytics"} onClick={() => onNavigate?.("analytics")} />
        <NavLink icon={BuildingOffice} label="Company context" active={view === "context"} onClick={() => onNavigate?.("context")} />
      </div>
      <div className="flex items-center justify-between border-t border-border px-3 py-2.5">
        <span className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-foreground/[0.08] font-mono text-[10.5px] text-foreground">
            {USER.initials}
          </span>
          <span className="text-[12.5px] text-muted-foreground">{USER.name}</span>
        </span>
        <button type="button" aria-label="Settings" className={cn(iconBtn, "border-transparent")}>
          <GearSix className="size-4" aria-hidden />
        </button>
      </div>
    </nav>
  );
}

/** Compact icon rail for narrow screens: avatars only. */
export function SidebarRail({ agents, groups, activeId, highlightId, newPressed }: SidebarProps) {
  return (
    <nav aria-label="Agents" className="flex h-full w-[52px] shrink-0 flex-col items-center gap-2 border-r border-border bg-background/60 py-3">
      <span className={cn(iconBtn, "size-7", newPressed && "border-signal/60 bg-signal/15 text-signal")}>
        <Plus weight="bold" className="size-3" aria-hidden />
      </span>
      <span className="my-1 h-px w-6 bg-border" />
      {agents.map((a) => (
        <span
          key={a.id}
          className={cn(
            "relative flex size-9 items-center justify-center rounded-lg transition-colors duration-300",
            a.id === activeId && "bg-foreground/[0.06]",
            a.id === highlightId && "bg-signal/[0.1]",
          )}
        >
          <AgentAvatar avatar={a.avatar} size={24} />
          {a.unread ? <span className="absolute right-1 top-1 size-1.5 rounded-full bg-signal" /> : null}
        </span>
      ))}
      {groups.map((g) => (
        <span key={g.id} className="flex size-9 items-center justify-center">
          <AvatarStack members={g.members.slice(0, 2)} more={0} size={14} />
        </span>
      ))}
      <span className="mt-auto flex size-7 items-center justify-center rounded-full bg-foreground/[0.08] font-mono text-[10px] text-foreground">
        {USER.initials}
      </span>
    </nav>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-2.5 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", className)}>
      {children}
    </div>
  );
}

function NavLink({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60",
        active ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className={cn("size-4", active && "text-signal")} aria-hidden />
      {label}
    </button>
  );
}
