"use client";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarRail, type SidebarProps } from "./sidebar";

/**
 * The app shell every screen shares: sidebar (an icon rail below md), a top
 * bar, and the main pane. Screens only swap `header` and `children`.
 */
export function AppShell({
  sidebar,
  header,
  children,
  className,
}: {
  sidebar: SidebarProps;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full min-h-0 bg-background text-foreground", className)}>
      <div className="hidden h-full md:block">
        <Sidebar {...sidebar} />
      </div>
      <div className="h-full md:hidden">
        <SidebarRail {...sidebar} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-4 sm:px-5">
          {header}
        </header>
        {/* A div, not <main>: the shell is also embedded in marketing pages
            that have their own main landmark. The app wraps it in <main>. */}
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

/** Top-bar content: optional leading visual, a title with subtitle, trailing slot. */
export function TopBar({
  leading,
  title,
  subtitle,
  trailing,
}: {
  leading?: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-w-0 items-center gap-2.5">
        {leading}
        <div className="flex min-w-0 items-baseline gap-2">
          <h2 className="truncate text-[13.5px] font-medium text-foreground">{title}</h2>
          {subtitle ? (
            <span className="hidden truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground sm:inline">
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
      {trailing ? <div className="flex shrink-0 items-center gap-2">{trailing}</div> : null}
    </>
  );
}

/**
 * Subtle window frame for showing a screen on the marketing site. `label`
 * sits in the title strip (e.g. "Product preview · example data").
 */
export function WindowFrame({
  label,
  path,
  children,
  className,
}: {
  label: string;
  path?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="flex h-9 shrink-0 items-center justify-between gap-3 border-b border-border px-3.5">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[10.5px] text-muted-foreground">
          <span className="size-1.5 shrink-0 rounded-full bg-signal" />
          <span className="truncate">bonggy{path ? ` / ${path}` : ""}</span>
        </span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
