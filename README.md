# Bonggy

**The agent workspace for sales, RevOps and marketing teams.** Teams build
bots from a sentence. Each bot runs a flow with six parts (trigger, context,
steps, approval, output, goal), every flow maps to a revenue goal, and a person
approves anything a customer would see.

This repo is the marketing site plus careers capture. See
[PRODUCT.md](./PRODUCT.md) for the product and [DESIGN.md](./DESIGN.md) for
the "Paper" design system.

## Stack

- **Next.js 16** (App Router, Turbopack), React 19, TypeScript
- **Tailwind v4**, CSS-first tokens in `src/app/globals.css`; shadcn (base-nova) on `@base-ui/react`
- **Motion 12** for animation; **@number-flow/react** for the analytics totals
- **Phosphor Icons**; **Geist** via `next/font`

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

Screenshots at 375/768/1280/1440 plus a reduced-motion pass (dev or `next start`
must be running; `CHROME_PATH` is optional):

```bash
URL=http://localhost:3000 node scripts/screenshot.mjs
```

### Brand assets

Every icon, the press-kit logo files and the bot avatars are generated from the
geometry the components draw (`src/lib/logo-geometry.ts`, `src/lib/bot-geometry.ts`).
Nothing in `public/` is drawn by hand. Change the mark or a bot look, then:

```bash
npm run brand        # rewrites public/ and src/content/bot-palette.ts
```

### SEO checks

Runs against a built site and exits non-zero on any failure: titles and
descriptions within length and matching `src/content`, one `<h1>` per page and
no repeats, absolute canonicals, OG images that are real 1200×630 PNGs, JSON-LD
that parses with the expected types, markdown twins that resolve, the icon
sizes, the robots tokens, and a scan for words the site doesn't use.

```bash
npm run build && npm start &
npm run check:seo                      # defaults to http://localhost:3000
BASE=https://www.bonggy.com npm run check:seo
```

Put any names that must never be committed in `.denylist` (one per line,
gitignored); the scan picks them up without them ever entering the repo.

### IndexNow

Tells Bing and the other IndexNow participants that URLs changed, so a new page
is crawled in hours rather than whenever a bot next wanders past.

```bash
npm run indexnow
```

The key lives in `src/content/indexnow.ts` and is served from
`public/<key>.txt`. It is **not** a secret — IndexNow requires it to be publicly
readable at that path, which is how the endpoint proves we control the domain.
All it grants is submitting URLs on this domain for recrawl.

To rotate it: generate a new one
(`node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`),
write it to `public/<key>.txt`, update `INDEXNOW_KEY`, delete the old file, and
deploy before submitting. `INDEXNOW_KEY=<key> npm run indexnow` overrides the
committed value while rotating.

## Routes

| Route | What's there |
|---|---|
| `/` | Hero (a bot builds from your sentence, `#top`) → Teams (`#teams`) → Flows (`#flows`) → A bot for every job (`#agents`) → Groups (`#groups`) → Approvals and bright lines (`#approvals`) → Analytics (`#analytics`) → Company context (`#context`) → How it works (`#how-it-works`) → Pricing (`#pricing`) → FAQ (`#faq`) → Final CTA |
| `/about` | Mission and principles |
| `/contact` | Strategy call link + email |
| `/careers` | Pitch form (writes to Sheets) |
| `/faq` | Q&As + FAQPage JSON-LD |
| `/security` | Bright lines and data handling (softened, pending engineering) |
| `/resources`, `/resources/a-note-from-us` | Notes index and the team's essay |
| `/privacy`, `/terms` | Legal pages (drafts for review in `docs/legal-drafts.md`) |
| `/bots`, `/bots/<slug>` | All eleven bots by team, and a page each |
| `/brand` | Press kit: logo, colours, bot avatars, boilerplate |

Machine-readable:

| Route | What's there |
|---|---|
| `/llms.txt` | What Bonggy is, the key facts, and links to every markdown twin |
| `/llms-full.txt` | Every twin in one file |
| `<path>.md` | The markdown twin of any page (`/faq.md`, `/index.md`, `/bots/unstick.md`) |
| `/bots.json` | The bot catalog as data (CORS-open) |
| `/og/<slug>` | The OG image for a page or a bot |

Redirects (308): `/fix` → `/`, `/pricing` → `/#pricing`, `/use-cases` →
`/#teams` (see `next.config.ts`).

## Forms

The careers form (`/careers`) writes to a Google Spreadsheet (tab `Careers`)
through a Google Apps Script webhook. The URL lives in `src/lib/sheets.ts`.
Every call CTA ("Book a strategy call") points at one booking link, `CAL_LINK`
in `src/components/marketing/cta-button.tsx`. Setup: [INTEGRATIONS.md](./INTEGRATIONS.md).

## Deploy

Push to `main`. Vercel builds it; no environment variables are required.

## Project layout

```
src/
├── app/                         # one folder per route, api/, layout, metadata routes
│   └── globals.css              # Paper tokens, utilities, keyframes, reduced motion
├── components/
│   ├── marketing/               # header, footer, homepage sections, sub-page shell
│   ├── product-mock/            # drawn product UI + data.ts + demo/ (scripted player)
│   └── ui/                      # logo (planet mark), bot characters, shadcn primitives
└── lib/                         # metadata, sheets (careers), utils (cn)
```
