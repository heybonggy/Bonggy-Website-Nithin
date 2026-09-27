"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BotAvatar, type Team } from "@/components/ui/mascot";
import { botColorVars } from "@/components/ui/bot-look";
import { useBotLook } from "./bot-looks";

/** `id` is the bot id; the active pill takes that bot's colour. */
export type PillTab = { id: string; label: string; team: Team };

/**
 * Pill tabs with a roving tabindex: ←/→ move, Home/End jump. Selection
 * follows focus. `idPrefix` wires each tab to its panel (`${idPrefix}-panel`).
 */
export function PillTabs({
  tabs,
  value,
  onChange,
  idPrefix,
  label,
  className,
}: {
  tabs: PillTab[];
  value: string;
  onChange: (id: string) => void;
  idPrefix: string;
  label: string;
  className?: string;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const colors = useTabColors(tabs.map((t) => t.id));
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((t, i) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${t.id}`}
            aria-selected={active}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            style={active ? botColorVars(colors[i]) : undefined}
            className={cn(
              "relative inline-flex h-8 items-center gap-1.5 rounded-full pl-[5px] pr-3 text-ui-sm font-medium transition-colors duration-[var(--dur-quick)]",
              "after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-['']",
              active
                ? "bg-[var(--bot-tint)] text-[var(--bot-ink)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--bot-ink)_28%,transparent)]"
                : "bg-surface-2 text-foreground hover:bg-surface-3",
            )}
          >
            <BotAvatar botId={t.id} size={22} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/** Current colours of up to four tab bots (a fixed number of hook calls). */
function useTabColors(ids: string[]) {
  const a = useBotLook(ids[0]).color;
  const b = useBotLook(ids[1]).color;
  const c = useBotLook(ids[2]).color;
  const d = useBotLook(ids[3]).color;
  const e = useBotLook(ids[4]).color;
  return [a, b, c, d, e];
}

/** A phone: 10px ink bezel, 320×620, for single-chat demos. */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[320px] rounded-4xl bg-surface-inverse p-2.5 shadow-window", className)}>
      <div className="relative flex h-[620px] max-h-[80svh] flex-col overflow-hidden rounded-[22px] bg-surface-raised">
        <span aria-hidden className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-surface-inverse" />
        {children}
      </div>
    </div>
  );
}
