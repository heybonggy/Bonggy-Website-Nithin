# Bonggy

**Agents for the work before the conversation.** Bonggy is a studio where GTM
teams build their own sales agents and groups of agents. Agents model the
market, research accounts and draft the work (briefs, account plans,
messages). Nothing goes out without human approval. Every agent's work ties
back to a revenue goal through the loop Track, Align, Nudge, Report, and
agents build shared memory from everything they learn.

This repo is the marketing site plus early-access and careers capture. See
[PRODUCT.md](./PRODUCT.md) for the full product overview.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind v4** + **shadcn/ui** (base-nova preset)
- **Motion 12** (framer-motion) for animations
- **Phosphor Icons** for iconography

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Routes

| Route | What's there |
|---|---|
| `/` | Landing page: Hero with scripted demo → Roles (`#what-we-do`) → Build your own bots (`#build`) → Memory (`#memory`) → Analytics (`#analytics`) → The loop (`#how-it-works`) → Human in the loop (`#trust`) → Pricing (`#pricing`) → FAQ (`#faq`) → CTA |
| `/resources` | Long-form notes index |
| `/resources/a-note-from-us` | The team's note on AI slop and agents for the work before the conversation |
| `/about` | Mission and principles |
| `/contact` | 30-min call link + email |
| `/careers` | Pitch form (writes to Sheets) |
| `/faq` | Q&As + FAQPage JSON-LD |
| `/privacy` `/terms` `/security` | Legal + trust pages |

`/fix` was removed and permanently redirects (308) to `/` (see `next.config.ts`).

## Forms

Both `Early Access` (in nav modal) and `Careers` (on `/careers`) write to a
single Google Spreadsheet with two tabs (`Early Access`, `Careers`) via a
Google Apps Script web-app webhook.

The webhook URL lives in `src/lib/sheets.ts`.

Full setup: [INTEGRATIONS.md](./INTEGRATIONS.md)

## Deploy

Push to `main`. Vercel imports the repo and builds — no environment variables
required (the Sheets webhook URL is hardcoded in `src/lib/sheets.ts`).

## Project layout

```
src/
├── app/
│   ├── (each route)/page.tsx     # one file per page
│   ├── api/early-access/route.ts # → src/lib/sheets.ts
│   ├── api/careers/route.ts      # → src/lib/sheets.ts
│   ├── layout.tsx                # root layout + SEO metadata
│   ├── sitemap.ts robots.ts manifest.ts icon.svg apple-icon.tsx
│   └── globals.css               # design tokens, utilities
├── components/
│   ├── marketing/                # all section + page components
│   └── ui/                       # shadcn primitives
└── lib/
    ├── sheets.ts                 # webhook URL + appendToSheet helper
    └── utils.ts                  # cn() utility
```
