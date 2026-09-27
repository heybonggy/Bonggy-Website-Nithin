import * as React from "react";
import { cn } from "@/lib/utils";
import { Rise } from "./entrances";

type SectionProps = Omit<React.ComponentPropsWithoutRef<"section">, "title"> & {
  /** Container width: text-led sections use content (64rem), grids use wide. */
  width?: "content" | "wide";
  /** Wrap the content in a gray surface card (rounded-3xl). */
  card?: boolean;
  /** A full-width surface band instead of a card. */
  band?: boolean;
  /** A bot peeking over the card's top edge (cards only). */
  peek?: React.ReactNode;
  containerClassName?: string;
};

/** Page section: section rhythm, gutters and a centred container. */
export function Section({
  width = "wide",
  card = false,
  band = false,
  peek,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section {...rest} className={cn("px-4 py-20 sm:px-6 sm:py-24", band && "band-fade bg-surface", className)}>
      <div
        className={cn(
          "relative mx-auto w-full",
          width === "content" ? "max-w-content" : "max-w-wide",
          card && "rounded-3xl bg-surface p-6 sm:p-10",
          containerClassName,
        )}
      >
        {card && peek ? (
          // The top ~32px of the bot (down to just below its eyes) shows above
          // the card edge; the rest is hidden behind it.
          <span className="pointer-events-none absolute right-10 top-0 h-8 w-16 -translate-y-full overflow-hidden sm:right-16">
            <span className="pointer-events-auto absolute left-2 top-0">{peek}</span>
          </span>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/**
 * Section heading: H2 with an optional muted second line and an intro.
 * No eyebrows; `kicker` is a quiet sentence-case line when one is needed.
 */
export function SectionHeader({
  title,
  muted,
  intro,
  kicker,
  align = "left",
  className,
}: {
  title: React.ReactNode;
  muted?: React.ReactNode;
  intro?: React.ReactNode;
  kicker?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "mx-auto max-w-2xl items-center text-center"
          : align === "right"
            ? "ml-auto max-w-copy items-end text-right"
            : "max-w-copy",
        className,
      )}
    >
      {kicker ? <p className="text-ui-sm font-medium text-fg-3">{kicker}</p> : null}
      <Rise as="h2" className="text-heading text-foreground sm:text-heading-lg lg:text-heading-xl">
        {title}
        {muted ? (
          <>
            {" "}
            <span className="text-fg-3">{muted}</span>
          </>
        ) : null}
      </Rise>
      {intro ? (
        <Rise as="p" delay={0.08} className="max-w-prose text-body text-fg-2 sm:text-body-lg">
          {intro}
        </Rise>
      ) : null}
    </div>
  );
}
