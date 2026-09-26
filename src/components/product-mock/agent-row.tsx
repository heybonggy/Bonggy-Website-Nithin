import { cn } from "@/lib/utils";
import { AgentAvatar, AvatarStack } from "./avatar";
import type { Agent, Group } from "./data";

type RowProps = {
  active?: boolean;
  /** Briefly highlight the row, e.g. when its preview just changed. */
  highlight?: boolean;
  onSelect?: () => void;
};

/** Sidebar row for one agent or a group: avatar, name, last-message preview. */
export function AgentRow({
  item,
  active = false,
  highlight = false,
  onSelect,
}: RowProps & { item: Agent | Group }) {
  const isGroup = "members" in item;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/row flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60",
        active ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.04]",
        highlight && "bg-signal/[0.08]",
      )}
    >
      <span className="flex w-7 shrink-0 justify-center">
        {isGroup ? (
          <AvatarStack members={item.members.slice(0, 2)} more={0} size={18} />
        ) : (
          <AgentAvatar avatar={item.avatar} size={28} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="flex min-w-0 items-baseline gap-1.5">
            <span className="truncate text-[13px] text-foreground">{item.name}</span>
            {isGroup && item.more > 0 ? (
              <span className="shrink-0 font-mono text-[10px] text-muted-foreground">+{item.more}</span>
            ) : null}
          </span>
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{item.time}</span>
        </span>
        <span className="mt-0.5 flex items-center gap-2">
          <span
            className={cn(
              "min-w-0 truncate text-[12px] transition-colors duration-300",
              highlight ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.preview}
          </span>
          {item.unread ? (
            <span className="ml-auto size-1.5 shrink-0 rounded-full bg-signal">
              <span className="sr-only">Unread</span>
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}
