# Bonggy — Product Overview

A reference describing what Bonggy is, the problem it solves, how it works, and where the line is drawn between what the agents do and what the human does. Pair this with [DESIGN.md](DESIGN.md) when onboarding new team members, briefing partners, or writing copy.

---

## 1. The one-liner

**Agents for the work before the conversation. You still have the conversation.**

Bonggy is a studio where GTM teams build their own agents and groups of agents. Agents model the market, research accounts and draft the work: briefs, account plans and messages. Nothing goes out without human approval. Every agent's work ties back to a revenue goal through one loop (Track, Align, Nudge, Report), and agents build shared memory from everything they learn.

Bonggy is a GTM modeller, researcher and value generator. It is **not** an AI SDR, not a generic chatbot, and it doesn't blast outreach.

---

## 2. The problem we are pointed at

- **The work before the conversation is huge, manual and invisible.** Mapping the market, researching the account, finding the angle, writing the brief. Reps do it between calls, or skip it.
- **AI made it worse, not better.** Every quarter brings another tool that sends more and drafts more. The pitch is volume; the result is slop that nobody calibrated and nobody would stand behind.
- **None of it connects to the number.** Your CRM shows pipeline. Your sequencer shows sends. Nothing tells you whether the work actually points at what you're trying to win this quarter.

Volume was never the bottleneck. Good prep, pointed at the right goal, was.

---

## 3. What Bonggy does

### Three roles

| Role | What it does |
|---|---|
| **Modeller** | Maps your market, ICP, goals and plays. |
| **Researcher** | Digs into accounts, signals and people. |
| **Value generator** | Turns it into briefs, drafts and nudges your team can use. |

Teams start from templates (for example Market Modeller, Account Researcher, Brief Writer) or **describe any job in a new chat**. The agent confirms what it will do and which revenue goal it serves, then appears in the sidebar.

### Groups

Bots can be grouped into **pods** (for example an "Enterprise pod") that work toward one revenue goal and share memory. Research flows in; drafts flow out to people for review.

### Shared memory

Agents build shared, dynamic memory from every conversation, call note and deal: accounts, people, objections and wins. What one agent learns, the rest of the pod can use, so the tenth brief is smarter than the first.

### The loop every bot runs on

1. **Track**: bots read activity across your tools.
2. **Align**: map every action to a revenue goal.
3. **Nudge**: flag drift and suggest the next move. A person decides.
4. **Report**: one shared picture from rep to CRO.

### Analytics

One view of what each bot is doing, what it knows, which revenue goal its work maps to, and where effort is drifting (for example, a pod spending most of its effort on accounts outside the ICP).

---

### The three screens

The product UI is three screens in one app shell (a sidebar of agents and groups, a top bar, a main pane). The homepage previews are built from the same components (`src/components/product-mock`).

1. **Agents**: one chat per agent or group. You ask; the agent shows what it's reading, then returns work as cards (an account brief, a draft that needs approval) with the revenue goal it maps to.
2. **Analytics**: activity per agent, what each agent has learned (dated memory), work mapped to revenue goals, and drift alerts.
3. **Company context**: company, what you sell, ideal customer, revenue goals, voice and connected tools. Every agent reads this first.

---

## 4. The bright lines

- **Humans approve anything that goes out.** Agents draft. Nothing is sent, posted or written to a customer-facing channel without a person on the team approving it. Approved drafts go out from the rep's connected account or get pushed to the team's own email or sequencer.
- **Not an AI SDR. No volume blasting.** We optimise for better prep and fewer, sharper messages, never throughput.
- **No leaderboards.** We measure work against revenue, never reps against each other. The picture is shared, not weaponized.
- **Humans stay in charge.** Agents don't replace the rep. The conversation, the relationship and the judgment stay human.
- **Agents only use the permissions you connect.** There's a full log of what each agent did, and no training on your data.

---

## 5. Who it's for

The whole GTM motion: SDRs, AEs, account managers, CS, managers, RevOps and the CRO. Anyone whose work should roll up to revenue. Renewal and expansion agents count the same as new-logo ones.

The typical buyer is a VP of Sales, CRO or Head of RevOps. Every seat sees the same picture.

---

## 6. How teams start

- **Early access, in waves.** We onboard in small cohorts so every team gets set up properly.
- **A 30-minute call.** We map the market with the team, sketch the first agents they'd build, and show how that work ties to their revenue goal.

---

## 7. Pricing

Pay for the agents you run: pricing is based on **active agents plus usage**. Plans are being set with early-access teams; there are no public numbers yet.

---

## 8. Integrations

Agents work with the tools a team already uses: CRM, email, calendar, Slack and call notes. Agents only use the permissions a team connects.

_TODO: confirm which named integrations are live before listing any. None of the brand logos previously shown on the site are confirmed integrations._

---

## 9. Principles

1. **Alignment, not volume.** Every agent's work ties back to a revenue goal.
2. **Humans approve.** Agents research and draft; people decide what goes out.
3. **Shared, not weaponized.** The same picture, rep to CRO. No leaderboard.

---

## 10. The team

Three salespeople from Bengaluru. We did the job for a living before we started this company — cold calls, cold emails, conference dinners, missed quarters, hit quarters. We watched good reps do hours of prep with no way to show it counted, and watched the AI tools around them get louder instead of better. We had that conversation over coffee in Indiranagar and beers in Koramangala for years. We met on a sales floor. We never stopped meeting after that floor scattered. Eventually you can only have a conversation that many times before you either stop having it or do something about it.

We did the second one.

---

_Update this file in the same commit as any product or positioning change. In particular, keep the bright lines (§4), integrations (§8) and principles (§9) in sync with the site._
