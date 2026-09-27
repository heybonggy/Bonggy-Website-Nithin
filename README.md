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

## Routes

| Route | What's there |
|---|---|
| `/` | Hero (a bot builds from your sentence, `#top`) → Teams (`#what-we-do`) → Flows (`#flows`) → A bot for every job (`#agents`) → Groups (`#groups`) → Approvals and bright lines (`#approvals`) → Analytics (`#analytics`) → Company context (`#context`) → How it works (`#how-it-works`) → Pricing (`#pricing`) → FAQ (`#faq`) → Final CTA |
| `/about` | Mission and principles |
| `/contact` | Strategy call link + email |
| `/careers` | Pitch form (writes to Sheets) |
| `/faq` | Q&As + FAQPage JSON-LD |
| `/security` | Bright lines and data handling (softened, pending engineering) |
| `/resources`, `/resources/a-note-from-us` | Notes index and the team's essay |
| `/privacy`, `/terms` | Legal pages (drafts for review in `docs/legal-drafts.md`) |

`/fix` permanently redirects (308) to `/` (see `next.config.ts`).

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
