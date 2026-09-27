"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import {
  BOT_ACCESSORIES,
  BOT_COLORS,
  BOT_EYES,
  BOT_SHAPES,
  BotFace,
  LOOK_LABELS,
  botColorVars,
  type BotLook,
} from "@/components/ui/bot-look";
import type { CharacterState } from "@/components/ui/bot-character";
import { BotBubble } from "@/components/product-mock/chat";
import { BotRow } from "@/components/product-mock/bot-row";
import { PillTabs } from "@/components/product-mock/team-tabs";
import { TeamTag } from "@/components/product-mock/tags";
import { CUSTOMISABLE_BOTS, botById } from "@/components/product-mock/data";
import { resetBotLook, setBotLook, useBotLook } from "@/components/product-mock/bot-looks";
import { Section, SectionHeader } from "./section";

/** Fired by the hero's "customise" chip with the bot id to preselect. */
export const CUSTOMISE_EVENT = "bonggy:customise";

/** A radiogroup with roving focus; arrows move and select. */
function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  renderOption,
  className,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  renderOption: (v: T, selected: boolean) => React.ReactNode;
  className?: string;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + options.length) % options.length;
    onChange(options[next]);
    refs.current[next]?.focus();
  };
  const labelId = React.useId();
  return (
    <div>
      <p id={labelId} className="mb-2 text-ui-sm font-medium text-fg-2">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className={cn("flex flex-wrap gap-2", className)}>
        {options.map((o, i) => {
          const selected = o === value;
          return (
            <button
              key={o}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(o)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="rounded-full"
            >
              {renderOption(o, selected)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** #make-it-yours: pick a colour, a shape, eyes and an accessory per bot. */
export function MakeItYours() {
  const [botId, setBotId] = React.useState(CUSTOMISABLE_BOTS[0]);
  const bot = botById(botId);
  const look = useBotLook(botId);
  const [announce, setAnnounce] = React.useState("");
  const [preview, setPreview] = React.useState<CharacterState>("idle");
  const excitedTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The hero's "customise" chip preselects a bot.
  React.useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (CUSTOMISABLE_BOTS.includes(id)) setBotId(id);
    };
    window.addEventListener(CUSTOMISE_EVENT, on);
    return () => window.removeEventListener(CUSTOMISE_EVENT, on);
  }, []);

  React.useEffect(() => () => clearTimeout(excitedTimer.current), []);

  const change = <K extends keyof BotLook>(key: K, value: BotLook[K]) => {
    setBotLook(botId, { [key]: value } as Partial<BotLook>);
    const labels = LOOK_LABELS[key] as Record<string, string>;
    setAnnounce(`${bot.name} is now ${labels[value].toLowerCase()}`);
    setPreview("excited");
    clearTimeout(excitedTimer.current);
    excitedTimer.current = setTimeout(() => setPreview("idle"), 1200);
  };

  const tabs = CUSTOMISABLE_BOTS.map((id) => {
    const b = botById(id);
    return { id, label: b.name, team: b.team };
  });

  const chip = (selected: boolean) =>
    cn(
      "inline-flex min-h-11 items-center gap-2 rounded-full pl-1.5 pr-3.5 text-ui-sm font-medium transition-colors",
      selected ? "bg-surface-inverse text-fg-inverse" : "bg-background text-foreground hairline hover:bg-surface-2",
    );

  return (
    <Section id="make-it-yours" card aria-labelledby="make-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-7">
          <SectionHeader
            title={<span id="make-title">Make it yours.</span>}
            intro="Pick a colour, a shape and a face. Your bots look like yours everywhere they show up."
          />
          <PillTabs tabs={tabs} value={botId} onChange={setBotId} idPrefix="customise" label="Bot to customise" />
          <div id="customise-panel" role="tabpanel" aria-labelledby={`customise-tab-${botId}`} className="flex flex-col gap-6">
            <OptionGroup
              label="Colour"
              options={BOT_COLORS}
              value={look.color}
              onChange={(v) => change("color", v)}
              renderOption={(c, selected) => (
                <span className="relative inline-flex size-11 items-center justify-center" aria-label={LOOK_LABELS.color[c]}>
                  <span
                    className={cn(
                      "size-7 rounded-full bg-[var(--bot-disc)] shadow-[inset_0_0_0_1px_var(--bot-ring)]",
                      selected && "ring-2 ring-foreground ring-offset-2 ring-offset-surface",
                    )}
                    style={botColorVars(c)}
                  />
                </span>
              )}
            />
            <OptionGroup
              label="Shape"
              options={BOT_SHAPES}
              value={look.shape}
              onChange={(v) => change("shape", v)}
              renderOption={(o, selected) => (
                <span className={chip(selected)}>
                  <span className="size-8">
                    <BotFace look={{ ...look, shape: o, accessory: "none" }} size={32} />
                  </span>
                  {LOOK_LABELS.shape[o]}
                </span>
              )}
            />
            <OptionGroup
              label="Eyes"
              options={BOT_EYES}
              value={look.eyes}
              onChange={(v) => change("eyes", v)}
              renderOption={(o, selected) => (
                <span className={chip(selected)}>
                  <span className="size-8">
                    <BotFace look={{ ...look, eyes: o, accessory: "none" }} size={32} />
                  </span>
                  {LOOK_LABELS.eyes[o]}
                </span>
              )}
            />
            <OptionGroup
              label="Accessory"
              options={BOT_ACCESSORIES}
              value={look.accessory}
              onChange={(v) => change("accessory", v)}
              renderOption={(o, selected) => (
                <span className={chip(selected)}>
                  <span className="size-8 p-0.5">
                    <BotFace look={{ ...look, accessory: o }} size={28} />
                  </span>
                  {LOOK_LABELS.accessory[o]}
                </span>
              )}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  resetBotLook(botId);
                  setAnnounce(`${bot.name} is back to its default look`);
                }}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-ui font-medium text-foreground hover:bg-wash-hover"
              >
                Reset
              </button>
              <span className="text-caption text-fg-3">saved on this device</span>
            </div>
            <p aria-live="polite" className="sr-only">
              {announce}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="hatch-faint flex flex-col items-center gap-3 rounded-3xl bg-background px-6 py-10 hairline">
            <BotAvatar botId={botId} size={160} state={preview} interactive />
            <p className="mt-2 text-title font-medium text-foreground">{bot.name}</p>
            <TeamTag team={bot.team} />
            <p className="text-caption text-fg-3">tap it</p>
          </div>
          <div aria-hidden inert className="flex flex-col gap-3 rounded-3xl bg-surface-raised p-4 hairline">
            <BotRow bot={bot} active status="done" preview="looking sharp" />
            <BotBubble botId={botId} name={bot.name.toLowerCase()} time="now" text="new look saved. nothing else changed." />
          </div>
        </div>
      </div>
    </Section>
  );
}
