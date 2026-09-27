/**
 * Scripted demos (DESIGN.md §8). A demo is a list of steps. Each step applies
 * one action to the demo's state, then holds for `hold` ms of virtual time
 * before the next step. The end state is every action applied in order, which
 * is what reduced motion, skip, and the server render show.
 */
export type DemoStep<A> = { action: A; hold: number };

export type Timeline<A> = DemoStep<A>[];

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** How long a bot "thinks" before a reply of this length. `pace` < 1 for short takes (the hero). */
export const pendingDuration = (reply: string, pace = 1) =>
  Math.round(Math.min(1900 + 22 * words(reply), 3000) * pace);

/** Time to read a message before the script moves on. */
export const readDuration = (text: string) => clamp(420 + 32 * words(text), 700, 1700);

/** Cursor travel time for a distance in px, plus the 80ms press. */
export const cursorDuration = (distance: number) => clamp(1.05 * distance, 320, 850) + 80;

/** A typical cursor hop inside the window, used when scripting holds. */
export const CURSOR_HOP = cursorDuration(520);

/** How long "sending…" shows on an approval before it settles. */
export const SENDING_MS = 1600;

/**
 * Chunked composer typing: 1–3 words every 70–110ms, capped at 2.4s in
 * total. Deterministic (seeded by position) so server and client agree.
 */
export function typingChunks(text: string): { text: string; hold: number }[] {
  const parts = text.split(/(\s+)/);
  const tokens: string[] = [];
  for (let i = 0; i < parts.length; i += 2) tokens.push(parts[i] + (parts[i + 1] ?? ""));
  const chunks: string[] = [];
  let i = 0;
  let n = 0;
  while (i < tokens.length) {
    const size = 1 + ((n * 7 + 3) % 3);
    chunks.push(tokens.slice(0, i + size).join("").trimEnd());
    i += size;
    n += 1;
  }
  const per = Math.min(90, Math.floor(2400 / Math.max(chunks.length, 1)));
  return chunks.map((t, k) => ({ text: t, hold: Math.max(70, per + ((k * 13) % 21) - 10) }));
}

/** Composer typing as steps, given an action builder for partial text. */
export function composeSteps<A>(text: string, toAction: (partial: string) => A): Timeline<A> {
  return typingChunks(text).map((c) => ({ action: toAction(c.text), hold: c.hold }));
}
