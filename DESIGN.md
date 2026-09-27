# Bonggy: design system ("Paper")

The reference for how bonggy.com looks, moves and reads. Read it before adding a section, component or page. If you change something foundational (a token, a radius, a motion rule), update this file in the same commit.

Tokens live in [`src/app/globals.css`](src/app/globals.css) (Tailwind v4, CSS-first, no config file). Motion constants live in [`src/components/marketing/_motion.ts`](src/components/marketing/_motion.ts).

---

## 1. Principles

- **Black, white and gray.** The page is paper and ink. Hierarchy comes from weight, gray level, surface and spacing, never from colour.
- **One functional accent.** `--danger` (#b42318) is the only hue, and only for errors and destructive confirmation. No brand colour, no status colours, no gradients with hue.
- **Light and graphite dark.** Light is the default when the system has no preference; visitors can switch to a grey (graphite, not black) dark mode. See §2.1.
- **The product is the illustration.** Sections show the product (bots, flows, approvals) in drawn mocks. No stock art, no abstract 3D, no vendor logos.
- **Calm motion.** Motion explains a change of state. It never loops for decoration, and it respects reduced motion.
- **Plain words.** Sentence case everywhere. No uppercase mono eyebrows.

### Hue check

Before merging, grep `src/` for hue: `signal`, `emerald`, `green`, `teal`, `#10b981`, and `oklch(` with non-zero chroma. The only allowed hit is `--danger` (and its wash).

---

## 2. Colour tokens

Use the Tailwind classes, never raw hex.

| Token | Class | Light value | Role |
|---|---|---|---|
| `--background` | `bg-background` | white | Page |
| `--surface` | `bg-surface` | gray-50 | Section cards, quiet panels |
| `--surface-2` | `bg-surface-2` | gray-100 | Chips, soft buttons, tags |
| `--surface-3` | `bg-surface-3` | gray-150 | Hover on surface-2 |
| `--surface-raised` | `bg-surface-raised` | white | Windows, cards on a surface |
| `--surface-inverse` | `bg-surface-inverse` | gray-950 | Primary buttons, "needs you", user bubbles |
| `--foreground` | `text-foreground` | gray-950 | Headings, body emphasis |
| `--foreground-2` | `text-fg-2` | gray-700 (7.8:1) | Body copy |
| `--foreground-3` | `text-fg-3` | gray-600 (5.3:1) | Muted lines, captions, the grey half of two-tone headings |
| `--foreground-disabled` | `text-fg-disabled` | gray-400 | Placeholders only |
| `--foreground-inverse` | `text-fg-inverse` | white | Ink on inverse surfaces |
| `--border` / `--border-strong` | `border-border`, `border-border-strong` | 9% / 16% ink | Hairlines |
| `--wash-hover/active/selected` | `bg-wash-*` | 4% / 7% / 5.5% ink | Interaction states on rows |
| `--bubble-user` / `--bubble-bot` | `bg-bubble-user`, `bg-bubble-bot` | ink / 4% ink | Chat |
| `--status-ink/muted/track` | `bg-status-*` | ink / gray-600 / gray-200 | Status dots, bars, empty tracks |
| `--hatch` | `hatch` utility | 135° 1px lines | Failed states, the marketing avatar |
| `--danger` / `--danger-wash` | `text-danger`, `bg-danger-wash` | #b42318 | Errors only |

`--surface-sunken` (`bg-surface-sunken`, #fafafa light) is for mock sidebars and code. `--hatch-faint` is a 4% hatch for backdrops.

shadcn names (`card`, `muted`, `primary`, …) are mapped onto these for compatibility. Prefer the Paper names in new code.

### 2.1 Dark mode (graphite)

- **Tokens.** `.dark` on `<html>` swaps every semantic token to grey values: page #1b1b1b, surface #202020, surface-2 #262626, surface-3 #2e2e2e, raised #242424, sunken #161616, text #edecec / #a8a8a6 / #9a9a98, white hairlines at 10% and 18%, and `--danger` #f97066. Shadows switch too (darker drops plus a 1px top highlight). All text pairs meet WCAG AA.
- **Choosing.** The first visit follows `prefers-color-scheme`. The header toggle (a 36px Sun/Moon button; a Light · Dark control in the mobile sheet) stores `localStorage["bonggy-theme"]`, and from then on the stored choice wins. With nothing stored, live system changes are followed. Tabs stay in sync through the `storage` event. Logic: [`theme.ts`](src/components/marketing/theme.ts).
- **No flash.** [`theme-script.ts`](src/components/marketing/theme-script.ts) is inlined in `<head>`. Next places its own meta, preloads and stylesheet first, but ours is the only synchronous script, and it runs before `<body>` parses, so the first paint is already themed.
- **Switching** adds `.theme-switching` for one frame so colours don't transition unevenly.
- **Rules.** No raw `#fff`, `#000`, `bg-white` or gray-scale literals in components; use tokens so both themes work. The OG image, favicon and manifest stay light.

---

## 3. Typography

Geist Sans for everything; Geist Mono only for inline `code` in bot messages. Loaded with `next/font`, `display: swap`.

| Class | Size / line | Use |
|---|---|---|
| `text-display-2xl` | 64 / 1.04, 500 | Hero H1 (lg) |
| `text-display-xl` | 52 / 1.05 | Hero H1 (sm), sub-page H1 (sm+) |
| `text-display-lg` | 40 / 1.08 | Hero H1 (mobile), sub-page H1, final CTA |
| `text-heading-lg` | 36 / 1.12 | Section H2 (sm+) |
| `text-heading` | 30 / 1.2 | Section H2 (mobile), sub-page H2 |
| `text-title` | 20 / 1.4 | Card titles, team names |
| `text-body-lg` / `text-body` | 18 / 16, 1.625 | Intros, body |
| `text-ui` / `text-ui-sm` | 14 / 13 | Controls, table cells, mock text |
| `text-caption` / `text-micro` | 12 / 11 | Meta lines, pills |

- **Two-tone headings.** Headline in `text-foreground`, second clause in `text-fg-3` (e.g. "Pay for the bots you run. *Plus what they use.*").
- **Kickers** are quiet sentence-case lines (`text-ui-sm font-medium text-fg-3`), not uppercase mono.
- `tabular` utility for numbers that change.
- Inside JSX *string attributes* write `'` directly; `&apos;` only works in JSX text.

---

## 4. Layout

- Containers: `max-w-prose` (36rem), `max-w-copy` (42rem), `max-w-window` (49rem), `max-w-content` (64rem), `max-w-wide` (80rem).
- Section rhythm: `<Section>` gives `px-4 py-20 sm:px-6 sm:py-28` and a centred container (`width="wide"` default, or `"content"`). `card` wraps content in `rounded-3xl bg-surface`.
- `<SectionHeader title muted intro kicker align>` for every section heading.
- Anchors get `scroll-margin-top` from `[id]` in globals, so the fixed 64px header never covers them.
- Mobile first. Everything must work at 375px with a 16px gutter, no horizontal scroll, and tap targets of at least 44px (small pills extend their hit area with an `after:` inset).

---

## 5. Surfaces, radii, shadows

- Radii: `2xs` 2, `xs` 4, `sm` 6, `md` 10, `lg` 12, `xl` 16, `2xl` 20, `3xl` 24, `4xl` 32. Buttons and pills are `rounded-full`. Section cards and the app window are `rounded-3xl`; flow cards `rounded-2xl`; bubbles and result cards `rounded-xl`; rows `rounded-md`.
- Shadows: `shadow-e1` (resting card), `e2` (floating composer, tables), `e3` (menus), `e4` (modal), `shadow-window` (app window, phone), `shadow-knob` (switch).
- `hairline` / `hairline-strong` draw a 1px inset ring instead of a border.
- `fade-y` masks both edges of a scroller; `fade-t` masks only the top (chat transcripts that grow from the bottom).

---

## 6. Status without hue

Every status is told apart by fill, outline, glyph, icon and word ([`status-pill.tsx`](src/components/product-mock/status-pill.tsx)):

| Status | Pill | Dot / icon |
|---|---|---|
| off | dashed gray border, gray text | hollow gray ring |
| scheduled | 1px strong border | Clock |
| running | `bg-surface-2` | solid ink dot with a live ring |
| needs you | inverse (black) fill, white text | HandPalm |
| done | `bg-surface-2` | Check (pops in) |
| held | dotted ink border | FileText |
| failed | hatch + ink border | ✕, with a sentence in `text-danger` where it matters |

Labels swap with a short slide (`label-in`). Bot avatars carry a 10px badge for running / needs you / failed.

---

## 7. Mascot and brand

- **Bong** ([`ui/mascot.tsx`](src/components/ui/mascot.tsx)) is a rounded pebble with a single slot eye. States: idle, thinking, working, needs-you, done, off. It blinks only when `blinkKey` changes.
- **First pass, pending design review.** The pebble, eye and states were drawn in code for this redesign and need a designer's review before launch. The previous planet logo is kept in git history only.
- Team avatars are round discs: **sales** black with a white eye, **RevOps** white with an ink ring, **marketing** hatched gray. `GroupAvatar` overlaps them by 24%.
- Wordmark: "bonggy", Geist semibold, −0.03em.
- Favicon, apple icon and OG image use the black pebble on white.

---

## 8. Motion

Tokens: `DUR` (instant 120ms … title 1.1s), `EASE` (outExpo, standard, pop, settle, cursor, snap, exit), `SPRING` (switch, morph, layout, gentle). CSS mirrors them as `--dur-*` and `--ease-*`.

Rules:

- Motion explains a state change. Translates stay within ±24px; scale never above 1.1 (and only for a single pulse).
- The hero H1, sub and CTAs reveal with **CSS** keyframes (`word-in`, `rise-in`) so they paint before hydration and don't delay LCP.
- **Reduced motion:** CSS durations collapse to 1ms and delays to 0; `MotionConfig reducedMotion="user"` wraps every demo; the demo player jumps to the end state. Typing dots sit at stepped opacities so "working" still reads.
- Only one looping demo runs at a time: `useLoopFocus` gives focus to the looping section covering most of the viewport. Off-screen demos get `data-demo-offscreen`, which pauses CSS animations.

### Scripted demos

[`demo/player.ts`](src/components/product-mock/demo/player.ts) plays a timeline of `{ action, hold }` steps. State is the reduction of every applied action, so the end state (shown to reduced motion, on skip, and as the fallback) is always complete.

- The clock is virtual: it advances only while the demo is in view, the page is visible and the section has loop focus.
- Sections start once, after a share of the demo is in view (the ratio rule), and loop after a pause.
- **The hero starts without scrolling.** It uses a pixel rule instead (`startWhenVisiblePx: 160`, `notBeforeMs`: 600ms after the 1.5s intro), never loops, and runs a short take (about 14s, `pendingDuration(…, 0.7)`). Its composer floats in the window's top third until you send, then docks to the bottom. The transcript fills from the top and scrolls each new message near the top of the pane, because on a laptop only the top of the window is above the fold. At lg the H1 is two lines at `text-display-xl`.
- Timing helpers ([`demo/types.ts`](src/components/product-mock/demo/types.ts)): bot "thinking" = min(1900 + 22×words, 3000)ms × pace; reading = clamp(420 + 32×words, 700, 1700)ms; composer typing in chunks of 1–3 words every 70–110ms, capped at 2.4s; cursor travel clamp(320, 1.05×distance, 850)ms + 80ms press; approval "sending" 1600ms.
- Skip: a transparent overlay catches pointer-down anywhere on a playing demo; Escape skips too.
- **No empty panes.** `poster: "end"` renders the finished take on the server and before playback. When playback starts (`phase: "live"`), `<TakeHistory>` dims that take to 40% over 300ms as chat history above a divider, and the new take builds below it. Reduced motion (`phase: "static"`) shows only the end state. The hero's poster is its starting frame (full sidebar, visible composer), since it plays about 2s after load.
- The history copy never carries `data-cursor-target`, so the scripted cursor only clicks the live take.
- Team tabs auto-advance 4s after a take ends, until someone picks a tab.

---

## 9. Product mocks

Everything lives in [`src/components/product-mock/`](src/components/product-mock/), driven by [`data.ts`](src/components/product-mock/data.ts).

- **Accessibility.** Mocks render inside `<DemoFrame>`: the drawn UI is `aria-hidden` and `inert`, with a screen-reader summary of what the demo shows. Analytics and company context are real, accessible markup (a table with working filters; a definition list).
- **Pieces.** `AppWindow` (title bar, screen switcher, 264px sidebar, collapses below 640px), `PhoneFrame`, `BotRow`, `UserBubble` (hard-limit clause underlined and echoed as a `LimitChip`), `BotBubble`, `SystemLine`, `PendingRow`, `ChatComposer`, `FlowCard` (six parts: Trigger, Context, Steps, Approval, Output, Goal; empty parts show tracks; a fresh part sweeps; edits strike through and retype with "edited by you"), `FlowsList`, `RunHistory`, `RunReceipt`, result cards, `ApprovalCard`, `ApprovalsInbox`, `PillTabs`, `HandoffPill`, `ScriptedCursor`.
- **Bot voice.** Lowercase, terse, and it ends with what didn't happen ("added 5 next-step tasks to your crm. nothing sent.").
- **Data.** Numbers are small and labelled demo data. Tools stay generic (crm, calendar, call notes, job-change feed, #slack-channel names). No vendor logos, no real companies or people.

---

## 10. Components

- **Buttons** ([`cta-button.tsx`](src/components/marketing/cta-button.tsx)): pills. `primary` (inverse), `soft` (surface-2), `outline`, `ghost`; sizes sm/md/lg. External links open in a new tab with an arrow and sr-only note. Default copy: "Book a 30-min call"; "Get early access" opens the modal.
- **Header:** fixed 64px, blurs after 8px of scroll, Product menu (Bots, Flows, Approvals, Analytics), Teams, How it works, Pricing, FAQ; full-screen sheet below lg.
- **Footer:** Bong and wordmark, "Your process, not ours.", four link columns, and a large outlined mascot.
- **FAQ:** base-ui accordion, hairline dividers, plus icon turns 45°. FAQPage JSON-LD is generated from the same array.
- **Early-access modal:** role select, inline error with a Warning icon in `text-danger`.
- **Sub-pages:** `<SubPageShell>` (kicker, two-tone H1, lede), `<SubPageSection>`, `<SubPageCta>`.

---

## 11. Homepage map

| # | Anchor | Section |
|---|---|---|
| 1 | `#top` | Hero: a bot builds from your sentence (Champion Tracker) |
| 2 | `#what-we-do` | One workspace. Three teams. |
| 3 | `#flows` | Every bot runs a flow you design. |
| 4 | `#agents` | A bot for every job (Flows teams have built) |
| 5 | `#groups` | Bots hand off work. |
| 6 | `#approvals` | Bots draft. You decide. (plus the four bright lines) |
| 7 | `#analytics` | See what every bot did, and why. |
| 8 | `#context` | Your context, read first. |
| 9 | `#how-it-works` | Every flow runs on one loop. |
| 10 | `#pricing` | Pay for the bots you run. |
| 11 | `#faq` | Questions, answered. |
| 12 | | Give your first bot a purpose. |

Team ownership in mocks: Account Researcher, Deal Coach, Brief Writer, Champion Tracker (sales); Pipeline Watch, CRM Hygiene, Forecast Prep (RevOps); Market Modeller, Campaign Researcher, Content Drafter, **Inbound Router (marketing)**.

---

## 12. Copy rules

- The bright lines, word for word: **Approval by action.** Anything customer-facing (emails, posts, sequencer pushes, published content) needs a person. Internal output (a brief in chat, a Slack summary) can run without approval if your team chooses. **No volume blasting.** Marketing bots draft and research; they don't mass-send. Campaign sends stay in your own tools, after approval. **No leaderboards.** Work is measured against revenue, never person against person. **Humans stay in charge.** Bots work only through the tools and permissions you connect.
- Pricing, word for word: "Pricing is based on active bots plus usage. Flow runs count toward usage. We're setting plans with early-access teams, so there are no public numbers yet." No prices in structured data.
- Security until engineering confirms: "Built for read-scoped permissions, encryption in transit and at rest, and no training on your data" and "SOC 2 Type II: on the path, not attained". Don't name protocols or ciphers.
- Key lines: "Start from a preset, or from a sentence. Either way, the flow is yours." and "Your process, not ours." Presets are "Flows teams have built".
- Banned: AI-powered, supercharge, 10x, autopilot, AI SDR, seamless, leverage, revolutionize, "Templates". Never name a competitor anywhere in the repo.

---

## 13. Gates

Before a release: `npm run lint`, `npx tsc --noEmit`, `npm run build` with zero errors; Lighthouse mobile on `next start` (Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100 on `/`); `node scripts/screenshot.mjs` at 375/768/1280/1440 plus reduced motion; the hue check in §1.
