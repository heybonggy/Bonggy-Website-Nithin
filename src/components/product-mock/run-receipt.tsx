import { Check, Minus, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export type ReceiptItem = { verb: string; text: string; result?: "done" | "skipped" | "failed" };

/** What a run did, line by line, and what it didn't do. */
export function RunReceipt({
  title,
  items,
  footer,
  className,
}: {
  title?: string;
  items: ReceiptItem[];
  footer?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-bubble-bot p-3", className)}>
      {title ? <p className="mb-2 text-caption text-fg-3">{title}</p> : null}
      <ul className="flex flex-col gap-1.5">
        {items.map((it, i) => {
          const Icon = it.result === "skipped" ? Minus : it.result === "failed" ? X : Check;
          return (
            <li key={i} className="flex items-start gap-2 text-ui-sm text-foreground">
              <span
                className={cn(
                  "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full",
                  it.result === "failed" ? "hatch hairline-strong" : it.result === "skipped" ? "hairline-strong" : "bg-surface-inverse text-fg-inverse",
                )}
              >
                <Icon weight="bold" className="size-2.5 animate-check-in" style={{ animationDelay: `${i * 90}ms` }} aria-hidden />
              </span>
              <span>
                <strong className="font-semibold">{it.verb}</strong> {it.text}
              </span>
            </li>
          );
        })}
      </ul>
      {footer ? <p className="mt-2.5 border-t border-border pt-2 text-ui-sm font-medium text-foreground">{footer}</p> : null}
    </div>
  );
}
