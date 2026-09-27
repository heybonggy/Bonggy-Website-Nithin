"use client";

import * as React from "react";
import { ChatComposer } from "@/components/product-mock/chat-composer";
import { useEntrance } from "./_motion";

const LINE = "give your first bot a purpose…";

/** The final CTA's mini composer: types its line once when scrolled into view. */
export function CtaComposer() {
  const ref = React.useRef<HTMLDivElement>(null);
  const entrance = useEntrance(ref, 0.6);
  const [typed, setTyped] = React.useState(0);

  React.useEffect(() => {
    if (entrance !== "go") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= LINE.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [entrance]);

  const value = entrance === "static" ? LINE : LINE.slice(0, typed);
  return (
    <div ref={ref} aria-hidden className="mt-12 w-full max-w-[520px] text-left">
      <ChatComposer value={value} caret />
    </div>
  );
}
