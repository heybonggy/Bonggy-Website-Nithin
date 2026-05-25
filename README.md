# Bonggy

The command centre for sales teams. Marketing site + early-access capture.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind v4** + **shadcn/ui** (base-nova preset)
- **Motion 12** (framer-motion) for animations
- **Phosphor Icons** for iconography
- **cobe** for the rotating globe in the coverage section

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Routes

| Route | What's there |
|---|---|
| `/` | Landing page (Hero → Coverage → How It Works → Problem → Reframe → Fix → Proof → Use Cases → Close) |
| `/how-it-works` | Long-form: 4 steps from prompt to running agent |
| `/fix` | Watch / Cluster / Draft / Send breakdown |
| `/use-cases` | 12 GTM roles + 110 plays |
| `/about` | Mission and principles |
| `/contact` | 30-min call link + email |
| `/careers` | Pitch form (writes to Sheets) |
| `/faq` | 9 conversion-aware Q&As + FAQPage JSON-LD |
| `/privacy` `/terms` `/security` | Legal + trust pages |

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
│   ├── sitemap.ts robots.ts manifest.ts icon.svg apple-icon.svg
│   └── globals.css               # design tokens, utilities
├── components/
│   ├── marketing/                # all section + page components
│   └── ui/                       # shadcn primitives
└── lib/
    ├── sheets.ts                 # webhook URL + appendToSheet helper
    └── utils.ts                  # cn() utility
```
