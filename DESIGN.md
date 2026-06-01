# Bonggy — Design Language

End-to-end reference for what the Bonggy website should look and feel like. Read this before adding a new section, component, or page so the work doesn't drift.

This is a living document. If you change something foundational (a token, a default radius, a motion config), update this file in the same commit.

---

## 1. Voice & register

Bonggy reads "controlled, not screaming."

- Backgrounds are **anti-blinding** — never pure white (`#fff`), never pure black (`#000`). Off-white in light, near-Zinc-950 in dark, both with a tiny cool tint.
- Text hierarchy is built from **weight + color**, not size alone. We pull readers in with quietness, not bigness.
- Display type is **tightened** (`letter-spacing: -0.035em`, `line-height: 0.98`) — copy feels mechanical and intentional, not airy marketing.
- Mono labels at `0.18em–0.22em` letter-spacing carry the "instrument panel" feel. Used wherever a label sits next to a piece of data (eyebrows, status chips, ticker copy, HUD corners).
- Accent color is **signal-green** (`--signal`) and used sparingly — for active state, status dots, italicized accent words in headlines, and one-pixel rules. Never as a body color, never as a button fill outside specific CTAs.
- Motion is spring-based and small. Translates are typically **±10–24px**. Avoid scaling content > 1.03×. Never linear easings on interactive elements.

---

## 2. Color tokens

All colors are declared as `oklch(...)` in [`src/app/globals.css`](src/app/globals.css). Reference them through Tailwind utility classes (`bg-background`, `text-muted-foreground`, etc.) — never hardcode hex.

### Semantic tokens (work in both themes)

| Token | Tailwind class | Role |
|---|---|---|
| `--background` | `bg-background` / `text-background` | Page surface |
| `--foreground` | `bg-foreground` / `text-foreground` | Primary text + ink |
| `--card` | `bg-card`, `text-card-foreground` | Raised surface (sections, cards) |
| `--popover` | `bg-popover` | Dropdowns, command palette |
| `--primary` | `bg-primary`, `text-primary-foreground` | Default button fill (near-black ink in light, near-white in dark) |
| `--secondary` | `bg-secondary` | Quiet fill (chips, badges) |
| `--muted` | `bg-muted`, `text-muted-foreground` | Subtle surface + body-grade copy |
| `--accent` | `bg-accent`, `text-accent-foreground` | Hover wash for ghost controls |
| `--destructive` | `text-destructive`, `bg-destructive/10` | Errors, deletes, warning flags |
| `--border` | `border-border` | Hairline divider (`oklch(0 0 0 / 9%)` light, `oklch(1 0 0 / 10%)` dark) |
| `--input` | `bg-input` | Form field stroke |
| `--ring` | `ring-ring` | Focus ring color |
| `--signal` | `bg-signal`, `text-signal` | **Accent.** Status dots, italicized accent words, active-state outlines |
| `--signal-foreground` | `text-signal-foreground` | Ink on a filled signal surface |
| `--signal-muted` | `bg-signal-muted` | 12–14% signal wash (chips, "live" panels) |
| `--line` | `border-line` | Diagram strokes, mock connectors |

### Specific values

**Light theme (`:root`):**

| Token | Value | What it is |
|---|---|---|
| `--background` | `oklch(0.985 0.003 280)` | Off-white with cool tint |
| `--foreground` | `oklch(0.2 0.006 280)` | Near-black ink |
| `--card` | `oklch(0.975 0.003 280)` | One step beneath bg |
| `--muted-foreground` | `oklch(0.46 0.008 280)` | Body copy |
| `--signal` | `oklch(0.5 0.17 152)` | Darker mint so it sits on white legibly |
| `--border` | `oklch(0 0 0 / 9%)` | 9% black |

**Dark theme (`.dark`):**

| Token | Value | What it is |
|---|---|---|
| `--background` | `oklch(0.085 0.005 280)` | Zinc-950 equivalent with cool tint |
| `--foreground` | `oklch(0.98 0 0)` | Near-white |
| `--card` | `oklch(0.115 0.004 280)` | One step above bg |
| `--muted-foreground` | `oklch(0.62 0.005 280)` | Body copy |
| `--signal` | `oklch(0.78 0.13 152)` | Brighter mint for dark surfaces |
| `--border` | `oklch(1 0 0 / 10%)` | 10% white |

### Decorative tokens (theme-aware)

These swap automatically per theme — never hardcode their values in components.

| Token | Use |
|---|---|
| `--grid-line` / `--grid-line-fine` | Dot grids, subtle backgrounds |
| `--grain-opacity`, `--grain-blend` | Film grain overlay (`overlay` in dark, `multiply` in light) |
| `--mesh-1/2/3` | Background mesh gradients tinted signal-green |
| `--wordmark-stroke`, `--wordmark-fill` | Outline + fill for the big "BONGGY" wordmark watermark |
| `--inset-highlight` | Inner highlight on bevelled surfaces |
| `--shadow-diffuse-1/2` | Section shadows (~50% smaller blur than typical to keep scroll cheap) |
| `--shadow-pill-floating`, `--shadow-pill-grounded` | Nav pill states |
| `--shadow-card-lift`, `--shadow-button-base` | Card hover, button base |

### Forbidden colors

- Pure white (`#fff`, `oklch(1 0 0)`) anywhere on the page surface — only acceptable in single-pixel highlights inside SVG icons
- Pure black (`#000`) — use `--foreground` in light, `--background` or `oklch(0.085 ...)` in dark
- Any neon green not derived from `--signal`
- Any blue/orange/magenta system color — Bonggy is monochrome + signal-green. Destructive red is the only other allowed hue, and only on errors/flags

---

## 3. Typography

Two font families loaded via `next/font/google`:

- **`Geist Sans`** — `--font-sans`, `--font-heading`. All body copy, all headlines.
- **`Geist Mono`** — `--font-mono`. Every eyebrow, label, status chip, HUD corner, ticker, button (uppercase tracked).

Tailwind classes: `font-sans` (default), `font-mono`, `font-heading` (alias for sans on this site).

### Display headings — `.text-display`

Class defined in `globals.css`:

```css
.text-display {
  font-feature-settings: "ss01", "cv11", "calt", "ss02";
  letter-spacing: -0.035em;
  line-height: 0.98;
}
```

Apply to every section h2 / page h1. Tightened tracking + sub-1 leading is the signature look.

Sizes used across the site:

| Surface | Size (mobile → desktop) |
|---|---|
| Page hero h1 (`SubPageShell`) | `40px` → `72px` (`text-[40px] sm:text-[56px] lg:text-[72px]`) |
| Section h2 | `36px` → `56px` (`text-[36px] sm:text-[44px] lg:text-[56px]`) |
| Featured card title | `28px` → `44px` (`text-[28px] sm:text-[36px] lg:text-[44px]`) |
| Default card title | `24px` → `28px` (`text-[24px] sm:text-[28px]`) |
| Sub-page block h3 | `26px` → `32px` (`text-[26px] sm:text-[32px]`) |
| Mock-card numeric stats | `28px` → `44px` (signal-green ink for emphasis) |

### Body copy

| Use | Class |
|---|---|
| Section lede / hero sub | `text-[17px] leading-relaxed text-muted-foreground` |
| Card body | `text-[15.5px] leading-relaxed text-muted-foreground` |
| Long-form essay body | `text-[16px] sm:text-[17px] leading-[1.75] text-muted-foreground` |
| Outcome row | `text-[13.5px] text-foreground/90` |
| Mock-row primary | `text-[12.5px] font-medium text-foreground` |
| Mock-row meta | `text-[11.5px] text-muted-foreground` |

### Mono / eyebrow / status labels

| Use | Class |
|---|---|
| Section eyebrow | `font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground` |
| Card kind tag | same as eyebrow, often inside `bg-signal/10 text-signal rounded-full px-2.5 py-1` |
| Nav links | `font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground` |
| Tab labels (AnimatedTabs) | `font-mono text-[11px] uppercase tracking-[0.18em]` |
| Marquee header / HUD corners | `font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground` |
| Footer column headers | `font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70` |
| Footer links | `text-[13.5px] text-muted-foreground hover:text-foreground` |
| Buttons (mono) | `font-mono font-medium uppercase tracking-[0.18em]` (sizes: `text-[10.5px]` xs → `text-[12px]` lg) |
| Numeric tabular data | `font-mono tabular-nums` |

### Italic accent

Used sparingly inside display headings to mark the emphatic clause. Common patterns:

- `<span className="italic text-signal">intelligence layer</span>`
- `<span className="text-muted-foreground/85">subordinate clause.</span>` — sometimes the accent is dimmed rather than colored

Never italicize body paragraphs.

### Apostrophes inside JSX

Always escape as `&apos;` in JSX text content. React's `react/no-unescaped-entities` rule flags raw `'`. Double quotes can stay as `"` or `&quot;` — be consistent within a file.

---

## 4. Spacing & layout

### Container

Every section uses the same container:

```tsx
<div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
```

This is wrapped automatically by the `<Section>` component. For pages without `<Section>`, copy the same wrapper.

### Vertical rhythm

`<Section>` default vertical padding:

```
py-24 sm:py-28 lg:py-36
```

`<SubPageShell>` hero block (the page title):

```
pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-44
```

For non-default section padding, override via the `className` prop on `<Section>`. Common variants:

| Use | Padding |
|---|---|
| Standard section | `py-24 sm:py-28 lg:py-36` |
| Tighter (e.g. between two related blocks) | `py-20 sm:py-24 lg:py-28` |
| Heavy editorial section | `py-28 sm:py-32 lg:py-40` |

### Eyebrow → headline gap

`mb-10 sm:mb-12` between the eyebrow chip and the `<h2>` is the default. Don't push tighter than `mb-8`.

### Inter-paragraph gap (body copy)

`space-y-5` is the default. For long-form essays, `space-y-5` inside a section and `my-12 sm:my-14` for the `<hr>` between sections.

### Grid presets

- Standard 2-col split — `grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12`
- 3-col card row — `grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7`
- Asymmetric 12-col bento — `grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4` with each child spanning `lg:col-span-5` or `lg:col-span-7`
- Footer — `grid grid-cols-2 gap-10 sm:grid-cols-6 lg:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]`

---

## 5. Surfaces

The site uses three surface depths. Pick the right one — don't mix card backgrounds randomly.

| Surface | Bg | When to use |
|---|---|---|
| **Page** | `bg-background` | The base canvas. Default for everything. |
| **Section accent** | `bg-card/40` or `bg-card/60` | The integrations marquee strip, the tab panel, accent bands inside a section. Translucent so the canvas grain shows through. |
| **Card** | `bg-card` (opaque) or `bg-background/50` | Individual cards inside a section. The 0.5 version pulls the card slightly _below_ the section accent. |

For inputs and tiles inside a card, use `bg-background/40` so the card itself is still the visual anchor.

### Border + radius defaults

Cards: `rounded-2xl border border-border/60`
Pills / chips: `rounded-full border border-border/60` (or `border-signal/30` for active)
Tabs strip + panel: `rounded-xl border border-border/60`
Long-form essay page: no card — direct on `bg-background`
Image inside a card: `rounded-xl border border-border/60`

Radius scale (driven by `--radius: 0.5rem` base):

| Token | Tailwind | Pixels at default |
|---|---|---|
| `rounded-sm` | `0.3rem` | ~4.8px |
| `rounded-md` | `0.4rem` | ~6.4px |
| `rounded-lg` | `0.5rem` | 8px |
| `rounded-xl` | `0.7rem` | ~11.2px |
| `rounded-2xl` | `0.9rem` | ~14.4px |
| `rounded-3xl` | `1.1rem` | ~17.6px |
| `rounded-bento` | `1.75rem` (literal) | 28px |
| `rounded-full` | pill | — |

### Shadows

Use shadow utility classes that draw from the trimmed-blur tokens. Heavy shadows kill scroll perf — don't reach for arbitrary `shadow-2xl`.

| Class | When |
|---|---|
| `shadow-diffusion` / `shadow-diffusion-sm` | Big sections, hero blocks |
| `shadow-pill-floating` | Nav pill detached from scroll |
| `shadow-pill-grounded` | Nav pill on scroll-attached state |
| `shadow-card-lift` | Card hover (use sparingly) |
| `shadow-button-base` | Button base |

### Background decoration

Reusable utilities defined in `globals.css`:

- `.glow-signal` / `.glow-signal-strong` — radial signal-green ellipse glow (18% / 28%)
- `.section-rule` — 1px horizontal rule, transparent → border → transparent gradient
- `.scanline` — animated scan line (`scan` keyframe)
- `.pulse-signal` — pulsing box-shadow ring (3.4s, infinite). Apply to status dots
- `.shimmer-bar` — left-to-right shimmer overlay
- `.float-perpetual` — gentle 4px vertical drift, 5.6s

---

## 6. Iconography

**Phosphor icons** are the default. Import from `@phosphor-icons/react/dist/ssr/<Name>` so they SSR cleanly.

Sizing convention:

- Inline with body text: `size-3.5` (14px)
- Eyebrow chips: `size-3` (12px)
- Button leading icon: `size-3.5` or `size-4`
- Section pictograms: `size-5` (20px)
- Section hero icons: `size-6` (24px)

Weight convention:

- Default body usage: `weight="regular"`
- Filled chip / status: `weight="fill"`
- Heavy emphasis (e.g. checkmark inside a status row): `weight="bold"`

`lucide-react` is also installed and used by the shadcn `Button` + `BlogPostCard` (which uses `ArrowRight`). Don't mix freely — prefer Phosphor for marketing surfaces, Lucide only where the upstream shadcn pattern uses it.

---

## 7. Motion language

Configured in [`src/components/marketing/_motion.ts`](src/components/marketing/_motion.ts).

### Springs

| Const | Stiffness / damping / mass | When |
|---|---|---|
| `SPRING` | 100 / 20 / 0.8 | Default for section reveals, headline entrance, card hovers |
| `SPRING_FAST` | 280 / 24 / 0.6 | Quick UI feedback (toggle, tab pill slide) |
| `SPRING_BOUNCE` | 220 / 14 / 0.7 | Playful one-offs (only when intentional) |
| `EASE_OUT` | `[0.22, 1, 0.36, 1]` | Non-spring duration-based eases (filter blur-in, opacity) |

Default duration for non-spring transitions: **`0.35s ease-out`** for content swaps, **`0.5s spring`** for layout transitions.

### Critical motion rules

- **Never hide content with `opacity: 0`** at rest — content must be visible without JS / before hydration / during Playwright capture. Use `y: 16` → `y: 0` for reveals; opacity stays at 1.
- **Animate transforms only** for reveals (`y`, `scale`, `filter`). Never `top`/`left` (jank).
- **Hover lifts are ≤ -2px**. The site's register is restrained — `y: -5` reads as too eager.
- **`prefers-reduced-motion: reduce`** disables every animation, including marquees (parked at `translateX(-12.5%)`). Use the `useReducedMotion()` hook from motion to branch in components that have their own loops.
- **`whileInView` triggers** use `inViewOnce` (margin `0px 0px -8% 0px`, amount `0`, once `true`) so reveals start just before the user notices.

### Stagger

For grids of cards revealing in:

```tsx
transition={{ ...SPRING, delay: i * 0.06 }}
```

`0.06–0.08s` per index is the usual stagger.

### Layout transitions (motion's `layoutId`)

Used by `AnimatedTabs` for the sliding active pill. When you have multiple instances on one page, pass a unique `layoutGroupId` per instance so they don't share an indicator.

### Keyframe animations in globals.css

| Class | Keyframe | Duration | Use |
|---|---|---|---|
| `.scanline` | `scan` | 6s ease-in-out infinite | Vertical scan line over an element |
| `.pulse-signal` | `pulse-signal` | 3.4s ease-out infinite | Pulsing ring on status dots |
| `.marquee-row.marquee-row--left` | `marquee-left` | 150s linear infinite | Integrations marquee scrolling left |
| `.marquee-row.marquee-row--right` | `marquee-right` | 150s linear infinite | Integrations marquee scrolling right |
| `.shimmer-bar::after` | `shimmer` | 3.4s linear infinite | Shimmer sweep overlay |
| `.float-perpetual` | `float-up` | 5.6s ease-in-out infinite | Gentle 4px y-axis drift |

Marquee mobile slowdown: 220s on screens ≤ 768px.

---

## 8. Component patterns

### Eyebrow

The signature label that opens every section / page. Mono uppercase, 10px, 0.22em tracking, signal-green dot.

```tsx
<div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
  <span className="size-1 rounded-full bg-signal" />
  Always on · Reading the world
</div>
```

The `Section` and `SubPageShell` components wrap this for you — pass `eyebrow="..."`.

### `<Section>` — [`src/components/marketing/section.tsx`](src/components/marketing/section.tsx)

```tsx
<Section id="coverage" eyebrow="Always on · Reading the world" className="py-28 lg:py-40">
  <h2 className="text-display ...">...</h2>
  {/* content */}
</Section>
```

Props:

- `eyebrow` — optional, renders the eyebrow + 10–12mb gap before children
- `bleed` — drop the container's max-width when you want a full-bleed inner (e.g. marquees)
- `containerClassName` — override the inner container
- `className` — section padding overrides

Sections set `content-visibility: auto` and `contain-intrinsic-size: auto 700px` so off-screen sections skip paint. Don't remove these — they're a big perf win on long pages.

### `<SubPageShell>` — [`src/components/marketing/sub-page-shell.tsx`](src/components/marketing/sub-page-shell.tsx)

Used by every sub-page (`/about`, `/contact`, `/faq`, `/resources`, etc.). Renders nav, hero block, content slot, footer.

```tsx
<SubPageShell
  eyebrow="Resources"
  title="What we&apos;ve been"
  titleAccent="writing."
  lede="Long-form thinking from the Bonggy team…"
  narrow  // set for editorial pages (Privacy, Terms, FAQ, essays)
>
  {/* content */}
</SubPageShell>
```

`titleAccent` is the latter half of the title, rendered as `text-muted-foreground/85` so the contrast falls off — the brand pattern of "tightened display with a dimmed second half."

### `<SubPageBlock>` (in same file)

Editorial list item with a giant index number + tag + heading + body. Used in About / FAQ / Privacy.

### Buttons

Two button systems coexist:

**`CtaButton`** ([`src/components/marketing/cta-button.tsx`](src/components/marketing/cta-button.tsx)) — the marketing CTA with the colored gradient blur underneath. Used for "Strategize", "Get early access", etc.

```tsx
<CtaButton variant="signal" size="lg">Strategize</CtaButton>
```

Variants: `primary` (dark zinc base + emerald/signal/teal gradient blur), `signal` (same dark base but stronger signal gradient), `ghost` (border + bg-card/40). Sizes `sm` / `md` / `lg`. Mono uppercase 0.18em tracking, ArrowUpRight (Phosphor) trailing icon.

**Shadcn `Button`** ([`src/components/ui/button.tsx`](src/components/ui/button.tsx)) — the generic site button. Used for tertiary actions and inside the `BlogPostCard`. Variants `default` / `outline` / `secondary` / `ghost` / `destructive` / `link`. Smaller sizes (h-8 default, h-9 lg).

Use `CtaButton` for high-stakes marketing CTAs. Use `Button` for everything else. Don't mix the two side-by-side.

### Cards

**Default editorial card**:

```tsx
<div className="rounded-2xl border border-border/60 bg-card/60 p-7 hover:bg-card/80 transition-colors">
  ...
</div>
```

`bg-card/60` is the default. For a flatter look, drop to `bg-background/50` (e.g. mock cards inside a tab panel).

**Hover lift**: `hover:-translate-y-0.5` paired with `transition-all duration-300`. Don't go bigger than `-translate-y-1` (4px).

**`BlogPostCard`** ([`src/components/ui/blog-post-card.tsx`](src/components/ui/blog-post-card.tsx)) — two variants:

- `default` — wordmark eyebrow + display title + body + read-time row
- `featured` — 16:10 image on the left, eyebrow + display title + body + "Read" button on the right. Two-layer background tint on the image so it sits in the dark palette.

### Tabs

**`AnimatedTabs`** ([`src/components/ui/animated-tabs.tsx`](src/components/ui/animated-tabs.tsx))

Pills strip on top, motion-driven `layoutId` indicator slides between tabs (`SPRING_FAST`-ish — `type: "spring"`, `duration: 0.5`, `bounce: 0.18`). Content panel blurs in on switch (`filter: blur(6px)` → `0px`, `0.35s ease-out`).

```tsx
<AnimatedTabs
  tabs={[
    { id: "a", label: "Tab A", content: <Panel /> },
    ...
  ]}
  defaultTab="a"
  layoutGroupId="my-instance"  // required if more than one AnimatedTabs on a page
/>
```

Used currently in `use-cases.tsx` for the 7-role GTM section.

### Integrations marquee

Single row, 38 brand logos in `/public/logos/`. CSS `filter: brightness(0) invert(1)` flattens any source SVG to monochrome white. Hover-pause via `.marquee-track:hover .marquee-row { animation-play-state: paused }`. Edge mask via CSS `mask-image: linear-gradient(...)`.

Logo tile spec:

- `h-14 w-[140px]` (56px × 140px)
- `rounded-lg border border-white/[0.06] bg-white/[0.02]`
- 32px horizontal gap (`gap-8`)
- Image inside: `h-6 max-w-[100px] object-contain opacity-60` → `opacity-100` on hover

Section header for the marquee uses the standard eyebrow pattern (`Connects with your stack`).

### Nav — [`src/components/marketing/nav.tsx`](src/components/marketing/nav.tsx)

Floating pill at top of the page, signal-pulse left edge, mono link bar in the middle, Early Access CTA on the right. Link className shared across all entries (data-driven from a `LINKS` array). On scroll, pill transitions from `shadow-pill-floating` to `shadow-pill-grounded`.

### Footer — [`src/components/marketing/footer.tsx`](src/components/marketing/footer.tsx)

6-column grid on `lg` (`grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]`). Column header in mono uppercase 0.22em tracking @ 70% opacity. Links in `text-[13.5px] text-muted-foreground hover:text-foreground`. Brand block on the far left with the BonggyMark + tagline + status line.

### Dialog / Modal

Uses `<Dialog>` from `@/components/ui/dialog`. Wrapper background `bg-card`, max-width usually `420px` for forms (Early Access modal), `560px` for content-heavy modals.

---

## 9. Responsive breakpoints

Tailwind defaults — no custom breakpoints:

| Prefix | Min width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

Most sections collapse from 2/3-col grids to single column at `md` (768px and below). Display sizes step down by ~20–30%.

The integrations marquee slows from 150s → 220s on `< 768px` so the scroll doesn't feel chaotic on small screens.

---

## 10. Accessibility & performance

- **Color contrast** — all text passes WCAG AA against its surface. `--muted-foreground` is tuned per theme to clear 4.5:1 on `--background` and `--card`. Don't drop opacity below `/60` on text against a card surface.
- **Focus rings** — `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`. Always present on interactive elements.
- **`prefers-reduced-motion`** — respected by the marquee CSS and by motion components via `useReducedMotion()`. Decorative loops (`pulse-signal`, `scanline`, `float-perpetual`) should also be suppressed when extending the system.
- **`content-visibility: auto`** + `contain-intrinsic-size: auto 700px` is set on every `<Section>`. Off-screen sections skip paint/layout, scrollbar stays stable. Don't disable.
- **Image lazy-loading** — every `<img>` should have `loading="lazy"` (the marquee tiles already do).
- **SVG logos** — flattened to monochrome white via CSS filter, not by pre-processing. Saves needing to recolor each source.
- **Apostrophes in JSX text** — escape as `&apos;` to satisfy `react/no-unescaped-entities`.
- **`motion.div` prop types** — when extending an HTML element with motion props and spreading `...props`, use `Omit<HTMLMotionProps<"div">, "title">` (or whichever field collides) instead of `React.HTMLAttributes<HTMLDivElement>` — Motion's `onDrag` callback signature collides with React's `DragEventHandler`.

---

## 11. File / folder conventions

- `src/app/` — Next.js App Router. Each route is a folder with `page.tsx`. Sub-pages always wrap in `<SubPageShell>`.
- `src/components/marketing/` — opinionated, branded components used by the landing + sub-pages. `_motion.ts` holds shared motion constants.
- `src/components/ui/` — primitive components in the shadcn pattern (`button.tsx`, `card.tsx`, `dialog.tsx`, `animated-tabs.tsx`, `blog-post-card.tsx`, etc.). Style with `cva` for variants.
- `src/lib/utils.ts` — `cn(...)` helper that merges Tailwind classes.
- `public/logos/` — brand integration SVGs, monochrome-flattenable at render time.
- `public/` — favicon, manifest assets, anything served at root.

---

## 12. Quick "do this not that"

| Do | Don't |
|---|---|
| `bg-background`, `bg-card`, `text-foreground` | Hardcoded hex, `bg-white`, `text-black` |
| `text-display` + tight tracking on h2 | Default sans on display sizes (looks airy/marketing) |
| `font-mono uppercase tracking-[0.22em]` for eyebrows | Sentence-case sans labels |
| `<span className="italic text-signal">word</span>` inside headlines | Italic body paragraphs |
| Spring transitions on all interactive motion | `transition-all duration-200 ease-linear` |
| `whileHover={{ y: -2 }}` | `whileHover={{ scale: 1.05 }}` |
| One eyebrow per section, at the top | Multiple eyebrows inside one block |
| Phosphor `weight="regular"` icons | Mixed icon libraries in the same section |
| `rounded-2xl border-border/60 bg-card/60` for cards | Cards with full opacity + heavy shadow |
| Real routes in the sitemap | `#section` hashes (Google ignores them) |
| `prefers-reduced-motion` checks on every loop | Always-on infinite animations |
| Apostrophe escape `&apos;` in JSX | Raw `'` in JSX text content |

---

_Last updated: branch `main` as of the most recent design commit. Update this file in the same commit as any token / pattern change._
