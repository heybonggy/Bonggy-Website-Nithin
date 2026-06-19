"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "signal" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
  children?: React.ReactNode;
  /** When true, renders as a real <button> for use inside Dialog triggers / forms */
  asButton?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

/**
 * CTA button , high-contrast solid fill themed for Bonggy. Primary + signal
 * variants use a bright signal-green face with dark ink, so the button reads
 * as the clear primary action on both the dark and light page surfaces (the
 * old dark-on-dark glass button measured ~2:1 against the background). A soft
 * signal glow keeps the premium feel. Mono uppercase labels, tight tracking.
 */
export const CAL_LINK = "https://cal.com/bonggy/30min?overlayCalendar=true";

export function CtaButton({
  href = CAL_LINK,
  variant = "primary",
  size = "lg",
  className,
  magnetic = true,
  children = "Strategize",
  asButton = false,
  onClick,
  type = "button",
}: CtaButtonProps) {
  const base =
 "group/cta relative inline-flex items-center justify-center overflow-hidden rounded-md font-mono font-semibold uppercase tracking-[0.18em] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-[1px] transition-all duration-200 whitespace-nowrap";

  const sizes = {
 sm: "h-8 px-3.5 text-[10.5px]",
 md: "h-9 px-5 text-[11px]",
 lg: "h-11 px-6 text-[12px]",
  } as const;

  const bases = {
 // Primary + signal: bright signal-green face with dark signal-foreground
 // ink. High contrast against both page backgrounds AND text-on-button.
 primary: "bg-signal text-signal-foreground hover:bg-signal/90",
 signal: "bg-signal text-signal-foreground hover:bg-signal/90",
 ghost:
 "border border-border bg-card/40 text-foreground hover:bg-card hover:border-border/80",
  } as const;

  const ringShadow = {
 primary:
 "0 0 0 1px oklch(0.78 0.13 152 / 35%), 0 8px 28px -6px oklch(0.78 0.13 152 / 45%)",
 signal:
 "0 0 0 1px oklch(0.78 0.13 152 / 35%), 0 8px 28px -6px oklch(0.78 0.13 152 / 45%)",
 ghost: "",
  } as const;

  const inner = (
 <>
 {/* Sheen sweep on hover for the premium feel */}
 {variant !== "ghost" && (
 <div
 aria-hidden
 className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
 />
 )}
 {/* Content */}
 <span className="relative z-10 flex items-center gap-2">
 <span>{children}</span>
 <ArrowUpRight
 weight="bold"
 className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
 />
 </span>
 </>
  );

  const sharedClasses = cn(base, sizes[size], bases[variant], className);
  const sharedStyle =
 variant === "ghost"
 ? undefined
 : { boxShadow: ringShadow[variant] };

  const element = asButton ? (
 <button
 type={type}
 onClick={onClick}
 className={sharedClasses}
 style={sharedStyle}
 >
 {inner}
 </button>
  ) : (
 <Link href={href} className={sharedClasses} style={sharedStyle}>
 {inner}
 </Link>
  );

  if (!magnetic || size === "sm") return element;
  return <Magnetic className="inline-block">{element}</Magnetic>;
}
