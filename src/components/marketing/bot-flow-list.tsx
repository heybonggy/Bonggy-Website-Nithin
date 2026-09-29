import { LimitChip } from "@/components/product-mock";
import { BotFace } from "@/components/ui/bot-look";
import { EXAMPLE_FLOW_NOTE, FLOW_PART_LABELS, flowPartText, type CatalogBot } from "@/content/bots";
import { cn } from "@/lib/utils";

/**
 * The six parts of a bot's example flow, as a description list.
 *
 * Server-rendered and static: these pages are read by people and crawlers, so
 * the avatars don't run the character engine and nothing here needs the client.
 */
export function ExampleFlow({ bot, className }: { bot: CatalogBot; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-surface p-5 sm:p-6", className)}>
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[7rem_1fr]">
        {FLOW_PART_LABELS.map((part) => (
          <div key={part.key} className="contents">
            <dt className="text-ui-sm font-medium text-fg-3">{part.label}</dt>
            <dd className="text-ui text-foreground">{flowPartText(bot.exampleFlow, part.key)}</dd>
          </div>
        ))}
        <dt className="text-ui-sm font-medium text-fg-3">Hard limit</dt>
        <dd>
          <LimitChip text={bot.exampleFlow.limit.toLowerCase()} readOnly />
        </dd>
      </dl>
      <p className="mt-5 text-caption text-fg-3">{EXAMPLE_FLOW_NOTE}</p>
    </div>
  );
}

/** A bot's avatar at a fixed size, with no character engine behind it. */
export function StaticBotAvatar({ bot, size }: { bot: CatalogBot; size: number }) {
  return (
    <span className="block shrink-0" style={{ width: size, height: size }} aria-hidden>
      <BotFace look={bot.look} size={size} />
    </span>
  );
}
