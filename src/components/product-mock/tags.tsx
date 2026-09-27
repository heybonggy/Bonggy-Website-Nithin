import { LockSimple, Prohibit, Target } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { BotAvatar, type Team } from "@/components/ui/mascot";

/** Team tag: pattern avatar + team name. */
export function TeamTag({ team, className }: { team: Team; className?: string }) {
  return (
    <span className={cn("inline-flex h-5 shrink-0 items-center gap-1 rounded-full bg-background pl-0.5 pr-2 text-caption text-fg-2 hairline", className)}>
      <BotAvatar team={team} size={16} />
      {team}
    </span>
  );
}

/** Goal tag: the revenue goal a flow maps to. */
export function GoalTag({ goal, className }: { goal: string; className?: string }) {
  return (
    <span className={cn("inline-flex h-5 shrink-0 items-center gap-1 rounded-full bg-surface-2 px-2 text-caption text-foreground", className)}>
      <Target className="size-3" aria-hidden />
      {goal}
    </span>
  );
}

/** Hard limit from the user's own instruction, e.g. "never email anyone". */
export function LimitChip({ text, readOnly = false, className }: { text: string; readOnly?: boolean; className?: string }) {
  const Icon = readOnly ? LockSimple : Prohibit;
  return (
    <span className={cn("inline-flex min-h-5 items-center gap-1 rounded-full bg-background px-2 py-0.5 text-caption font-medium text-foreground hairline-strong", className)}>
      <Icon className="size-3 shrink-0" aria-hidden />
      {text}
    </span>
  );
}
