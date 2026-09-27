"use client";

import * as React from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { useEntrance } from "./_motion";

/** Pricing "Included" list: each row checks in, 90ms apart, when in view. */
export function IncludedList({ items }: { items: string[] }) {
  const ref = React.useRef<HTMLUListElement>(null);
  const entrance = useEntrance(ref, 0.5);
  return (
    <ul ref={ref} className="mt-4 flex flex-col gap-3">
      {items.map((item, i) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-3 text-ui text-fg-2",
            entrance === "armed" && "opacity-0",
            entrance === "go" && "animate-label-in",
          )}
          style={entrance === "go" ? { animationDelay: `${i * 90}ms` } : undefined}
        >
          <Check
            weight="bold"
            className={cn("mt-0.5 size-4 shrink-0 text-foreground", entrance === "go" && "animate-check-in")}
            style={entrance === "go" ? { animationDelay: `${i * 90 + 60}ms` } : undefined}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
