import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge needs to know the Paper theme's custom scales, otherwise it
 * reads e.g. `text-ui-sm` as a text colour and drops the real colour class.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-2xl", "display-xl", "display-lg", "heading-xl", "heading-lg", "heading", "title",
        "body-lg", "body", "ui", "ui-sm", "caption", "micro",
      ],
      shadow: ["hairline", "e1", "e2", "e3", "e4", "window", "knob"],
      radius: ["2xs", "4xl"],
      container: ["prose", "copy", "window", "content", "wide"],
      ease: ["out-expo", "standard", "pop", "settle", "cursor", "snap", "exit"],
      animate: [
        "typing-dot", "entry", "entry-fresh", "label-in", "check-in", "row-in",
        "spin-slow", "mount-fade", "live-ring", "fill-sweep", "caret",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
