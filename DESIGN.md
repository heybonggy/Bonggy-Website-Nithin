# Bonggy: design system ("Paper")

The reference for how bonggy.com looks, moves and reads. Read it before adding a section, component or page. If you change something foundational (a token, a radius, a motion rule), update this file in the same commit.

Tokens live in [`src/app/globals.css`](src/app/globals.css) (Tailwind v4, CSS-first, no config file). Motion constants live in [`src/components/marketing/_motion.ts`](src/components/marketing/_motion.ts).

---

## 1. Principles

- **Ink on paper; colour only on bots.** The page chrome (nav, buttons, section cards, headings, body, status pills, charts, the theme toggle) is black, white and gray. Hierarchy comes from weight, gray level, surface and spacing. **Bots may have colour**: their avatars and a few accents of their own (§2.4). The grey page makes the coloured bots stand out.
- **One functional accent.** `--danger` is reserved for errors and destructive confirmation. No bot colour ever means "error", and status is never told by colour.
- **Light and graphite dark.** Light is the default when the system has no preference; visitors can switch to a grey (graphite, not black) dark mode. See §2.1.
- **The product is the illustration.** Sections show the product (bots, flows, approvals) in drawn mocks. No stock art, no abstract 3D, no vendor logos.
- **Calm motion.** Motion explains a change of state. It never loops for decoration, and it respects reduced motion.
- **Plain words.** Sentence case everywhere. No uppercase mono eyebrows.

### Hue check

Before merging, check for hue outside the `--bot-*` palette tokens and `--danger`: grep `src/` for `signal`, `emerald`, `green`, `#10b981`, raw hex with chroma and `oklch(` with non-zero chroma. Bot colour may only be reached through `--bot-*` variables (via `botColorVars`).

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

### 2.4 Bot palette

Eight curated colours, as tokens in `:root` (dark overrides ink, tint and ring). **disc** is the avatar fill in both themes; **ink** is text or icons in that colour; **tint** is a pill or bubble background. Faces are drawn in #141414, except on graphite (#ffffff). Every ink is at least 4.7:1 on its own tint and on the page, in both themes. Discs under 3:1 against the page get a ring, a fixed 1.5px at every size (amber, lime, teal and sky on white at 12% ink; graphite in dark at 30% white, with its disc lifted to #3a3a3a).

| name | disc | light ink / tint | dark ink / tint |
|---|---|---|---|
| graphite (default) | #2b2b2b (dark: #3a3a3a) | #2b2b2b / #e1e1e1 | #e6e6e4 / #2a2a2a |
| coral | #f2644a | #b93a22 / #fde9e6 | #ff9a85 / #422823 |
| amber | #f0a524 | #8f5a00 / #fdf2e0 | #f7c261 / #41341d |
| lime | #7cc639 | #3f7a12 / #edf7e3 | #a6dd72 / #2c3a20 |
| teal | #1fb5a6 | #0b7166 / #e0f5f3 | #5fd6c9 / #1c3734 |
| sky | #3b9eff | #1464c0 / #e4f1ff | #86c1ff / #213344 |
| violet | #8b6cf6 | #5b3fd1 / #efeafe | #b3a0ff / #2f2a42 |
| pink | #ef5da8 | #b52a73 / #fde8f3 | #f79acb / #412734 |

**Where bot colour may appear:** the avatar; the active tab pill (tint, ink text, ink ring at 28%); the selected sidebar row's 2px left bar; a 2px top stripe on that bot's flow card; the bot's name over its own bubble; its handoff pill (tint); its celebrate sparks. User bubbles, status pills, approval strips and receipts stay grayscale.

### 2.1 Dark mode (graphite)

- **Tokens.** `.dark` on `<html>` swaps every semantic token to grey values: page #1b1b1b, surface #202020, surface-2 #262626, surface-3 #2e2e2e, raised #242424, sunken #161616, text #edecec / #a8a8a6 / #9f9f9d, white hairlines at 10% and 18%, and `--danger` #f97066. Shadows switch too (darker drops plus a 1px top highlight). All text pairs meet WCAG AA.
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
| `text-heading-xl` | 44 / 1.1 | Section H2 (lg) |
| `text-heading-lg` | 36 / 1.12 | Section H2 (sm) |
| `text-heading` | 30 / 1.2 | Section H2 (mobile), sub-page H2 |
| `text-title` | 20 / 1.4 | Card titles, team names |
| `text-body-lg` / `text-body` | 18 / 16, 1.625 | Intros, body |
| `text-ui` / `text-ui-sm` | 14 / 13 | Controls, table cells, mock text |
| `text-caption` / `text-micro` | 12 / 11 | Meta lines, pills |

- **Two-tone headings** (headline in `text-foreground`, second clause in `text-fg-3`) only in the hero, flows and pricing. Every other H2 is single-tone. No 01/02/03 numbering.
- **Kickers** are quiet sentence-case lines (`text-ui-sm font-medium text-fg-3`), not uppercase mono.
- `tabular` utility for numbers that change.
- Inside JSX *string attributes* write `'` directly; `&apos;` only works in JSX text.

---

## 4. Layout

- Containers: `max-w-prose` (36rem), `max-w-copy` (42rem), `max-w-window` (49rem), `max-w-content` (64rem), `max-w-wide` (80rem).
- Section rhythm: `<Section>` gives `px-4 py-20 sm:px-6 sm:py-24` and a centred container (`width="wide"` default, or `"content"`). `card` wraps content in `rounded-3xl bg-surface p-6 sm:p-10`, with the mock raised on it. Flows, groups, approvals, analytics and pricing sit in cards; teams, context and FAQ stay on the white page; How it works is a full-width surface band. Headings alternate: flows and approvals left, groups right. Two cards (flows, approvals) have a bot peeking over the top edge (`Section peek`), which reacts when clicked. Heading to mock: 40px.
- `<SectionHeader title muted intro kicker align>` for every section heading.
- Anchors get `scroll-margin-top` from `[id]` in globals, so the fixed 64px header never covers them.
- Mobile first. Everything must work at 375px with a 16px gutter, no horizontal scroll, and tap targets of at least 44px (small pills extend their hit area with an `after:` inset).

---

## 5. Surfaces, radii, shadows

- Radii: `2xs` 2, `xs` 4, `sm` 6, `md` 10, `lg` 12, `xl` 16, `2xl` 20, `3xl` 24, `4xl` 32. Buttons and pills are `rounded-full`. Section cards and the app window are `rounded-3xl`; flow cards `rounded-2xl`; bubbles and result cards `rounded-xl`; rows `rounded-md`.
- Shadows: `shadow-e1` (resting card), `e2` (floating composer, tables), `e3` (menus), `e4` (modal), `shadow-window` (app window, phone), `shadow-knob` (switch).
- `hairline` / `hairline-strong` draw a 1px inset ring instead of a border.
- `hatch-faint` (7% ink, 6% white in dark) is the only page texture: the plates behind the hero window and the phones, masked to fade out at the bottom.
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

## 7. Logo and mascot

### 7.1 The logo: the planet mark

The Bonggy logo is the **planet mark** ([`ui/logo.tsx`](src/components/ui/logo.tsx)), the original artwork: a sphere with a tilted ring. Paths and proportions are unchanged from the original.

- **Monochrome, always.** Planet and ring in `currentColor` (ink #0a0a0a in light, #edecec in dark). The highlight is the page colour at 45%, and a thin page-coloured gap separates the front arc from the planet so the ring reads in one colour. No glow and no green: colour is reserved for bots.
- **Lockup.** The mark plus the "Bonggy" wordmark in Geist 500 (−0.02em), 10px apart. The navbar mark is 24px, the footer the same.
- **Clear space.** At least half the mark's width on every side; nothing inside the ring's bounding box.
- **Icons.** The favicon (`app/icon.svg`) and apple icon use a heavier ring (12/256 instead of 4/256) so it survives at 16px. The favicon switches with `prefers-color-scheme` inside the SVG (ink on light tabs, #edecec on dark tabs). The apple icon is ink on white. Checked at 16, 32 and 180px.
- **Where it appears.** Navbar, mobile menu, footer, favicon (`app/favicon.ico` at 16/32/48 plus `app/icon.svg`), apple icon, manifest PNGs (`public/icons/` 192, 512 and a maskable 512 with safe padding), OG image and `public/logo.svg` (the JSON-LD `logo`). All from the same geometry; regenerate them together if the mark changes.
- Don't recolour it, add effects, or put Bong in its place.

### 7.2 Bong, the bot character

**Bong** ([`ui/mascot.tsx`](src/components/ui/mascot.tsx)) is a character, not the logo: the pebble with a pill eye that every bot's look is built from (§7.21), plus character moments (the hero's empty chat, the customiser, peeks). It never appears in the navbar, footer, icons or metadata. First pass, pending design review.

## 7.21 Bot looks and the customiser

- **Look model** ([`ui/bot-look.tsx`](src/components/ui/bot-look.tsx)): `{ color, shape: pebble | round | squircle | capsule | blob, eyes: pill | dots | visor | round | arcs, accessory: none | antenna | headset | beanie | glasses }`, drawn as SVG in one viewBox. The eyes are the group the character engine animates (blink scales height, gaze translates); the accessory trails the body's rotation by about 60ms, so antennas wobble on hops. Accessories are hidden under 20px.
- **Defaults** ([`data.ts`](src/components/product-mock/data.ts) `DEFAULT_LOOKS`): every bot is distinct (Champion Tracker coral pebble, Deal Coach graphite squircle with a visor, Pipeline Watch sky round with dots, Campaign Researcher violet blob with glasses, Inbound Router teal capsule with a headset…). The team is carried by the team tag, not the avatar.
- **Store** ([`bot-looks.ts`](src/components/product-mock/bot-looks.ts)): `useBotLook(botId)` on `useSyncExternalStore`, saved in `localStorage["bonggy:bot-looks:v1"]` as partial looks over the defaults and validated on read. The server snapshot is the defaults, and an unsaved bot returns the same default object on the client, so hydration never re-renders. Tabs sync through `storage`. A change updates the bot everywhere at once.
- **"Make it yours"** (`#make-it-yours`, after "A bot for every job", in the Product menu): pick a bot, then a colour (8 swatches in a radiogroup), shape, eyes and accessory (44px chips with a live mini preview). Arrow keys move and select; changes are announced politely ("Deal Coach is now sky"). Reset, and "saved on this device". A 160px live preview reacts (excited for 1.2s on each change; click for reactions), with a sidebar row and a bubble showing the accents.
- **Naming moment.** When Champion Tracker names itself in the hero, it appears at 72px in the chat (waking, then excited), then a shared-layout move (`layoutId`) shrinks it into its sidebar row (desktop) or header (phone).
- **Bubble names** sit in a small chip in the bot's tint with its ink.
- **Hero tie-in.** After the hero take ends, a line under the demo, "customise champion tracker →" (a real button outside the inert demo, in a reserved 44px slot), jumps to the customiser with that bot selected.
- **Performance.** NumberFlow mounts lazily (`LazyNumber`): plain numbers until a table scrolls in or a filter changes. Mounting it everywhere on load cost about 1.4s of style and layout on a throttled phone.

## 8. Motion

Tokens: `DUR` (instant 120ms … title 1.1s), `EASE` (outExpo, standard, pop, settle, cursor, snap, exit), `SPRING` (switch, morph, layout, gentle). CSS mirrors them as `--dur-*` and `--ease-*`.

Rules:

- Motion explains a state change. Translates stay within ±24px; scale never above 1.1 (and only for a single pulse).
- The hero H1, sub and CTAs reveal with **CSS** keyframes (`word-in`, `rise-in`) so they paint before hydration and don't delay LCP.
- **Reduced motion:** CSS durations collapse to 1ms and delays to 0; `MotionConfig reducedMotion="user"` wraps every demo; the demo player jumps to the end state. Typing dots sit at stepped opacities so "working" still reads.
- Only one scripted take runs at a time: `useLoopFocus` gives focus to the looping section covering most of the viewport (at least 12%). Sections start at 25% in view after 400ms.
- **Ambient motion** runs whenever a window is on screen, independent of takes and loop focus ([`ambient.tsx`](src/components/product-mock/ambient.tsx)): one sidebar row always running (live dot, a preview that cycles every 1.8s with typing dots), one row with a "needs you" pill, and the group handoff pill cycling every 2.3s. It pauses off screen and on hidden tabs, and is static under reduced motion. Off-screen demos get `data-demo-offscreen`, which pauses CSS animations.

### 8.1 Character engine

[`ui/bot-character.tsx`](src/components/ui/bot-character.tsx) makes every bot avatar a living character. It stays our mascot (the pebble with one pill eye); only the motion model is new.

- **One loop.** A module-level registry shares a single rAF loop. Each character advances in fixed 1/120s substeps with a semi-implicit spring per channel: `v += (−2ζωv − ω²(x − target))·dt; x += v·dt`. Results go to CSS variables on the element (`--bot-rot/x/y/s`, `--eye-open`, `--eye-s`, `--gaze-x/y`) with no React render per frame. `.bot-body` and `.bot-eye` read them.
- **Springs (ω rad/s, ζ).** rotation 5/0.9, x 3.5/1, y 4/1, scale 10/0.8, blink 26/1, eye size 9/0.85, gaze 13/1, spin 6.2/1.
- **Units.** 1u = size/114. Under 40px, translation and rotation ×2.2 and no gaze; 16–18px avatars only blink and pop.
- **States** (targets rewritten every frame, t = seconds in state): idle (slow bob and sway, gaze re-targets every 2.5–5.5s), thinking (tilted −9°, gaze up and to a side), working (typing nod with squash, gaze down, a spin every 6–9s), waiting (tilted 8°, a 380ms hop every 1.8–3.2s, gaze toward approve), happy (✓ eye, bounce, 3.2s → idle), excited (hop loop at 2.2Hz with squash and stretch, 2.2s → happy), celebrate (one spin + 16 sparks, 2.2s → happy), drowsy (eye nearly shut, sunk), sad (tilted, sunk, eye 70%). Every character wakes once, the first time it's seen.
- **Blink** every 4.5–10s in calm states (seeded from the bot id), 20% double; never during thinking.
- **Status mapping.** running → working, needs you → waiting, done → happy, off → drowsy. Demos add beats: pending → thinking, a flow being built → excited, receipt → celebrate.
- **Hover and click** (only when `interactive`, outside inert demos): a curious tilt with the gaze following the pointer; clicks cycle spin, double spin, spin-bounce, dizzy wobble, and spin plus sparks.
- **Budget.** Off-screen characters and hidden tabs are skipped, and the loop stops when none are visible. At most 24 characters run fully; the smallest beyond that only blink.
- **Reduced motion.** No loop at all. Each state is a static pose (thinking tilted with gaze up-left, waiting tilted with gaze up-right, happy with the ✓ eye, drowsy eye shut), and pose changes fade over 150ms. Status words and pills carry the meaning.

### Entrances

- `useEntrance(ref, amount)` returns `static` (server render, reduced motion, or already on screen at mount), `armed` (hydrated and still off screen) or `go` (scrolled into view). Pre-animation states (zeros, hidden rows) only apply while `armed`, so crawlers and no-JS readers always get the real content.
- Analytics: every number rolls from 0 with NumberFlow when the table is 35% in view, and again on each filter change. Run bars grow scaleX 0→1 (700ms outExpo, 60ms stagger). Filtered rows animate with layout + `SPRING.layout`.
- Pricing checks and labels enter 90ms apart. Context rows enter with `row-in`, and override bars draw top to bottom (`bar-draw`, 450ms). The final CTA composer types its line once. The footer mascot blinks once in view.
- **Scroll reveal.** Mocks and cards (never headings) carry `.reveal`: `translateY(24px) scale(.985)` → none on a `view()` timeline (entry 0% to cover 30%). It's transform only, never hidden, lives inside `@supports (animation-timeline: view())`, and is off under reduced motion.

### Scripted demos

[`demo/player.ts`](src/components/product-mock/demo/player.ts) plays a timeline of `{ action, hold }` steps. State is the reduction of every applied action, so the end state (shown to reduced motion, on skip, and as the fallback) is always complete.

- The clock is virtual: it advances only while the demo is in view, the page is visible and the section has loop focus.
- Sections start once, after a share of the demo is in view (the ratio rule), and loop after a pause.
- **The hero starts without scrolling.** It uses a pixel rule instead (`startWhenVisiblePx: 160`, `notBeforeMs`: 600ms after the 1.5s intro), never loops, and runs a short take (about 14s, `pendingDuration(…, 0.7)`). Its composer floats in the window's top third until you send, then docks to the bottom. The transcript fills from the top and scrolls each new message near the top of the pane, because on a laptop only the top of the window is above the fold. At lg the H1 is two lines at `text-display-xl`. **On phones** the hero is the phone screen: a 34px H1 and one CTA row keep about 190px of the phone above the fold at 390×760, the take starts when any of it is visible (after the intro), and its transcript scrolls each new message to the top of the screen.
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
- **Phones** ([`phone.tsx`](src/components/product-mock/phone.tsx)) match the desktop window: a 44px device with a thin bezel (ink in light, graphite in dark), a dynamic island, a 9:41 status bar and a home indicator, on the hatched plate. Inside is a real mobile chat screen: a back chevron, the bot's live character and status pill, a transcript that fills from the top and follows new messages, and a composer pinned at the bottom with a keyboard that slides up while the demo types. The cursor becomes a soft thumb circle (`ScriptedCursor variant="touch"`). Tab switches slide and fade, and the incoming bot reacts. Below 640px, flows, groups and approvals render as phone screens from the same demo player (both layouts are in the DOM, and CSS picks one, so nothing shifts on hydration). Analytics and context stay as real responsive HTML.
- **Bot voice.** Lowercase, terse, and it ends with what didn't happen ("added 5 next-step tasks to your crm. nothing sent.").
- **Data.** Numbers are small and labelled demo data. Tools stay generic (crm, calendar, call notes, job-change feed, #slack-channel names). No vendor logos, no real companies or people.

---

## 10. Components

- **Buttons** ([`cta-button.tsx`](src/components/marketing/cta-button.tsx)): pills. `primary` (inverse), `soft` (surface-2), `outline`, `ghost`; sizes sm/md/lg. External links open in a new tab with an arrow and sr-only note. Default copy: "Book a 30-min call"; "Get early access" opens the modal.
- **Header:** fixed 64px, blurs after 8px of scroll, Product menu (Bots, Flows, Approvals, Analytics), Teams, How it works, Pricing, FAQ; full-screen sheet below lg.
- **Footer:** the logo lockup, "Your process, not ours.", four link columns.
- **FAQ:** base-ui accordion, hairline dividers, plus icon turns 45°. FAQPage JSON-LD is generated from the same array.
- **Early-access modal:** role select, inline error with a Warning icon in `text-danger`.
- **Sub-pages:** `<SubPageShell>` (kicker, two-tone H1, lede), `<SubPageSection>`, `<SubPageCta>`.

---

## 11. Homepage map

| # | Anchor | Section |
|---|---|---|
| 1 | `#top` | Hero: a bot builds from your sentence (Champion Tracker) |
| 2 | `#what-we-do` | One workspace. Three teams. (three team columns: the team's bots as compact rows with a live status that alternates between two real moments, staggered 300–700ms per row; one line on what the team gets; clicking a bot opens it in the customiser) |
| 3 | `#flows` | Every bot runs a flow you design. |
| 4 | `#agents` | A bot for every job (Flows teams have built) |
| 4b | `#make-it-yours` | Make it yours. (the customiser, §7.21) |
| 5 | `#groups` | Bots hand off work. |
| 6 | `#approvals` | Bots draft. You decide. (plus the four bright lines) |
| 7 | `#analytics` | See what every bot did, and why. |
| 8 | `#context` | Your context, read first. |
| 9 | `#how-it-works` | Every flow runs on one loop. (2×2 feature cards, each with a 230px live stage: sources checking in, actions mapping to goals, a status cycling off → running → needs you → done, bars per level) |
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
