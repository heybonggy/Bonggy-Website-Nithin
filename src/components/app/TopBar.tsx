import { useState } from "react";
import { Search, Bell, Command } from "lucide-react";

interface TopBarProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function TopBar({ title, description, children }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-bonggy-bg/80 backdrop-blur-md border-b border-bonggy-border">
      <div className="h-14 px-6 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-[15px] font-semibold text-bonggy-text-primary">{title}</h1>
            {description && (
              <span className="text-[13px] text-bonggy-text-tertiary hidden md:inline">{description}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-bonggy-border bg-bonggy-surface text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:border-bonggy-border-hover transition-all text-[13px]"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 text-[11px] text-bonggy-text-tertiary bg-bonggy-bg px-1.5 py-0.5 rounded border border-bonggy-border font-mono-data">
              <Command size={10} />K
            </kbd>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-surface transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bonggy-accent" />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
