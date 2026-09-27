import { ArrowUp, Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * The chat composer, drawn (not a real input). `value` shows scripted typing;
 * empty shows the placeholder with a blinking caret when `caret` is set.
 */
export function ChatComposer({
  value = "",
  caret = false,
  sending = false,
  placeholder = "tell a bot what to do, in your own words",
  className,
}: {
  value?: string;
  caret?: boolean;
  sending?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-2 rounded-xl border-[0.5px] border-border-strong bg-surface-raised/80 p-2 shadow-e2 backdrop-blur-[20px]",
        className,
      )}
    >
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-fg-3">
        <Plus className="size-4" aria-hidden />
      </span>
      <p className={cn("min-h-7 min-w-0 flex-1 py-1 text-[14px] leading-5", !value && "truncate")}>
        {value ? <span className="text-foreground">{value}</span> : <span className="text-fg-3">{placeholder}</span>}
        {caret || value ? (
          <span aria-hidden className="ml-px inline-block h-4 w-px translate-y-[3px] animate-caret bg-foreground" />
        ) : null}
      </p>
      <span
        data-cursor-target="send"
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-[var(--dur-quick)]",
          value || sending ? "bg-surface-inverse text-fg-inverse" : "bg-surface-2 text-fg-3",
        )}
      >
        <ArrowUp className="size-4" weight="bold" aria-hidden />
      </span>
    </div>
  );
}
