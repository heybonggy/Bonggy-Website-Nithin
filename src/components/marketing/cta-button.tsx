"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export const CAL_LINK = "https://cal.com/bonggy/30min?overlayCalendar=true";

export type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "soft" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  /** Render a <button> instead of a link (for in-page actions). */
  asButton?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const BASE =
  "group/cta relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors duration-[var(--dur-instant)] active:scale-[.98] disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  primary: "bg-surface-inverse text-fg-inverse hover:bg-surface-inverse/88",
  soft: "bg-surface-2 text-foreground hover:bg-surface-3",
  outline: "hairline-strong bg-transparent text-foreground hover:bg-wash-hover",
  ghost: "text-fg-2 hover:bg-wash-hover hover:text-foreground",
} as const;

const SIZES = {
  sm: "h-8 px-3.5 text-ui-sm",
  md: "h-9 px-4 text-ui",
  lg: "h-11 px-6 text-body",
} as const;

/**
 * Page CTA button (DESIGN.md §7.1). Pill shape, colour-only hover. External
 * links (the cal.com booking link) open in a new tab with a trailing arrow.
 * On touch devices an invisible 44px hit area keeps small sizes tappable.
 */
export function CtaButton({
  href = CAL_LINK,
  variant = "primary",
  size = "md",
  className,
  children = "Book a strategy call",
  asButton = false,
  onClick,
  type = "button",
}: CtaButtonProps) {
  const isExternal = /^https?:\/\//.test(href);
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 hidden size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-coarse:block"
      />
      {children}
      {isExternal && !asButton ? (
        <ArrowUpRight className="size-4" aria-hidden />
      ) : null}
    </>
  );

  if (asButton) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {inner}
    </Link>
  );
}
