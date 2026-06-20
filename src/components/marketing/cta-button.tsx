"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "signal" | "inverse" | "ghost";
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
 // factory.ai treatment: clean monochrome. White face + dark ink on dark
 // surfaces (the page); a dark `inverse` face for use on LIGHT panels.
 primary: "bg-foreground text-background hover:bg-foreground/90",
 signal: "bg-foreground text-background hover:bg-foreground/90",
 inverse:
 "bg-[oklch(0.14_0.004_280)] text-[oklch(0.98_0_0)] hover:bg-[oklch(0.24_0.004_280)]",
 ghost:
 "border border-border bg-card/40 text-foreground hover:bg-card hover:border-border/80",
  } as const;

  const ringShadow = {
 primary: "0 1px 0 oklch(1 0 0 / 0.5) inset, 0 10px 30px -12px oklch(0 0 0 / 0.7)",
 signal: "0 1px 0 oklch(1 0 0 / 0.5) inset, 0 10px 30px -12px oklch(0 0 0 / 0.7)",
 inverse: "0 10px 30px -12px oklch(0 0 0 / 0.5)",
 ghost: "",
  } as const;

  const inner = (
 <span className="relative z-10 flex items-center gap-2">
 <span>{children}</span>
 <ArrowUpRight
 weight="bold"
 className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
 />
 </span>
  );

  const sharedClasses = cn(base, sizes[size], bases[variant], className);
  const sharedStyle =
 variant === "ghost"
 ? undefined
 : { boxShadow: ringShadow[variant] };

  // External links (the cal.com booking link) open in a new tab so the user
  // never leaves the site — clicking "Strategize" and hitting Back used to
  // restore them mid-page because the custom scroll container breaks native
  // scroll restoration. Internal hrefs keep normal in-tab navigation.
  const isExternal = /^https?:\/\//.test(href);

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
 <Link
 href={href}
 target={isExternal ? "_blank" : undefined}
 rel={isExternal ? "noopener noreferrer" : undefined}
 className={sharedClasses}
 style={sharedStyle}
 >
 {inner}
 </Link>
  );

  if (!magnetic || size === "sm") return element;
  return <Magnetic className="inline-block">{element}</Magnetic>;
}
