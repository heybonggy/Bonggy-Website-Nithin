import * as React from "react";
import { ChartBar, ChatsCircle, FlowArrow, HandPalm, MagnifyingGlass, Stack } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { HumanAvatar } from "@/components/ui/mascot";
import { TEAM_LIST, VIEWER } from "./data";

export type Screen = "bots" | "flows" | "approvals" | "analytics" | "context";

const SCREENS: { id: Screen; label: string; icon: typeof ChatsCircle }[] = [
  { id: "bots", label: "Bots", icon: ChatsCircle },
  { id: "flows", label: "Flows", icon: FlowArrow },
  { id: "approvals", label: "Approvals", icon: HandPalm },
  { id: "analytics", label: "Analytics", icon: ChartBar },
  { id: "context", label: "Context", icon: Stack },
];

/**
 * The product window: title bar with a screen switcher, an optional sidebar
 * and a main pane. Below 640px only the main pane shows. Drawn, not
 * interactive; wrap it in DemoFrame.
 */
export function AppWindow({
  screen,
  title,
  sidebar,
  children,
  className,
}: {
  screen: Screen;
  title?: string;
  /** Sidebar body, usually team groups of BotRows. */
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "@container flex h-[min(560px,80svh)] flex-col overflow-hidden rounded-3xl bg-surface-raised shadow-window lg:h-[620px]",
        className,
      )}
    >
      <div className="flex h-11 shrink-0 items-center gap-3 border-b-[0.5px] border-border-strong px-4">
        <span aria-hidden className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-3 rounded-full bg-[var(--gray-300)]" />
          ))}
        </span>
        <span className="truncate text-ui-sm font-medium text-foreground">{title ?? SCREENS.find((s) => s.id === screen)?.label}</span>
        <span className="ml-auto hidden rounded-full bg-surface-2 p-0.5 @min-[420px]:flex">
          {SCREENS.map((s) => {
            const Icon = s.icon;
            const active = s.id === screen;
            return (
              <span
                key={s.id}
                className={cn(
                  "inline-flex h-6 items-center gap-1 rounded-full px-2 text-caption font-medium",
                  active ? "bg-surface-raised text-foreground shadow-e1" : "text-fg-3",
                )}
              >
                <Icon className="size-3.5" weight={active ? "fill" : "regular"} aria-hidden />
                <span className="hidden @min-[900px]:inline">{s.label}</span>
              </span>
            );
          })}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        {sidebar ? (
          <aside className="hidden w-[264px] shrink-0 flex-col border-r-[0.5px] border-border-strong bg-sidebar @min-[640px]:flex">
            <div className="p-3">
              <span className="flex h-8 items-center gap-2 rounded-md bg-surface-2 px-2.5 text-caption text-fg-3">
                <MagnifyingGlass className="size-3.5" aria-hidden />
                search bots
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden px-2">{sidebar}</div>
            <div className="flex items-center gap-2 border-t-[0.5px] border-border-strong p-3">
              <HumanAvatar initials={VIEWER.initials} size={24} />
              <span className="text-ui-sm text-foreground">{VIEWER.name}</span>
            </div>
          </aside>
        ) : null}
        <div className="relative flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

/** A team heading inside the sidebar. */
export function SidebarTeam({ team, children }: { team: (typeof TEAM_LIST)[number]["id"]; children: React.ReactNode }) {
  const label = TEAM_LIST.find((t) => t.id === team)?.label ?? team;
  return (
    <div className="mb-2">
      <p className="px-2 pb-1 pt-2 text-caption font-medium text-fg-3">{label}</p>
      {children}
    </div>
  );
}
