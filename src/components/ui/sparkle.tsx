import { cn } from "@/lib/utils";

/**
 * A small four-point sparkle in a bot colour (not an emoji). `twinkle` scales
 * it 0.8 → 1.15 with a 12° turn every 2.4s; reduced motion keeps it still.
 */
export function Sparkle({ className, twinkle = false }: { className?: string; twinkle?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", twinkle && "animate-twinkle", className)}>
      <path
        d="M12 1.5 C12.9 7.2 16.8 11.1 22.5 12 C16.8 12.9 12.9 16.8 12 22.5 C11.1 16.8 7.2 12.9 1.5 12 C7.2 11.1 11.1 7.2 12 1.5 Z"
        fill="var(--bot-violet-disc)"
      />
    </svg>
  );
}

const COLORS = ["coral", "amber", "lime", "teal", "sky", "violet", "pink", "coral"] as const;

/**
 * A one-off burst of 8 dots in the bot palette around its parent (0.5s).
 * Remount (change `key`) to fire again. CSS transforms only.
 */
export function Confetti({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {COLORS.map((c, i) => (
        <span
          key={i}
          className="confetti-dot absolute left-1/2 top-1/2 size-1.5 rounded-full"
          style={{
            background: `var(--bot-${c}-disc)`,
            ["--a" as string]: `${(i / COLORS.length) * 360 + 12}deg`,
            ["--d" as string]: `${26 + (i % 3) * 8}px`,
          }}
        />
      ))}
    </span>
  );
}
