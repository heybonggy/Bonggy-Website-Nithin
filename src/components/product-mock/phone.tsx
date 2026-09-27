"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { BatteryFull, CaretLeft, WifiHigh } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import type { CharacterState } from "@/components/ui/bot-character";
import { EASE, usePrefersReducedMotion } from "@/components/marketing/_motion";
import type { StatusKind } from "./data";
import { StatusPill } from "./status-pill";
import { ChatComposer } from "./chat-composer";

/**
 * A phone at the same standard as the desktop AppWindow: 44px device radius,
 * a thin bezel (ink in light, graphite in dark), a dynamic island, a 9:41
 * status bar and a home indicator, floating on the hatched plate.
 */
export function PhoneFrame({
  children,
  className,
  plate = true,
}: {
  children: React.ReactNode;
  className?: string;
  plate?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[340px]", className)}>
      {plate ? (
        <div
          aria-hidden
          className="parallax hatch-faint absolute -inset-x-2 -top-4 bottom-[-40px] rounded-[40px] bg-surface sm:-inset-x-6 sm:-top-6"
          style={{ maskImage: "linear-gradient(#000 60%, transparent)", WebkitMaskImage: "linear-gradient(#000 60%, transparent)" }}
        />
      ) : null}
      <div className="relative rounded-[44px] bg-[#0f0f0f] p-[7px] shadow-e3 ring-1 ring-black/10 dark:bg-[#2b2b2b] dark:ring-white/10">
        <div className="relative flex h-[640px] max-h-[82svh] flex-col overflow-hidden rounded-[37px] bg-surface-raised">
          {/* status bar + dynamic island */}
          <div className="relative flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[12px] font-semibold text-foreground">
            <span className="tabular">9:41</span>
            <span aria-hidden className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#0f0f0f]" />
            <span className="flex items-center gap-1">
              <span aria-hidden className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[3px] rounded-[1px] bg-foreground" style={{ height: h }} />
                ))}
              </span>
              <WifiHigh weight="bold" className="size-3.5" aria-hidden />
              <BatteryFull weight="fill" className="size-5" aria-hidden />
            </span>
          </div>
          {children}
          {/* home indicator */}
          <span aria-hidden className="absolute bottom-2 left-1/2 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-foreground/80" />
        </div>
      </div>
    </div>
  );
}

/** The chat screen's header: back chevron, the bot's live character, name, status. */
export function PhoneChatHeader({
  botId,
  title,
  subtitle,
  status,
  statusLabel,
  character = "idle",
  avatarLayoutId,
  right,
}: {
  avatarLayoutId?: string;
  botId?: string;
  title: string;
  subtitle?: string;
  status?: StatusKind;
  statusLabel?: string;
  character?: CharacterState;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 border-b-[0.5px] border-border-strong px-3 pb-2.5 pt-1">
      <CaretLeft weight="bold" className="size-5 shrink-0 text-fg-2" aria-hidden />
      {botId ? (
        <motion.span layoutId={avatarLayoutId} className="inline-flex" transition={{ type: "spring", stiffness: 340, damping: 32, mass: 0.9 }}>
          <BotAvatar botId={botId} size={30} state={character} />
        </motion.span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-foreground">{title}</span>
        {status ? (
          <span className="mt-0.5 flex items-center gap-1.5">
            <StatusPill status={status} label={statusLabel} />
          </span>
        ) : subtitle ? (
          <span className="block truncate text-[12px] text-fg-3">{subtitle}</span>
        ) : null}
      </span>
      {right}
    </div>
  );
}

/**
 * A scrolling transcript that fills from the top and brings each new
 * message into view, like a real chat.
 */
export function PhoneTranscript({
  children,
  deps,
  follow = "bottom",
  className,
}: {
  children: React.ReactNode;
  deps: unknown;
  /** "top": scroll each new message near the top (when only the top of the phone is on screen). */
  follow?: "bottom" | "top";
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const scroll = React.useCallback(
    (smooth: boolean) => {
      const el = ref.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const behavior: ScrollBehavior = smooth && !reduced ? "smooth" : "auto";
      if (follow === "bottom") {
        el.scrollTo({ top: el.scrollHeight, behavior });
        return;
      }
      const last = inner.lastElementChild;
      if (!last) return;
      const offset = last.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop;
      el.scrollTo({ top: Math.max(0, offset - 16), behavior });
    },
    [follow, reduced],
  );

  // New message: follow it.
  React.useLayoutEffect(() => scroll(true), [deps, scroll]);

  // Content that grows after mount (avatars, fonts, entrances) keeps the
  // newest message in view too, so nothing ends up below the fold.
  React.useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(() => scroll(false));
    ro.observe(inner);
    return () => ro.disconnect();
  }, [scroll]);

  return (
    <div ref={ref} className={cn("fade-t flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-3 pb-3 pt-4 text-[14px]", className)}>
      <div ref={innerRef} className="flex shrink-0 flex-col gap-[inherit]">
        {children}
      </div>
      {follow === "top" ? <div aria-hidden className="h-[70%] shrink-0" /> : null}
    </div>
  );
}

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

/** A soft keyboard that slides up while the demo types. Decorative. */
function Keyboard() {
  return (
    <div className="flex flex-col gap-[7px] bg-surface-2 px-1.5 pb-7 pt-2">
      {ROWS.map((row, i) => (
        <div key={row} className="flex justify-center gap-[5px]" style={{ paddingInline: i * 9 }}>
          {row.split("").map((k) => (
            <span key={k} className="flex h-[34px] flex-1 items-center justify-center rounded-[5px] bg-surface-raised text-[13px] text-foreground shadow-[0_1px_0_rgb(0_0_0/0.18)]">
              {k}
            </span>
          ))}
        </div>
      ))}
      <div className="flex gap-[5px] px-1">
        <span className="h-[34px] w-16 rounded-[5px] bg-surface-3" />
        <span className="h-[34px] flex-1 rounded-[5px] bg-surface-raised shadow-[0_1px_0_rgb(0_0_0/0.18)]" />
        <span className="h-[34px] w-16 rounded-[5px] bg-surface-3" />
      </div>
    </div>
  );
}

/** Composer pinned at the bottom; the keyboard slides up under it while typing. */
export function PhoneComposer({ value = "", caret = false, keyboard = false }: { value?: string; caret?: boolean; keyboard?: boolean }) {
  return (
    <div className="shrink-0 border-t-[0.5px] border-border bg-surface-raised">
      <div className={cn("px-2.5 pt-2", keyboard ? "pb-2" : "pb-7")}>
        <ChatComposer value={value} caret={caret} className="shadow-none" />
      </div>
      <AnimatePresence initial={false}>
        {keyboard ? (
          <motion.div
            key="kb"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.32, ease: EASE.outExpo }}
            className="overflow-hidden"
          >
            <Keyboard />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
