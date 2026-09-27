# Bonggy: product overview

What Bonggy is, who it's for, how it works, and where the line sits between what bots do and what people do. Pair this with [DESIGN.md](DESIGN.md) when onboarding.

---

## 1. The one-liner

**Build the bots your GTM team needs, running the flows you want, pointed at revenue.**

Bonggy is the agent workspace for sales, RevOps and marketing teams. You describe the work in a sentence; a bot turns it into a flow tied to a revenue goal, and a person approves anything a customer would see.

Every bot is a **modeller**, a **researcher** or a **value generator**. Bonggy doesn't blast outreach, and it isn't a generic chatbot.

---

## 2. The problem

- **The work before the conversation is huge, manual and invisible.** Mapping the market, researching the account, cleaning the pipeline, finding the angle, writing the brief.
- **Tools made it louder, not better.** Every quarter brings another tool that sends more and drafts more. The result is slop nobody calibrated and nobody would stand behind.
- **None of it connects to the number.** The CRM shows pipeline and the sequencer shows sends, but nothing says whether the work points at what the team is trying to win this quarter.
- **Generic agent tools make you do the hard part.** You bring the context, invent the process and remember the guardrails yourself.

Volume was never the bottleneck. Good prep, pointed at the right goal, was.

---

## 3. How it works

### Bots

A bot does one job for a team. You start from a preset ("Flows teams have built") or from a sentence. **Either way, the flow is yours.**

| Team | Example bots |
|---|---|
| Sales | Account Researcher, Deal Coach, Brief Writer, Champion Tracker |
| RevOps | Pipeline Watch, CRM Hygiene, Forecast Prep |
| Marketing | Market Modeller, Campaign Researcher, Content Drafter, Inbound Router |

### Flows

Every bot runs a flow with six parts, all editable at any time:

1. **Trigger**: when it runs (a schedule, a new lead, a job change).
2. **Context**: what it reads (company context plus connected sources).
3. **Steps**: what it does, in order.
4. **Approval**: who approves what, before which action.
5. **Output**: where the work lands (chat, a CRM task, a channel post).
6. **Goal**: the revenue goal it answers to.

**Hard limits** are rules in your own words ("never email anyone"). They become part of the flow, and the bot can't cross them. Every run leaves a **receipt**: what it read, what it did, and what it didn't send.

### Groups

Bots from different teams can share a group and hand off work. Marketing's research on what customers say reaches the sales bots working those deals, without anyone copying it across.

### Approvals

One inbox for everything that needs a person, what ran on its own, and what's held.

### Analytics

Runs, approvals and estimated hours per bot, with the revenue goal behind each, filterable by team. Every fact a bot uses links back to its source.

### Company context

The defaults every bot reads first (ICP, tone, deal stages, never-rules), with overrides where a team works differently.

### The loop

1. **Track**: bots read activity across the tools you connect.
2. **Align**: every action maps to a revenue goal.
3. **Nudge**: drift gets flagged with a next move, and a person decides.
4. **Report**: one picture from rep to CRO, with no leaderboards.

---

## 4. The bright lines

- **Approval by action.** Anything customer-facing (emails, posts, sequencer pushes, published content) needs a person. Internal output (a brief in chat, a Slack summary) can run without approval if your team chooses.
- **No volume blasting.** Marketing bots draft and research; they don't mass-send. Campaign sends stay in your own tools, after approval.
- **No leaderboards.** Work is measured against revenue, never person against person.
- **Humans stay in charge.** Bots work only through the tools and permissions you connect.

Data handling, until engineering confirms specifics: built for read-scoped permissions, encryption in transit and at rest, and no training on your data. SOC 2 Type II: on the path, not attained.

---

## 5. Who it's for

Sales, RevOps and marketing teams. It usually lands with one team's flows and spreads as other teams build their own. Typical buyers: CRO, VP Sales, Head of RevOps, Head of Marketing.

---

## 6. How teams start

- **A strategy call** where we map one flow with the team on real work.
- **Onboarding in small groups**, so every team gets set up properly.

---

## 7. Pricing

Pricing is based on active bots plus usage. Flow runs count toward usage. We're setting plans with our first teams, so there are no public numbers yet.

---

## 8. Integrations

Bots work with the tools a team already uses: CRM, email, calendar, Slack and call notes, and only through the permissions a team connects.

_TODO: confirm which named integrations are live before listing any vendor on the site._

---

## 9. Principles

1. **Alignment, not volume.** Every flow ties back to a revenue goal.
2. **Humans approve.** Bots research and draft; people decide what customers see.
3. **Shared, not weaponized.** The same picture, rep to CRO. No leaderboard.
4. **Your process, not ours.** Teams design their own flows.

---

## 10. The team

Three salespeople from Bengaluru. We did the job for a living before we started this company: cold calls, cold emails, conference dinners, missed quarters, hit quarters. We watched good reps do hours of prep with no way to show it counted, and watched the tools around them get louder instead of better. We had that conversation over coffee in Indiranagar and beers in Koramangala for years. Eventually you can only have a conversation that many times before you either stop having it or do something about it.

We did the second one.

---

_Update this file in the same commit as any product or positioning change. Keep the bright lines (§4), pricing (§7) and integrations (§8) in sync with the site._
