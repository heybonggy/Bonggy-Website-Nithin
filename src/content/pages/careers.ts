/** /careers' copy, so the page and its markdown twin render from one source. */
import type { Principle } from "./about";

export const CAREERS_LEDE =
  "We're small on purpose. We hire when a problem genuinely needs a person, not when a hiring plan needs a name. Send a note even if there's no listed role; if you have a strong take on what GTM bots should and shouldn't do, we want to talk.";

export const CAREERS_TITLE = "Fix GTM.";
export const CAREERS_TITLE_ACCENT = "Build the agent workspace.";

export const CAREERS_HOW_WE_WORK =
  "We move quickly because we've cut everything that doesn't compound. Async-first. Written-first. Demo-first.";

export const CAREERS_PRINCIPLES: Principle[] = [
  {
    title: "Better prep, not more sends.",
    body: "If a bot we ship doesn't give a team better prep in less time, it doesn't ship.",
  },
  {
    title: "Anti-bloat, anti-vanity-metric.",
    body: "We don't chase feature parity or activity counts. Every flow has to point at revenue.",
  },
  {
    title: "Bots draft. People approve.",
    body: "Nothing customer-facing goes out without a person approving it. The product reflects that.",
  },
];
