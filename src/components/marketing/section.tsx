import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = Omit<React.ComponentPropsWithoutRef<"section">, "title"> & {
  /** Container width: text-led sections use content (64rem), grids use wide. */
  width?: "content" | "wide";
  /** Wrap the content in a gray surface card (rounded-3xl). */
  card?: boolean;
  containerClassName?: string;
};

/** Page section: section rhythm, gutters and a centred container. */
export function Section({
  width = "wide",
  card = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section {...rest} className={cn("px-4 py-20 sm:px-6 sm:py-28", className)}>
      <div
        className={cn(
          "mx-auto w-full",
          width === "content" ? "max-w-content" : "max-w-wide",
          card && "rounded-3xl bg-surface p-6 sm:px-12 sm:py-10 lg:p-12",
          containerClassName,
        )}
      >
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
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-copy",
        className,
      )}
    >
      {kicker ? <p className="text-ui-sm font-medium text-fg-3">{kicker}</p> : null}
      <h2 className="text-heading text-foreground sm:text-heading-lg">
        {title}
        {muted ? (
          <>
            {" "}
            <span className="text-fg-3">{muted}</span>
          </>
        ) : null}
      </h2>
      {intro ? <p className="max-w-prose text-body text-fg-2 sm:text-body-lg">{intro}</p> : null}
    </div>
  );
}
