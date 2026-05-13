import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Search, ArrowRight } from "lucide-react";

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const commands = [
    { label: "Go to Dashboard", shortcut: "G D", action: "/app" },
    { label: "Go to Accounts", shortcut: "G A", action: "/app/accounts" },
    { label: "Go to Signals", shortcut: "G S", action: "/app/signals" },
    { label: "Go to Sequences", shortcut: "G Q", action: "/app/sequences" },
    { label: "Go to Ammo Packs", shortcut: "G P", action: "/app/ammo" },
    { label: "Go to Trust Queue", shortcut: "G T", action: "/app/trust" },
    { label: "Create new sequence", shortcut: "C S", action: "create-sequence" },
    { label: "Generate ammo pack", shortcut: "C A", action: "create-ammo" },
  ];

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] bg-bonggy-surface border border-bonggy-border rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-bonggy-border">
          <Search size={16} className="text-bonggy-text-tertiary" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-[14px] text-bonggy-text-primary placeholder:text-bonggy-text-tertiary outline-none"
          />
          <kbd className="text-[11px] text-bonggy-text-tertiary bg-bonggy-bg px-1.5 py-0.5 rounded border border-bonggy-border font-mono-data">
            ESC
          </kbd>
        </div>
        <div className="max-h-[320px] overflow-y-auto py-2">
          {filtered.map((cmd) => (
            <button
              key={cmd.action}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-bonggy-bg transition-colors group"
            >
              <span className="text-[13px] text-bonggy-text-primary">{cmd.label}</span>
              <div className="flex items-center gap-1">
                {cmd.shortcut.split(" ").map((key, i) => (
                  <kbd
                    key={i}
                    className="text-[10px] text-bonggy-text-tertiary bg-bonggy-bg px-1.5 py-0.5 rounded border border-bonggy-border font-mono-data"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-[13px] text-bonggy-text-tertiary">
              No commands found
            </p>
          )}
        </div>
        <div className="px-4 py-2 border-t border-bonggy-border bg-bonggy-bg flex items-center gap-3 text-[11px] text-bonggy-text-tertiary">
          <span className="flex items-center gap-1">
            <ArrowRight size={10} /> Select
          </span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

export default function AppShell() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape" && cmdOpen) {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cmdOpen]);

  return (
    <div className="flex min-h-screen bg-bonggy-bg">
      <Sidebar />
      <main className="flex-1 ml-[240px] min-h-screen">
        <Outlet />
      </main>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
