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
import { CUSTOMISABLE_BOTS, DEFAULT_LOOKS, YOUR_BOT_ID, botById, type Bot } from "@/components/product-mock/data";
import {
  YOUR_BOT_LIMITS,
  resetBotLook,
  resetYourBot,
  setBotLook,
  setYourBot,
  useBotLook,
  useYourBot,
} from "@/components/product-mock/bot-looks";
import { TypedText } from "@/components/ui/typed-text";
import { Confetti } from "@/components/ui/sparkle";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import { Section, SectionHeader } from "./section";
import { usePrefersReducedMotion } from "./_motion";
import { CAL_LINK } from "./cta-button";
import { bookingUrlWith } from "./cta-composer";

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

type Mode = "ours" | "yours";

/** What a bot says after a change, by what changed. Lowercase bot voice. */
const REPLIES: { [K in keyof BotLook]: Record<BotLook[K], string> } = {
  color: {
    graphite: "went graphite. very serious.",
    coral: "went coral. warm and ready.",
    amber: "went amber. glowing a bit.",
    lime: "went lime. zesty.",
    teal: "went teal. calm and on it.",
    sky: "went sky blue. clear skies.",
    violet: "went violet. feels a bit royal.",
    pink: "went pink. feels right.",
  },
  shape: {
    pebble: "pebble shape. smooth.",
    round: "round now. rolling with it.",
    squircle: "squircle. sharp but friendly.",
    capsule: "capsule. streamlined.",
    blob: "blob mode. flexible.",
  },
  eyes: {
    pill: "classic eyes. back to basics.",
    dots: "dot eyes. seeing everything.",
    visor: "visor on. very focused.",
    round: "big eyes. taking it all in.",
    arcs: "happy eyes. can you tell?",
  },
  accessory: {
    none: "no accessories. keeping it simple.",
    antenna: "antenna up. picking up signals.",
    headset: "headset on. ready for calls.",
    beanie: "beanie on. cosy and working.",
    glasses: "glasses on. reading the fine print.",
  },
};

/** `value`, once it has stopped changing for `ms`. */
function useSettled<T>(value: T, ms: number): T {
  const [settled, setSettled] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setSettled(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return settled;
}

/**
 * [ Our bots | Your bot ✨ ]: a two-option radiogroup with a sliding thumb.
 * Arrow keys move and select. The ✨ bursts the first time Your bot is picked.
 */
function ModeToggle({ value, onChange }: { value: Mode; onChange: (m: Mode) => void }) {
  const reduced = usePrefersReducedMotion();
  const [burst, setBurst] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const options: { id: Mode; label: React.ReactNode; text: string }[] = [
    { id: "ours", label: "Our bots", text: "Our bots" },
    {
      id: "yours",
      text: "Your bot",
      label: (
        <>
          Your bot
          <span aria-hidden className="relative ml-1 inline-block">
            ✨{burst > 0 && !reduced ? <Confetti key={burst} className="-inset-2" /> : null}
          </span>
        </>
      ),
    },
  ];
  const pick = (m: Mode) => {
    if (m === "yours" && value !== "yours" && burst === 0) setBurst(1);
    onChange(m);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next: Mode = value === "ours" ? "yours" : "ours";
    pick(next);
    refs.current[next === "ours" ? 0 : 1]?.focus();
  };
  return (
    <div role="radiogroup" aria-label="Bots to customise" className="relative grid w-full max-w-sm grid-cols-2 rounded-full bg-surface-2 p-1">
      <motion.span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-surface-inverse shadow-e1"
        initial={false}
        animate={{ x: value === "yours" ? "100%" : "0%" }}
        transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.25, bounce: 0.2 }}
      />
      {options.map((o, i) => {
        const selected = o.id === value;
        return (
          <button
            key={o.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={o.text}
            tabIndex={selected ? 0 : -1}
            onClick={() => pick(o.id)}
            onKeyDown={onKeyDown}
            className={cn(
              "relative z-10 inline-flex min-h-11 items-center justify-center rounded-full px-4 text-ui-sm font-medium transition-colors duration-200",
              selected ? "text-fg-inverse" : "text-fg-2 hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** A labelled one-line field with a character count. */
function Field({
  label,
  value,
  placeholder,
  max,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  max: number;
  onChange: (v: string) => void;
}) {
  const id = React.useId();
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-ui-sm font-medium text-fg-2">
        {label}
        <span className="tabular text-caption font-normal text-fg-3" aria-hidden>
          {value.length}/{max}
        </span>
      </label>
      <input
        id={id}
        type="text"
        value={value}
        maxLength={max}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3.5 text-ui text-foreground outline-none transition-colors placeholder:text-fg-3 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
      />
    </div>
  );
}

/** #make-it-yours: pick a colour, a shape, eyes and an accessory per bot, or build your own. */
export function MakeItYours() {
  const [mode, setMode] = React.useState<Mode>("ours");
  const yours = mode === "yours";
  const [ourId, setOurId] = React.useState(CUSTOMISABLE_BOTS[0]);
  const botId = yours ? YOUR_BOT_ID : ourId;
  const look = useBotLook(botId);
  const mine = useYourBot();
  // The preview follows the fields once typing pauses (400ms), not per key.
  const settledName = useSettled(mine.name, 400);
  const settledPurpose = useSettled(mine.purpose, 400);
  const yourName = settledName.trim() || "Your bot";

  const bot: Bot = yours
    ? {
        ...botById("boomerang"),
        id: YOUR_BOT_ID,
        name: yourName,
        description: settledPurpose.trim() || "No purpose yet. Tell it what to do.",
        status: "done",
      }
    : botById(ourId);

  const [announce, setAnnounce] = React.useState("");
  // The last change (per bot), for the reply and to retype the description.
  const [last, setLast] = React.useState<{ botId: string; key: keyof BotLook; value: string; n: number } | null>(null);
  const changed = last?.botId === botId ? last : null;
  const select = (id: string) => {
    setOurId(id);
    setAnnounce(`editing ${botById(id).name}`);
  };
  const [preview, setPreview] = React.useState<CharacterState>("idle");
  const excitedTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The teams section's rows preselect a bot.
  React.useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id in DEFAULT_LOOKS && id !== YOUR_BOT_ID) {
        setMode("ours");
        select(id);
      }
    };
    window.addEventListener(CUSTOMISE_EVENT, on);
    return () => window.removeEventListener(CUSTOMISE_EVENT, on);
  }, []);

  React.useEffect(() => () => clearTimeout(excitedTimer.current), []);

  const change = <K extends keyof BotLook>(key: K, value: BotLook[K]) => {
    setBotLook(botId, { [key]: value } as Partial<BotLook>);
    const labels = LOOK_LABELS[key] as Record<string, string>;
    setAnnounce(`${bot.name} is now ${labels[value].toLowerCase()}`);
    setLast((l) => ({ botId, key, value, n: (l?.n ?? 0) + 1 }));
    setPreview("excited");
    clearTimeout(excitedTimer.current);
    excitedTimer.current = setTimeout(() => setPreview("idle"), 1200);
  };

  const reset = () => {
    if (yours) {
      resetYourBot();
      setAnnounce("your bot is back to a blank start");
    } else {
      resetBotLook(ourId);
      setAnnounce(`${bot.name} is back to its default look`);
    }
    setLast(null);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setAnnounce(m === "yours" ? `editing ${yourName}` : `editing ${botById(ourId).name}`);
  };

  // Any bot can be customised; one opened from elsewhere joins the tabs.
  const tabIds = CUSTOMISABLE_BOTS.includes(ourId) ? CUSTOMISABLE_BOTS : [...CUSTOMISABLE_BOTS, ourId];
  const tabs = tabIds.map((id) => {
    const b = botById(id);
    return { id, label: b.name, team: b.team };
  });

  const chip = (selected: boolean) =>
    cn(
      "inline-flex min-h-11 items-center gap-2 rounded-full pl-1.5 pr-3.5 text-ui-sm font-medium transition-colors",
      selected ? "bg-surface-inverse text-fg-inverse" : "bg-background text-foreground hairline hover:bg-surface-2",
    );

  const voiceName = bot.name.toLowerCase();
  const reply = changed
    ? (REPLIES[changed.key] as Record<string, string>)[changed.value]
    : yours
      ? `hi. i'm ${voiceName}. tell me what to do and i'll get to work.`
      : "pick a colour, a shape or a face.";
  const purpose = settledPurpose.trim();

  return (
    <Section id="make-it-yours" card aria-labelledby="make-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-7">
          <SectionHeader
            title={<span id="make-title">Make it yours.</span>}
            intro="Pick a colour, a shape and a face. Your bots look like yours everywhere they show up."
          />
          <div className="flex flex-col gap-4">
            <ModeToggle value={mode} onChange={switchMode} />
            {yours ? (
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <Field
                  label="Name"
                  value={mine.name}
                  placeholder="Name your bot"
                  max={YOUR_BOT_LIMITS.name}
                  onChange={(name) => setYourBot({ name })}
                />
                <Field
                  label="Purpose"
                  value={mine.purpose}
                  placeholder="What should it do?"
                  max={YOUR_BOT_LIMITS.purpose}
                  onChange={(p) => setYourBot({ purpose: p })}
                />
              </div>
            ) : (
              <PillTabs tabs={tabs} value={ourId} onChange={select} idPrefix="customise" label="Bot to customise" />
            )}
          </div>
          <div
            id="customise-panel"
            {...(yours ? { role: "group", "aria-label": `Look for ${yourName}` } : { role: "tabpanel", "aria-labelledby": `customise-tab-${ourId}` })}
            className="flex flex-col gap-6"
          >
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
                onClick={reset}
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

        <div className="flex min-w-0 flex-col gap-4">
          <div className="hatch-faint flex flex-col items-center gap-3 rounded-3xl bg-background px-6 py-10 hairline">
            <BotAvatar botId={botId} size={160} state={preview} interactive />
            <p className="mt-2 max-w-full break-words text-center text-title font-medium text-foreground">{bot.name}</p>
            {yours ? (
              <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-background px-2 text-caption text-fg-2 hairline">yours</span>
            ) : (
              <TeamTag team={bot.team} />
            )}
            {/* Two lines reserved, so switching bots never moves the card. */}
            <p className="min-h-[2lh] max-w-[40ch] text-center text-ui-sm text-fg-2">
              <TypedText key={`${botId}:${changed?.n ?? 0}`} text={bot.description} />
            </p>
          </div>
          <div aria-hidden inert className="flex flex-col gap-3 rounded-3xl bg-surface-raised p-4 hairline">
            <BotRow bot={bot} active status="done" preview={changed ? "new look saved" : `editing ${voiceName}`} />
            <BotBubble botId={botId} name={voiceName} time="now" text={reply} typingDotsMs={500} textKey={`${botId}:${changed?.n ?? 0}:${voiceName}`} />
          </div>
          {yours ? (
            <a
              href={purpose ? bookingUrlWith(purpose) : CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1 self-center rounded-full px-3 text-center text-ui-sm font-medium text-fg-2 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <span className="break-words">Build {yourName} for real on a strategy call</span>
              <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
