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
 * CTA button , colorful-gradient style (inspired by 21st.dev button-colorful),
 * themed for Bonggy. A dark base with a blurred signal-green → emerald → teal
 * gradient sitting behind it. Opacity ramps up on hover. Sharp corners, mono
 * uppercase labels, factory.ai-adjacent tightness.
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
 "group/cta relative inline-flex items-center justify-center overflow-hidden rounded-md font-mono font-medium uppercase tracking-[0.18em] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-[1px] transition-all duration-200 whitespace-nowrap";

  const sizes = {
 sm: "h-8 px-3 text-[10.5px]",
 md: "h-9 px-4 text-[11px]",
 lg: "h-11 px-5 text-[12px]",
  } as const;

  const bases = {
 // Primary + signal: fixed dark base so the button stays a high-contrast
 // anchor on both themes. Label is explicit white (not text-foreground)
 // because text-foreground would be near-black in light mode and disappear
 // into the dark base.
 primary: "bg-zinc-950 text-white",
 signal: "bg-zinc-950 text-white",
 ghost:
 "border border-border bg-card/40 text-foreground  hover:bg-card hover:border-border/80",
  } as const;

  const gradient = {
 primary:
 "from-emerald-500 via-signal to-teal-400",
 signal: "from-signal via-emerald-400 to-teal-400",
 ghost: "",
  } as const;

  const ringShadow = {
 primary:
 "0 0 0 1px oklch(1 0 0 / 8%), inset 0 1px 0 oklch(1 0 0 / 6%)",
 signal:
 "0 0 0 1px oklch(0.78 0.13 152 / 30%), inset 0 1px 0 oklch(1 0 0 / 6%)",
 ghost: "",
  } as const;

  const inner = (
 <>
 {/* Blurred gradient , opacity ramps up on hover */}
 {variant !== "ghost" && (
 <div
 aria-hidden
 className={cn(
 "absolute inset-0 bg-gradient-to-r blur-md transition-opacity duration-500",
 gradient[variant],
 variant === "signal" ? "opacity-55 group-hover/cta:opacity-90" : "opacity-35 group-hover/cta:opacity-75",
 )}
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
