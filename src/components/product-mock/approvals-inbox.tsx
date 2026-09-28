import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/ui/mascot";
import { botById, type Approval } from "./data";
import { StatusPill } from "./status-pill";

const note = (a: Approval) =>
  a.status === "done"
    ? a.kind === "internal"
      ? "(done · internal only)"
      : "(sent after your ok)"
    : a.status === "held"
      ? "(held for you)"
      : null;

/** The approvals list: what's waiting, what ran on its own, what's held. */
export function ApprovalsInbox({
  items,
  selectedId,
  className,
}: {
  items: Approval[];
  selectedId?: string;
  className?: string;
}) {
  return (
    <ul className={cn("@container flex flex-col gap-0.5", className)}>
      {items.map((a) => {
        const bot = botById(a.botId);
        const selected = a.id === selectedId;
        return (
          <li
            key={a.id}
            data-cursor-target={`approval-${a.id}`}
            className={cn(
              // Narrow (phone) lists put the badge under the text so the title
              // gets the full width.
              "relative grid grid-cols-[32px_1fr_auto] items-start gap-x-3 gap-y-2 rounded-md p-3 @max-[420px]:grid-cols-[32px_1fr]",
              selected ? "bg-wash-selected before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-foreground" : "hover:bg-wash-hover",
            )}
          >
            <BotAvatar botId={a.botId} size={32} state={a.status === "needs-you" ? "waiting" : a.status === "done" ? "happy" : "idle"} />
            <span className="min-w-0">
              <span className="block text-ui-sm">
                <span className="font-medium text-foreground">{bot.name}</span>{" "}
                <span className="text-fg-2">{a.action}</span>
                {note(a) ? <span className="text-fg-3"> {note(a)}</span> : null}
              </span>
              <span className="mt-0.5 block text-ui-sm text-fg-3">
                {bot.team} · {a.goal} · {a.age}
              </span>
            </span>
            {a.status === "needs-you" ? (
              <StatusPill status="needs-you" className="@max-[420px]:col-start-2 @max-[420px]:justify-self-start" />
            ) : (
              <span className="hidden gap-1 sm:flex">
                <kbd className="inline-flex size-5 items-center justify-center rounded-xs bg-surface-2 font-sans text-micro text-fg-3 hairline">
                  {a.status === "done" ? "↵" : "e"}
                </kbd>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
