import { cn } from "@/lib/utils";

/**
 * Three 6px dots that show work in progress. Under reduced motion they sit
 * at stepped opacities (.25/.45/.7) so "working" still reads (globals.css).
 */
export function TypingDots({ className, label = "Working" }: { className?: string; label?: string }) {
  return (
    <span role="status" aria-label={label} className={cn("typing-dots inline-flex items-center gap-1", className)}>
      {[0, 0.15, 0.3].map((d) => (
        <span
          key={d}
          aria-hidden
          className="size-1.5 animate-typing-dot rounded-full bg-current"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </span>
  );
}
