"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SPRING } from "@/components/marketing/_motion";

/**
 * Flow on/off switch: 30×18 track, 14px knob. Pass `onChange` to make it
 * interactive (role=switch); without it, it is a static indicator.
 */
export function OnOffSwitch({
  on,
  onChange,
  label,
  className,
}: {
  on: boolean;
  onChange?: (on: boolean) => void;
  label?: string;
  className?: string;
}) {
  const track = (
    <span
      className={cn(
        "relative inline-flex h-[18px] w-[30px] shrink-0 rounded-full transition-colors duration-[var(--dur-quick)]",
        on ? "bg-surface-inverse" : "bg-wash-active",
      )}
    >
      <motion.span
        className={cn("absolute top-0.5 size-3.5 rounded-full shadow-knob", on ? "bg-fg-inverse" : "bg-[#ffffff] dark:bg-fg-2")}
        initial={false}
        animate={{ x: on ? 14 : 2 }}
        transition={SPRING.switch}
      />
    </span>
  );
  const text = <span className="text-caption text-fg-3">{on ? "on" : "off"}</span>;
  if (!onChange) {
    return (
      <span className={cn("inline-flex items-center gap-1.5", className)}>
        {text}
        {track}
      </span>
    );
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn("inline-flex min-h-8 items-center gap-1.5 rounded-full", className)}
    >
      {text}
      {track}
    </button>
  );
}
