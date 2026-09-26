# Bonggy

**Bonggy: align every rep's effort to revenue.** Bonggy is the orchestration
layer between rep effort and company goals. It reads what every rep does
across every tool, aligns it to the goal, nudges the drift, and reports one
connected picture from rep to CRO. It is read-only: it never sends,
sequences or acts on a rep's behalf.

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
| `/` | Landing page (Hero + integrations strip → The gap (`#coverage`) → What we do (`#what-we-do`) → How it works (`#how-it-works`) → Call-to-action) |
| `/resources` | Long-form notes index |
| `/resources/a-note-from-us` | The team's note on AI slop and connecting effort to revenue |
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
