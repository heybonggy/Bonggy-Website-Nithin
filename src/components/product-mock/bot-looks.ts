"use client";

import * as React from "react";
import {
  BOT_ACCESSORIES,
  BOT_COLORS,
  BOT_EYES,
  BOT_SHAPES,
  DEFAULT_LOOK,
  type BotLook,
} from "@/components/ui/bot-look";
import { DEFAULT_LOOKS, YOUR_BOT_ID } from "./data";

/**
 * Per-bot looks, saved on this device. The server snapshot is the defaults,
 * so hydration never mismatches; stored looks apply right after. Changing a
 * look updates that bot everywhere on the page at once, and other tabs
 * follow through the storage event.
 */
const KEY = "bonggy:bot-looks:v1";

type Stored = Record<string, Partial<BotLook>>;

const listeners = new Set<() => void>();
let cache: Stored | null = null;

const ALLOWED: { [K in keyof BotLook]: readonly string[] } = {
  color: BOT_COLORS,
  shape: BOT_SHAPES,
  eyes: BOT_EYES,
  accessory: BOT_ACCESSORIES,
};

/** Keep only known bots, known keys and known values. */
function validate(raw: unknown): Stored {
  const out: Stored = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [id, look] of Object.entries(raw as Record<string, unknown>)) {
    if (!(id in DEFAULT_LOOKS) || !look || typeof look !== "object") continue;
    const clean: Partial<BotLook> = {};
    for (const k of Object.keys(ALLOWED) as (keyof BotLook)[]) {
      const v = (look as Record<string, unknown>)[k];
      if (typeof v === "string" && ALLOWED[k].includes(v)) (clean as Record<string, string>)[k] = v;
    }
    if (Object.keys(clean).length) out[id] = clean;
  }
  return out;
}

/** Bots were renamed; looks saved under the old ids carry over. */
const RENAMED: Record<string, string> = {
  "champion-tracker": "boomerang",
  "account-researcher": "dossier",
  "deal-coach": "unstick",
  "brief-writer": "draftsmith",
  "pipeline-watch": "compass",
  "crm-hygiene": "tidy",
  "forecast-prep": "delta",
  "market-modeller": "sweet-spot",
  "campaign-researcher": "echo",
  "content-drafter": "quill",
  "inbound-router": "relay",
};

function migrate(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;
  const out: Record<string, unknown> = {};
  for (const [id, look] of Object.entries(raw as Record<string, unknown>)) {
    const next = RENAMED[id] ?? id;
    // A look saved under the new id wins over a migrated one.
    if (!(next in out) || next === id) out[next] = look;
  }
  return out;
}

function read(): Stored {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    cache = validate(migrate(raw));
    // Persist the migrated keys once, so the old ids disappear.
    if (JSON.stringify(raw) !== JSON.stringify(cache)) localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: Stored) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode: looks last for this page only.
  }
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key !== KEY) return;
  cache = null;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export const defaultLook = (botId: string): BotLook => DEFAULT_LOOKS[botId] ?? DEFAULT_LOOK;

// Memoised per bot so useSyncExternalStore gets a stable snapshot.
const merged = new Map<string, { src: Partial<BotLook> | undefined; look: BotLook }>();
function lookFor(botId: string, stored: Stored): BotLook {
  const src = stored[botId];
  // No saved look: return the very same default object the server snapshot
  // uses, so hydration doesn't force a re-render of every avatar.
  if (!src) return defaultLook(botId);
  const hit = merged.get(botId);
  if (hit && hit.src === src) return hit.look;
  const look = { ...defaultLook(botId), ...src };
  merged.set(botId, { src, look });
  return look;
}

export function useBotLook(botId: string | undefined): BotLook {
  return React.useSyncExternalStore(
    subscribe,
    () => (botId ? lookFor(botId, read()) : DEFAULT_LOOK),
    () => (botId ? defaultLook(botId) : DEFAULT_LOOK),
  );
}

export function setBotLook(botId: string, patch: Partial<BotLook>) {
  const cur = read();
  write({ ...cur, [botId]: { ...cur[botId], ...patch } });
}

export function resetBotLook(botId: string) {
  const next = { ...read() };
  delete next[botId];
  write(next);
}

export function resetAllLooks() {
  write({});
}

/* ------------------------------ your bot -------------------------------- */

/**
 * The visitor's own bot: a name and a purpose, saved on this device next to
 * the looks (its look is stored above under YOUR_BOT_ID). Shared by Make it
 * yours and the agents section's "Your bot" tab.
 */
export type YourBot = { name: string; purpose: string };

export const YOUR_BOT_LIMITS = { name: 16, purpose: 80 } as const;
export const DEFAULT_YOUR_BOT: YourBot = { name: "Your bot", purpose: "" };

const YOURS_KEY = "bonggy:your-bot:v1";
let yoursCache: YourBot | null = null;

function readYours(): YourBot {
  if (yoursCache) return yoursCache;
  try {
    const raw = JSON.parse(localStorage.getItem(YOURS_KEY) || "null") as Partial<YourBot> | null;
    yoursCache = {
      name: typeof raw?.name === "string" ? raw.name.slice(0, YOUR_BOT_LIMITS.name) : DEFAULT_YOUR_BOT.name,
      purpose: typeof raw?.purpose === "string" ? raw.purpose.slice(0, YOUR_BOT_LIMITS.purpose) : "",
    };
  } catch {
    yoursCache = DEFAULT_YOUR_BOT;
  }
  return yoursCache;
}

const yoursListeners = new Set<() => void>();

function onYoursStorage(e: StorageEvent) {
  if (e.key !== YOURS_KEY) return;
  yoursCache = null;
  yoursListeners.forEach((l) => l());
}

function subscribeYours(cb: () => void) {
  yoursListeners.add(cb);
  if (yoursListeners.size === 1) window.addEventListener("storage", onYoursStorage);
  return () => {
    yoursListeners.delete(cb);
    if (yoursListeners.size === 0) window.removeEventListener("storage", onYoursStorage);
  };
}

export function useYourBot(): YourBot {
  return React.useSyncExternalStore(subscribeYours, readYours, () => DEFAULT_YOUR_BOT);
}

/** Current value outside React (e.g. to pick the agents tab's take). */
export const getYourBot = (): YourBot => readYours();

export function setYourBot(patch: Partial<YourBot>) {
  yoursCache = { ...readYours(), ...patch };
  try {
    localStorage.setItem(YOURS_KEY, JSON.stringify(yoursCache));
  } catch {
    // Private mode: lasts for this page only.
  }
  yoursListeners.forEach((l) => l());
}

/** Reset clears the name, the purpose and the look. */
export function resetYourBot() {
  yoursCache = DEFAULT_YOUR_BOT;
  try {
    localStorage.removeItem(YOURS_KEY);
  } catch {
    // ignore
  }
  yoursListeners.forEach((l) => l());
  resetBotLook(YOUR_BOT_ID);
}
