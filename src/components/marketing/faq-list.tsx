import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/**
 * Terminal-styled accordion shared by the homepage FAQ and /faq: signal
 * numerals, dotted rules, and a bordered +/× toggle that turns signal-green
 * on open. `headingLevel` keeps heading order right on each page.
 */
export function FaqList({
  items,
  headingLevel = "h2",
  openFirst = true,
}: {
  items: FaqItem[];
  headingLevel?: "h2" | "h3";
  openFirst?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <div className="border-y border-border/50">
      {items.map((item, i) => (
        <details
          key={item.q}
          open={openFirst && i === 0}
          className={cn("group/q border-border/40 px-1", i > 0 && "border-t")}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 list-none [&::-webkit-details-marker]:hidden lg:py-7">
            <div className="flex items-baseline gap-4 sm:gap-5">
              <span className="font-mono text-[11px] tabular-nums text-signal/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Heading className="text-[17px] font-medium tracking-tight text-foreground transition-colors group-hover/q:text-foreground sm:text-[19px]">
                {item.q}
              </Heading>
            </div>
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-[5px] border border-border/70 font-mono text-[14px] leading-none text-muted-foreground transition-all duration-200 group-open/q:rotate-45 group-open/q:border-signal/50 group-open/q:text-signal"
            >
              +
            </span>
          </summary>
          <p className="max-w-[70ch] pb-7 text-[15px] leading-relaxed text-muted-foreground sm:pl-[42px]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
