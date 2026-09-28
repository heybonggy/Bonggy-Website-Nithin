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

const COLORS = ["coral", "amber", "lime", "teal", "sky", "violet", "pink"] as const;
const SIZES = [6, 4, 8, 5, 3, 7];

/**
 * A one-off burst of dots in the bot palette around its parent. Default: 8
 * even dots over 0.5s. `big`: 24 mixed-size dots and bits flung 28–70px over
 * 1–1.2s. Remount (change `key`) to fire again. CSS transforms only; hidden
 * under reduced motion.
 */
export function Confetti({ className, big = false }: { className?: string; big?: boolean }) {
  const count = big ? 24 : 8;
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {Array.from({ length: count }, (_, i) => {
        const size = big ? SIZES[i % SIZES.length] : 6;
        return (
          <span
            key={i}
            className={cn("confetti-dot absolute left-1/2 top-1/2", big && i % 4 === 3 ? "rounded-[1px]" : "rounded-full")}
            style={{
              width: size,
              height: big && i % 4 === 3 ? size * 1.8 : size,
              background: `var(--bot-${COLORS[i % COLORS.length]}-disc)`,
              ["--a" as string]: `${(i / count) * 360 + (big ? (i % 3) * 7 : 12)}deg`,
              ["--d" as string]: big ? `${28 + ((i * 17) % 43)}px` : `${26 + (i % 3) * 8}px`,
              ...(big ? { animationDuration: `${1000 + (i % 5) * 50}ms` } : null),
            }}
          />
        );
      })}
    </span>
  );
}
