import type { ReactNode } from "react";

export function ShimmerText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--bonggy-text-primary) 0%, var(--bonggy-accent) 25%, var(--bonggy-text-primary) 50%, var(--bonggy-accent) 75%, var(--bonggy-text-primary) 100%)",
        backgroundSize: "200% auto",
        animation: "shimmer-sweep 5s linear infinite",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}
