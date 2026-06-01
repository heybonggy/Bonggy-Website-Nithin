# Bonggy — Product Overview

A reference describing what Bonggy is, the problem it solves, how it works, and where the line is drawn between what the software does and what the human does. Pair this with [DESIGN.md](DESIGN.md) when onboarding new team members, briefing partners, or writing copy.

---

## 1. The one-liner

**Bonggy is a continuous preparation layer for outbound sales.** It reads the public surface area of every account on your list, identifies what changed and why it matters, drafts the outreach grounded in that change, and queues everything for human approval before it sends.

We are not a CRM. We are not a sequencer. We are not an autopilot. We are the part of the sales job that is supposed to happen before a rep types a single word — automated, continuous, and built for humans to act on.

> _We read the world for you._

---

## 2. The problem we are pointed at

Modern outbound is failing for one reason: reps cannot read every account on their book every day. A rep with two hundred accounts physically cannot monitor LinkedIn posts, funding announcements, job board moves, conference attendance, G2 reviews, Reddit threads, podcast appearances, earnings prints, and product launches across all of them. So the work compresses into the only shape it can: template emails sent at volume to accounts that should never have been targeted, with the rep guessing the angle because there was no time to find a real one.

The downstream cost is well-known:

- Reply rates have been collapsing because inboxes are saturated with messages that nobody calibrated.
- Domain reputation burns when teams compensate for bad targeting with volume.
- The rep's job becomes 80% research + drafting and 20% conversation, when it should be the inverse.
- Sales managers coach on whether the rep researched the account, not on the conversation itself.
- Pipeline reviews get filled with gut feels instead of signal-backed narratives.

The job has always been about two things: **noticing first, and saying the right thing**. Reps don't fail because they don't know that. They fail because doing it at scale is physically impossible without a layer that handles the reading.

**Bonggy is that layer.**

---

## 3. What Bonggy does

Five modules, all wired into one continuous motion. Each module corresponds to a step in the journey from a public signal to a calibrated message a rep approves.

### Agents

Continuously monitor public signals across every account on a customer's list. Job changes, funding rounds, infrastructure migrations, hiring spikes, leadership announcements, product launches, customer reviews, podcast appearances, intent bursts. When several signals fire at one company, the agent groups them into a single account view rather than scattered alerts. Each account is scored against patterns from the customer's own closed-won deals — not vendor benchmarks. The agent also maps the buying committee so reps see who matters beyond the first contact.

### Lists

Dynamic account lists driven by saved queries, not static exports. Pull by signal cluster, playbook fit, or territory. Lists are ranked by intent so reps spend time on the accounts most likely to convert this quarter. Each list is paired with the right outreach motion (new-logo, expansion, win-back, displacement). New accounts that match the criteria get added; accounts that no longer fit get archived. The lists update themselves.

### Enrich

For every contact on a prioritized account, Bonggy builds a full profile: job history, posted content, publicly stated priorities, communication style. Tone is inferred from public activity so drafts land in a register the buyer actually responds to. Recent activity surfaces from LinkedIn, X, news features, and event listings — context that's current, not pulled from a stale data provider profile. If a deal needs stakeholders the rep hasn't reached yet, the committee gap gets flagged before the sequence goes out.

### Drafts

Multi-touch sequences generated for one specific buyer at one specific account, grounded in the signals that triggered the outreach. The rep picks a tone (direct, value-led, question-led, social-proof, competitive, advisory) that fits the relationship. Every draft is tagged and queued for human approval. **Nothing leaves the customer's domain without a rep sign-off.** Approved drafts push to Outreach, Apollo, or Salesloft — or export as CSV for manual workflows.

### Playbooks

The strategy layer above the agents. The customer defines their ICP from their actual closed-won data rather than a guess. Persona pain points get mapped per buyer role. Competitor positioning is captured so reps know why the customer wins head-to-head. Closed deals feed back into the system so signal weights and messaging patterns improve over time — the system gets sharper as the team uses it.

---

## 4. The bright lines — what Bonggy will never do

There is a version of this product that goes wrong, and we are explicit about not building it.

- **No autopilot.** Bonggy will never send an unsupervised message. The agent prepares; the human decides. This is a permanent design constraint, not a phase.
- **No autonomous booking.** No "meetings booked while you sleep." If a meeting was worth booking, a human reviewed the message that led to it.
- **No volume optimization.** Bonggy is anti-spray. The product optimizes for fewer, sharper sends — not throughput. If a customer asks us to make their motion higher-volume rather than higher-quality, that's outside the use case.
- **No replacement for the conversation.** We do not believe a machine can sell. Selling requires being a person in a room — a stance, a judgment, a relationship. We handle the preparation. The conversation stays human.
- **No bigger database.** We are not selling a list. Bonggy works on the list a customer already owns. We help them work it better, not buy more of it.

The reason we're firm on these is partly principled and partly practical. The thing that makes cold outreach work at all is the recipient's belief that a real person thought about them specifically. The moment that belief disappears, the channel collapses. We have a strong interest in not killing the channel.

---

## 5. Who it's for

Built **SDRs-first**, but the same continuous preparation layer pays off for the whole GTM motion. Seven named user types, each with a different reason to use Bonggy:

| Role | What changes |
|---|---|
| **SDR / BDR** _(the beachhead)_ | Walks into the day with the top accounts already researched and the first drafts already written. Reviews and sends instead of researching and writing. |
| **Account Executive** | Walks into every call with the account's full context — what changed, who's involved, what to lead with, what to avoid. |
| **Account Manager** | Catches renewal risk, expansion signals, and champion job-changes before they become a problem. |
| **Sales Manager** | Coaches on strategy, not on "did you research this account." The research is done. Pipeline reviews are signal-backed instead of gut-felt. |
| **RevOps** | One sync replaces the export-clean-upload waterfall. Every data point is field-level reviewable before it hits the CRM. Cost-per-field visibility across enrichment providers. |
| **Agency** | Runs signal-led outbound across every client from per-client workspaces. Same headcount, 3× the account coverage. Portfolio-wide pattern sharing. |
| **Founder doing their own sales** | Runs the motion an SDR would, without the hire. When the hire eventually happens, the system is already in place. |

The product's primary buyer is typically a VP of Sales or a Head of Revenue Operations. The primary user is the SDR. The two audiences see different surfaces of the same system.

---

## 6. The motion

A typical day in Bonggy, end to end:

**Overnight.** Agents read across the customer's account list. Signals fire. Accounts get scored. Lists update. Drafts get generated for the highest-intent accounts.

**Monday morning.** The rep opens Bonggy. Today's queue surfaces 5 accounts ranked by intent. Each card shows: what changed, who the decision-maker is, what the first draft says, and a confidence score.

**Pre-call (12 minutes out).** The rep opens an account brief. It already contains: the trigger timeline for the last 30 days, the current stakeholders mapped from public signals, three opening lines tailored to this call, and what not to mention.

**Approval flow.** Every drafted message is reviewable as a sequence. The rep edits, approves, or rejects per step. Approved messages push to the customer's sequencer (Outreach, Apollo, Salesloft) under the rep's identity. **Nothing sends without a rep clicking approve.**

**Pipeline review.** The manager opens a team view: which reps are stuck on which accounts, which angles are converting, which signals are over-indexed in the closed-won corpus. Coaching focuses on the conversation, not on whether the homework was done.

**Continuously.** Closed deals feed back. Signal weights tighten. The next Monday morning's queue is slightly sharper than the last.

---

## 7. The category

Bonggy is the **intelligence layer between signal and send**. We sit in the gap that already exists between databases (Apollo, ZoomInfo, Cognism, Crunchbase, etc.) and sequencers (Outreach, Apollo, Salesloft, Instantly, etc.). Neither side of that gap currently does the thinking — they do the data and the dispatch.

Our claim is that this gap is a new category, not a feature of an existing one. The economics of doing the reading job continuously at scale only became viable with AI; the cost curve for synthesizing fourteen sources every morning across two hundred accounts dropped by a factor that makes a real service commitment possible for the first time. We are not building cheaper software. We are building an entirely different shape of company: a continuous service that is priced like software because the unit economics now allow it.

Not a tool that sits on a rep's desk waiting to be used well.
**A service that runs.**

---

## 8. Integrations

Bonggy connects to the stack a customer already owns. The integrations marquee on the homepage shows ~40 partners with real SVG logos and another ~30 in text — covering the categories below.

**CRM** — Salesforce, HubSpot, Pipedrive, Attio, Bullhorn
**Sequencers** — Outreach, Salesloft, Apollo, Instantly, Smartlead, Lemlist, Reply.io
**Email & calendar** — Gmail, Outlook, Cal.com, Calendly, Chili Piper
**Comms** — Slack, Microsoft Teams, Discord, WhatsApp, Aircall, Dialpad, Twilio
**Productivity** — Notion, Linear, Asana, Jira, ClickUp, Monday, Airtable
**Storage** — Google Drive, Dropbox
**Data / databases** — Apollo, ZoomInfo, Lusha, Hunter, Cognism, LeadIQ, Clay, Crunchbase, PitchBook, CB Insights
**Intent & ABM** — 6sense, Demandbase, Warmly, Koala, RB2B, Common Room, UserGems
**Web / research** — Tavily, Firecrawl, Perplexity, Exa, Wappalyzer, BuiltWith, SimilarWeb
**Public records** — USASpending, SAM.gov, GovWin, SEC EDGAR, ClinicalTrials.gov, Definitive Healthcare, KLAS, Veeva
**HR / hiring signal** — Greenhouse, Lever, Workday
**Data warehouse / ETL** — Snowflake, BigQuery, Databricks, Census, Hightouch
**Social / public web** — LinkedIn (integration only — intentionally not shown publicly), X, Reddit, Hacker News, GitHub, Product Hunt, Substack
**Conversation intel** — Gong, Chorus, Fathom, Granola
**Automation** — Zapier, Webhooks

The list grows. The pattern is: anywhere a buyer leaves a public trail, Bonggy reads it. Anywhere a rep already sends from, Bonggy writes into it.

---

## 9. Principles we operate by

Three anti-rules that anchor product decisions:

1. **Anti-spray** — Every send earns the right to the next. We optimize for fewer, sharper messages.
2. **Anti-autopilot** — AI on the judgment, humans on the send. The reply lands on someone who has to live with it.
3. **Anti-database-of-everything** — We don't sell a bigger list. We help customers work the list they already have, better.

These translate to product constraints, not slogans:

- No automatic send action exists in the product. The send button requires a human click.
- The signal layer is open about what fired and why — no black-box scoring.
- The customer's data and brand are bounded to their workspace; agencies get per-client separation by default.
- Audit trail is permanent: every draft, every approval, every send is logged with the human who clicked.

---

## 10. Where we are heading

Bonggy is in private beta. The early customer base is small and intentional — sales teams who already know their motion and want to run it sharper, not teams looking for software to substitute for strategy. Closed-won feedback is being baked back into the signal-weighting layer.

Near-term product direction (in rough order of priority):

- **Account graph** — explicit account-to-account relationships (subsidiary, vendor, customer-of-customer) so signal in one place propagates intelligently to the related accounts.
- **Sequence-level coaching** — the manager view that suggests angle changes when a rep is stuck, surfaced from what other reps closed in similar shapes.
- **Cross-channel drafting** — the same signal-grounded draft, fitted automatically to email, LinkedIn, and voicemail rather than each channel re-written from scratch.
- **Closed-loop intent** — feed the customer's closed-lost reasons back into the prioritization layer so the system learns when an account looks great on paper but never converts in practice.
- **Public APIs** — let internal tools and data warehouses read the signal layer programmatically.

We are not racing to add modules. We are racing to make the preparation layer good enough that a rep would refuse to start a Monday morning without it.

---

## 11. The team

Three salespeople from Bengaluru. We did the job for a living before we started this company — cold calls, cold emails, conference dinners, missed quarters, hit quarters. The complaint about the stack and the observation that the rep who wins is the rep who notices first, not the rep with the fanciest tools, both come from years of having the same conversation with each other over coffee in Indiranagar and beers in Koramangala. We met on a sales floor. We never stopped meeting after that floor scattered. Eventually you can only have a conversation that many times before you either stop having it or do something about it.

We did the second one.

---

_Last updated alongside the most recent product or positioning commit. If the bright lines in §4, the integrations in §8, or the principles in §9 change, update this file in the same commit._
