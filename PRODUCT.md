# Bonggy — Product Overview

A reference describing what Bonggy is, the problem it solves, how it works, and where the line is drawn between what the software does and what the human does. Pair this with [DESIGN.md](DESIGN.md) when onboarding new team members, briefing partners, or writing copy.

---

## 1. The one-liner

**Bonggy: align every rep's effort to revenue.**

Bonggy is the orchestration layer between rep effort and company goals. It tracks what every rep does across every tool, aligns each action to the revenue goal it serves, nudges the work that's drifting, and proves what's working, with one connected picture from rep to CRO.

Bonggy is **read-only**. It doesn't send, doesn't sequence, and doesn't act on a rep's behalf. It reads the effort your team already makes and points it at revenue. The work stays human; the guesswork goes.

We are not a CRM. We are not a sequencer. We are not an AI SDR. We are the layer that makes the stack make sense.

---

## 2. The problem we are pointed at

GTM teams generate enormous effort every day: sends, calls, meetings, notes, Slack threads, deals moved. Almost none of it is connected to the number it's supposed to serve.

- **Revenue at the top, ten thousand actions at the bottom, nothing in between.** Your CRM shows pipeline. Your sequencer shows sends. None of them tell you whether the effort actually points at what you're trying to win this quarter.
- **The effort is scattered and invisible.** A rep works across eight tools all day. The work is real, but it's spread across those tools, invisible to the people above them, and disconnected from the goal at the top.
- **Goals dilute on the way down.** A leader sets a strategy; by the time it reaches the rep, it's a vague instruction. Managers end up coaching on activity instead of strategy.
- **More AI sending makes it worse.** Every quarter brings another tool that sends more, drafts more, books more. The result is more activity pointed in more directions, and still no way to tell which of it moved the number.

Volume was never the bottleneck. Alignment was.

**Bonggy is the layer that connects the two.**

---

## 3. What Bonggy does

Four steps, running continuously. This is the same Track / Align / Nudge / Report sequence shown in the homepage's "How it works" section.

### 01 · Track the effort

Every action, across every tool. Sends, calls, meetings, notes, the Slack thread. The real work, not the summary reps backfill into the CRM. Bonggy reads effort from the tools a team already runs, so there's no new data to buy and no new workflow to adopt.

### 02 · Align it to the goal

Each action is mapped to the revenue goal it serves: on-goal, off-goal, or going nowhere. Effort rolls up at the account level, so it's clear which work supports this quarter's strategy and which doesn't.

### 03 · Nudge the drift

When a rep slides off strategy, Bonggy flags it and points them back before the quarter is lost. For example: "Sixty percent of your week is off-ICP. Here are five accounts that fit." The nudge surfaces the thinking; the doing stays with the rep.

### 04 · Report to everyone

The same truth at every altitude, rep to CRO. The rep sees what counts. The manager sees who is on-strategy. The CRO sees where the effort leaks. When one rep finds a play that works, the rest of the team can see it and run it too.

---

## 4. The bright lines — what Bonggy will never do

- **Never sends or acts.** Bonggy doesn't send, sequence, book, or act on a rep's behalf. It reads, aligns, and reports. This is a permanent design constraint, not a phase.
- **Never generates outreach.** We don't write emails and we don't add a single message to the pile. We are not an AI SDR.
- **Never replaces the rep.** The conversation, the relationship, and the judgment stay with the rep.
- **Never ranks reps against each other.** We measure effort against revenue, not reps against each other. No leaderboard, no scoreboard, no new stick for a manager to swing. The picture is shared, not weaponized: whatever a manager sees, the rep sees too.
- **Never trains on customer data.** Account context, contact lists, and notes don't train any foundation model and aren't pooled across customers.

---

## 5. Who it's for

The whole GTM motion: anyone whose effort should roll up to revenue. Expansion and retention count the same as new logos.

| Role | What changes |
|---|---|
| **SDR / BDR / AE** | Finally sees which of their work counts toward the goal, and gets pointed back when they drift, instead of working hard with no way to show it mattered. |
| **Account Manager / CS** | Renewal and expansion effort is tied to the revenue goal it serves, the same as new business. |
| **Sales Manager** | Coaches on strategy instead of activity counts. Sees who is on-strategy and where to step in, without a leaderboard. |
| **CRO / VP Sales** | One connected picture of where the team's effort goes and where it leaks against the goal they set. |
| **RevOps** | Effort across the stack structured into one account-level, revenue-aligned view, without replacing any tool. |

The primary buyer is typically a VP of Sales, CRO, or Head of Revenue Operations. Every seat sees the same picture.

---

## 6. How teams start

- **Early access, in waves.** We onboard in small cohorts because we'd rather onboard ten teams properly than a hundred poorly. Teams request access through the Early-access form on the site.
- **A 30-minute strategy session.** We calibrate Bonggy on the team's real goal and real effort, live, and show what's on-revenue and what's drifting this week. If it's not obviously useful in the first ten minutes, we say so.

---

## 7. Integrations

Bonggy connects to the tools a team already runs and **reads** the effort they already log. It requests only the permissions needed to read. It doesn't write back, send, or act through any of them.

Effort sources include CRM activity, sequencer sends, email, calendar, Slack threads, call recordings, meeting notes, pipeline edits, deal stages, account notes, task logs, support tickets, and renewal data.

Representative tools (the homepage integrations strip shows the full logo set):

- **CRM**: Salesforce, HubSpot, Pipedrive
- **Sequencers** (read-only): Outreach, Salesloft, Apollo
- **Email & calendar**: Gmail, Outlook, Calendly, Cal.com
- **Comms & calls**: Slack, Microsoft Teams, Aircall, Twilio
- **Call recording & notes**: Gong, Fathom, Notion
- **Work management**: Asana, Jira, Linear, ClickUp, Monday, Airtable
- **Data warehouse**: Snowflake, BigQuery, Databricks
- **Automation**: Zapier, Webhooks

---

## 8. Principles we operate by

1. **Alignment, not volume.** We don't help your team do more. We make sure the effort they already make points at revenue.
2. **Read, don't act.** Bonggy reads what your team does and aligns it. It never sends or acts in their place. The work stays human.
3. **Shared, not weaponized.** We measure effort against revenue, never reps against each other. The same picture, rep to CRO. No leaderboard.

These translate to product constraints, not slogans:

- No send, sequence, or write-back action exists in the product.
- Permissions are scoped to read-only.
- The same view a manager sees is visible to the rep it describes.
- Customer data stays in the customer's tenant and chosen region. It's encrypted in transit (TLS 1.3) and at rest (AES-256), exportable at any time, and kept for a 30-day grace period after cancellation before deletion. SOC 2 Type II is on the path for the first enterprise cohort.

---

## 9. The team

Three salespeople from Bengaluru. We did the job for a living before we started this company — cold calls, cold emails, conference dinners, missed quarters, hit quarters. We watched good reps work hard all week with no way to show that the work counted, and watched goals set at the top dilute before they reached the floor. We had that conversation over coffee in Indiranagar and beers in Koramangala for years. We met on a sales floor. We never stopped meeting after that floor scattered. Eventually you can only have a conversation that many times before you either stop having it or do something about it.

We did the second one.

---

_Update this file in the same commit as any product or positioning change. In particular, keep the bright lines (§4), integrations (§7) and principles (§8) in sync with the site._
