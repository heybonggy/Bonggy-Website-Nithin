"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { BonggyMark } from "@/components/BonggyMark";

type UseCase = { title: string; body: string };
type RoleSection = { slug: string; role: string; intro: string; cases: UseCase[] };

const USE_CASES: RoleSection[] = [
  {
    slug: "sdr-bdr",
    role: "SDR / BDR",
    intro:
      "Measured on meetings booked. The day is spent on everything that comes before a meeting gets booked.",
    cases: [
      { title: "Daily account prioritization", body: "Every morning, Bonggy surfaces the accounts worth reaching out to today based on what changed overnight — a hire, a funding close, a job posting, a news mention. Rep starts the day knowing exactly where to focus instead of deciding from a static list." },
      { title: "Trigger-based first outreach", body: "A company raises a Series B. A new VP of Sales joins. A competitor's contract is up for renewal. Bonggy catches the trigger, researches the account, and drafts a first message with that event as the hook before the rep even opens their laptop." },
      { title: "Job change tracking", body: "A warm contact moves to a new company. Bonggy detects the change, finds their new role and contact details, and surfaces a draft that acknowledges the move and reopens the conversation at the new account — one of the highest-converting outreach moments in sales." },
      { title: "Contact discovery within target accounts", body: "Rep has a company to go after but doesn't know who to contact. Bonggy identifies the right people by title, seniority, and department, enriches their profiles, and finds verified contact details — without the rep manually searching LinkedIn." },
      { title: "Pre-call research", body: "Before a cold call, Bonggy pulls together everything relevant about the company and the specific contact — what they've posted, what the company is doing, recent news, headcount changes — so the rep walks in knowing enough to have a real conversation." },
      { title: "Multi-threading into accounts", body: "Rep is working one contact at an account. Bonggy identifies two or three other stakeholders worth reaching in parallel — different angles, different hooks — and drafts separate messages for each. Rep reviews and sends, covering the account properly without triple the prep time." },
      { title: "Re-engagement of cold accounts", body: "An account that went dark six months ago just posted three engineering roles and announced a new product line. Bonggy flags it, explains why it's worth revisiting, and drafts a re-engagement message with fresh context rather than a generic 'just checking in.'" },
      { title: "Competitor displacement outreach", body: "Companies using a competitor's product and showing signs of dissatisfaction — negative reviews, churned employees posting publicly, leadership changes at the vendor — get surfaced with a draft tailored to the displacement opportunity." },
      { title: "Event-based outreach", body: "A target company is attending or sponsoring an industry event. Bonggy drafts an outreach message tied to the event — before, during, or after — giving the rep a natural reason to reach out without it feeling cold." },
      { title: "Industry-wide timing plays", body: "A regulation changes. A market report drops. An industry-wide event creates urgency across many accounts at once. Bonggy identifies which accounts in the rep's territory are most affected and drafts outreach that ties directly to the moment." },
      { title: "Follow-up sequence management", body: "After a first message goes out with no response, Bonggy drafts follow-ups that add new context each time — a new development at the company, a relevant case study, a different angle — instead of sending the same message again." },
      { title: "List enrichment and cleanup", body: "Rep has a raw list of company names or domains. Bonggy enriches every record — contacts, emails, headcount, tech they use, recent news — and removes companies that don't fit before the rep spends time on them." },
      { title: "LinkedIn engagement intelligence", body: "Bonggy scans LinkedIn activity of target prospects — what they're commenting on, what they're posting, what they engage with — and surfaces openings for a relevant social touch or DM before a cold email." },
      { title: "Inbound MQL enrichment", body: "A form fill comes in. Bonggy enriches the lead with company context, role context, and a draft response in seconds — so the SDR replies to inbound while it's still warm, not 48 hours later." },
      { title: "Conference attendee outreach", body: "A target company has people speaking, attending, or sponsoring an event the rep is going to. Bonggy maps the attendees, prioritizes by ICP fit, and drafts pre-conference DMs to set meetings on-site." },
      { title: "Tier-1 daily standup brief", body: "For named tier-1 accounts, Bonggy produces a one-page daily briefing — what changed, who's new, what's happening, what to act on today — handed to the rep before their standup." },
    ],
  },
  {
    slug: "ae",
    role: "Account Executive",
    intro:
      "Every deal needs context — on the company, the people, the competitive situation, what's changed since the last call. Bonggy builds that context before you need it.",
    cases: [
      { title: "Pre-meeting brief", body: "Before a discovery or demo call, Bonggy assembles everything the AE needs: company background, recent news, the contact's background and recent activity, likely priorities, potential objections, and relevant case studies from similar customers. Five minutes of reading instead of thirty." },
      { title: "Stakeholder mapping", body: "Mid-deal, Bonggy maps out who else is likely involved in the buying decision based on the company's size, structure, and what the deal involves — finance, IT, legal, end users — so the AE knows who to get in front of before the deal stalls." },
      { title: "Deal risk monitoring", body: "An AE has a deal in late stage. The economic buyer just left the company. Bonggy catches it and alerts the AE immediately so they can move fast to find the new decision-maker before the deal loses momentum." },
      { title: "Executive alignment outreach", body: "Deal is stuck at the manager level. AE needs to reach the C-suite. Bonggy researches the executive, identifies a relevant angle tied to company priorities, and drafts a message the AE can send from their own account or ask their VP to send." },
      { title: "Competitive intelligence during deals", body: "Prospect is evaluating a competitor. Bonggy pulls together what it can find on the competitor — pricing signals, known weaknesses from public reviews, recent product changes — so the AE walks into the comparison conversation prepared." },
      { title: "Proposal personalization", body: "Bonggy pulls together account-specific context — the company's stated priorities, what their leadership is focused on publicly, relevant industry pressures — so the proposal reads like it was written for that company specifically, not a template with the name swapped." },
      { title: "Win/loss research", body: "Before a debrief on a lost deal, Bonggy researches what the winning competitor has been saying, what the company did after the deal closed, and what signals might have been visible earlier. Turns a post-mortem into something actionable." },
      { title: "Re-engaging closed-lost deals", body: "A company that said no six months ago just hired a new CRO and is scaling fast. Bonggy flags it as re-engagement-worthy, explains what changed, and drafts an outreach that acknowledges the prior conversation and opens a new one." },
      { title: "Stalled deal diagnosis", body: "A deal hasn't moved in two weeks. Bonggy cross-references public account signals with the deal's last activity and surfaces a likely cause — a leadership change, a budget pause, a competing initiative — plus a suggested next move." },
      { title: "Reference call matching", body: "AE needs to pull together a reference. Bonggy scans the customer base for the closest match by industry, size, use case, and stage — and drafts the referral request to the matched customer." },
      { title: "Mutual action plan personalization", body: "Bonggy generates a mutual action plan tailored to the prospect's procurement cadence and likely stakeholders, so what the AE shares back to the buyer looks accounted for and credible." },
      { title: "ROI calculator personalization", body: "Plug in a prospect, and Bonggy pulls in current public data on their team size, growth rate, and tech stack to fill the calculator with their numbers instead of placeholders." },
    ],
  },
  {
    slug: "am",
    role: "Account Manager",
    intro:
      "Renewals, expansions, and executive changes all require you to know what's happening at your accounts before it becomes a problem.",
    cases: [
      { title: "Renewal prep", body: "Sixty days before renewal, Bonggy pulls together everything that's changed at the account — new hires, company performance signals, leadership changes, how the company is growing or contracting — so the AM walks into the conversation with a full picture of where the customer is now." },
      { title: "Expansion signal detection", body: "Customer's headcount in the relevant department doubled in the last quarter. They're hiring more of the exact role that uses the product. Bonggy flags this and surfaces it as an expansion conversation to have now, before the customer asks." },
      { title: "Executive change management", body: "The main champion at an account leaves. Bonggy identifies who the new point of contact is likely to be, researches their background, and drafts an introduction message so the AM re-establishes the relationship before the next QBR." },
      { title: "QBR preparation", body: "Before a quarterly business review, Bonggy assembles the context an AM needs: what the company has announced publicly, what their priorities appear to be heading into the next quarter, any leadership changes, and relevant industry shifts — so the QBR conversation goes beyond just reviewing usage numbers." },
      { title: "At-risk account early warning", body: "A customer is showing external signs of trouble — layoffs announced, negative press, leadership exodus, budget-cutting signals in public statements. Bonggy surfaces this early so the AM can act before the customer sends a cancellation notice." },
      { title: "Cross-sell timing", body: "Customer's team is posting roles that suggest they're building something adjacent to a product the AM's company also sells. Bonggy flags the signal so the AM can surface the right product at the right moment." },
      { title: "Strategic review prep", body: "Before a strategic review with the customer's executive sponsor, Bonggy pulls together the customer's earnings cadence, market signals, and competitive context — so the AM steers the conversation toward where the customer needs help, not just where the product is used." },
      { title: "Reference identification", body: "Bonggy ranks customer accounts by reference-readiness — engagement, public visibility, recent wins — and surfaces the strongest candidates whenever sales needs a reference call set up." },
      { title: "Adoption gap detection", body: "Cross-referencing internal product usage with external signals, Bonggy flags accounts paying for features they're not using and drafts an outreach that lands as a value-add, not a sales push." },
    ],
  },
  {
    slug: "csm",
    role: "Customer Success Manager",
    intro:
      "Knows the account inside the product. Bonggy fills in everything happening at the account outside the product.",
    cases: [
      { title: "Champion job change — save and expand", body: "A CSM's main contact at an account moves to a new company. Bonggy detects the move, finds the contact's new role, and surfaces two actions: draft an outreach to maintain the relationship at the new company (potential new customer), and draft an introduction request to whoever is replacing them at the existing account." },
      { title: "New customer onboarding research", body: "Before a kickoff call, Bonggy builds a profile of the new customer — company goals, recent news, leadership priorities, what the team has said publicly about their challenges — so the CSM walks in already understanding the context before the customer explains it." },
      { title: "Health signal monitoring", body: "Beyond internal product usage data, Bonggy watches for external signals that affect account health — company downsizing, budget pressure, leadership instability — and flags accounts that may need proactive attention even if their in-product activity looks normal." },
      { title: "Case study candidate identification", body: "Bonggy monitors which customers are visibly growing, winning awards, expanding their teams, or getting press — and flags them as potential case study or reference candidates while the relationship is warm and momentum is high." },
      { title: "Executive sponsor re-engagement", body: "An executive who was involved in the original buying decision has gone quiet. Bonggy researches what they've been focused on recently and drafts a re-engagement message tied to something relevant to their current priorities." },
      { title: "Product feedback mining", body: "Bonggy reads customer-side public posts and reviews for product mentions, frustrations, or feature requests — surfacing the qualitative signal in the customer's own words rather than waiting for a formal NPS score." },
      { title: "Renewal narrative drafting", body: "When a renewal is approaching, Bonggy drafts the value-recap narrative — combining product outcomes, key milestones, and external context like company growth — so the CSM walks into the renewal with a story, not just a price." },
      { title: "Advocacy candidate finding", body: "Bonggy spots customers who are publicly active — speaking, writing, posting — and matches them to advocacy programs (case studies, peer-to-peer references, advisory boards) so the CS team activates the right voices at the right moment." },
    ],
  },
  {
    slug: "sales-manager",
    role: "Sales Manager / Director",
    intro:
      "Coach with reality, not interpretation. Bonggy gives you account context grounded in what's actually happening.",
    cases: [
      { title: "Territory prioritization", body: "Rather than assigning accounts based on geography or alphabetical order, Bonggy can help rank accounts within a territory by current buying signals — who's growing, who's in pain, who's changing — so reps aren't spending equal time on unequal opportunities." },
      { title: "Coaching with account context", body: "Before a 1:1 or deal review, a manager uses Bonggy to pull context on the accounts being discussed — what's actually happening at those companies — so coaching is grounded in reality rather than just the rep's interpretation of the deal." },
      { title: "Pipeline coverage gap-filling", body: "Pipeline is thin in a specific segment. Bonggy identifies accounts in that segment showing buying signals that no rep is currently working, so the manager can assign them before the quarter gap becomes a problem." },
      { title: "Account reassignment intelligence", body: "A rep leaves. Their accounts need to be redistributed. Bonggy can prioritize which accounts need immediate attention — ones where there's an active signal, an open conversation, or a contact who might churn without a quick re-engagement — so the manager handles transitions strategically." },
      { title: "Forecast reality check", body: "Before a forecast call, Bonggy cross-references each committed deal with current public signals — leadership changes at the buyer, layoffs, fundraising trouble — and flags which deals are likely softer than the CRM says." },
      { title: "New rep ramp planning", body: "When a rep joins, Bonggy builds a curated warm-up pack of accounts to study — recent wins in the segment, archetype customer narratives, the top accounts in their territory by current signal — so ramp time is structured, not improvised." },
      { title: "Activity vs outcome correlation", body: "Bonggy cross-references rep activity patterns with external signals to spot which behaviors line up with closed-won — pre-call research depth, multi-threading speed, follow-up cadence — so coaching is rooted in what's actually working." },
    ],
  },
  {
    slug: "vp-sales",
    role: "VP of Sales / Leadership",
    intro:
      "A live view of the market and the team, not a quarterly snapshot.",
    cases: [
      { title: "Real-time market mapping", body: "Instead of quarterly market research reports, Bonggy continuously watches the market segment for signals — which companies are growing, which are contracting, who's raising money, who's hiring in the relevant function — giving leadership a live view of the addressable market." },
      { title: "Competitive monitoring", body: "Track competitor hires, product announcements, pricing changes, and customer sentiment in real time. When a competitor hires a new VP of Product, loses a key engineering leader, or gets a wave of negative reviews, leadership sees it without having to monitor it manually." },
      { title: "ICP sharpening", body: "Bonggy can be used to research companies that recently bought versus companies that didn't, identifying what was different — industry, growth stage, team composition, recent events — to refine what the ideal customer actually looks like in practice." },
      { title: "Board and investor prep", body: "Before a board meeting, Bonggy pulls together market signals that support the company's narrative — market momentum, competitor missteps, growth signals in the target customer base — so leadership arrives with current data, not month-old slide content." },
      { title: "Hiring signal tracking", body: "Competitors' sales leaders leaving often signals instability. Target companies posting VP of Sales roles often signals a buying moment. Bonggy can monitor both simultaneously." },
      { title: "Strategic narrative validation", body: "Before locking a new market message, Bonggy tests it against current customer language, competitor positioning, and analyst commentary — so the narrative ships informed, not assumed." },
      { title: "Pricing experiment context", body: "When considering a pricing change, Bonggy surfaces what comparable companies are doing publicly, what customers are saying about value, and which segments are most price-sensitive based on external signals." },
      { title: "Coverage gap analysis", body: "Bonggy compares the team's current account assignments against where the market is actually showing signals — surfacing geographies, verticals, or segments where opportunity is leaking because no one's covering it." },
    ],
  },
  {
    slug: "revops",
    role: "Revenue Operations",
    intro:
      "Keep the database fresh, the scoring honest, and the territories balanced — without a manual project every quarter.",
    cases: [
      { title: "CRM enrichment and hygiene", body: "Account and contact records go stale fast. Bonggy can run scheduled enrichment on the CRM — refreshing company data, verifying emails, updating headcount and funding stage — so the database reflects reality without a manual cleanup project every quarter." },
      { title: "Account scoring model inputs", body: "Bonggy feeds real-time external signals — funding stage, headcount growth, tech stack, hiring patterns — into the account scoring model, making scores dynamic rather than based on data that was accurate six months ago." },
      { title: "Territory design support", body: "When territories are being built or rebalanced, Bonggy can enrich each account with current data — company size, growth rate, industry signals — so territories are balanced by actual opportunity, not just company count." },
      { title: "Intent signal operationalization", body: "Turning a list of intent signals into rep actions is usually a manual process. Bonggy can take a feed of intent data and automatically draft outreach for the accounts showing intent, routed to the right rep, so the signal becomes action within hours, not days." },
      { title: "New market research", body: "Before expanding into a new vertical or geography, Bonggy can systematically research the companies in that market — size, signals, key contacts, competitive landscape — giving RevOps and leadership a real picture of what they're walking into." },
      { title: "Data quality scoring per record", body: "Bonggy scores every account and contact record on completeness and freshness, surfacing the records most worth fixing — so cleanup time is spent on the highest-impact gaps, not blanket-refreshing the whole CRM." },
      { title: "Lead routing audit", body: "Bonggy simulates how current routing rules would have handled the last 90 days of leads — surfacing the rules that misrouted, double-routed, or dropped opportunity entirely." },
      { title: "Funnel leakage diagnostics", body: "Bonggy cross-references where deals go cold with external signals at the same accounts — pointing to whether the leak is from rep behavior, deal stage gates, or market timing." },
    ],
  },
  {
    slug: "marketing",
    role: "Marketing",
    intro:
      "Run campaigns when the market is actually in-market. Pull lists that reflect this week, not last quarter.",
    cases: [
      { title: "ABM target list building", body: "Bonggy identifies which companies match the profile marketing wants to run campaigns against — by size, growth stage, tech stack, hiring patterns, recent news — and enriches each account with the contacts and context needed to personalize the campaign." },
      { title: "Campaign trigger identification", body: "A cluster of target accounts all appear to be evaluating a new category of software. Bonggy surfaces it. Marketing builds a campaign around that specific moment — education content, comparison guides, outreach — timed to when accounts are actually in-market." },
      { title: "Event targeting", body: "Which companies should be invited to the executive dinner, the VIP webinar, or the sponsored conference session? Bonggy identifies the right accounts based on current signals — who's buying, who's influential, who's in the right growth stage — rather than pulling from a static list." },
      { title: "Competitive content monitoring", body: "Bonggy tracks what competitors are publishing, what they're emphasizing, and what customer feedback is surfacing publicly — so content and positioning decisions are based on what's actually being said in the market right now." },
      { title: "Customer story sourcing", body: "Bonggy monitors the customer base for companies that are visibly winning — growth announcements, hiring surges, press coverage — and flags them as ideal case study candidates at the right moment." },
      { title: "PR and news hook identification", body: "An industry story breaks that's directly relevant to the company's positioning. Bonggy surfaces it so marketing and comms can respond fast — a contributed article, a LinkedIn post, a journalist outreach — while the news is still fresh." },
      { title: "Personalized outbound nurture", body: "Marketing runs outbound email sequences to accounts not yet in sales pipeline. Bonggy personalizes each message with current context — what's happening at that company — so the sequence reads like sales outreach, not a broadcast." },
      { title: "Analyst and journalist research", body: "Before an analyst briefing or press outreach, Bonggy pulls together what the analyst or journalist has been writing about recently, what they seem to care about, and what angle is most likely to land — so the pitch is tailored, not generic." },
      { title: "Webinar registrant enrichment", body: "When registrants sign up for a webinar, Bonggy enriches each one — role, company stage, recent activity — so post-webinar follow-ups are segmented and personalized instead of a single broadcast email." },
      { title: "Brand sentiment monitoring", body: "Bonggy tracks public mentions, reviews, and social chatter for the brand and surfaces shifts in sentiment — positive momentum to amplify, negative drift to address — without waiting for a quarterly NPS report." },
      { title: "Demand-gen waterfall analysis", body: "Cross-referencing inbound lead volume with external market signals, Bonggy tells you which channels are riding genuine market demand versus which numbers are inflated by short-term spend." },
    ],
  },
  {
    slug: "partnerships",
    role: "Partnerships",
    intro:
      "Find the right partners. Catch the moments where co-sell motions are warm.",
    cases: [
      { title: "Partner prospect identification", body: "Bonggy identifies companies that would make strong technology or channel partners — based on their customer base, the tools they integrate with, their growth stage, and whether there's an obvious overlap with the company's product." },
      { title: "Partner account overlap detection", body: "Bonggy cross-references the partner's known customer base with the company's target account list to surface accounts where a co-sell motion makes sense — where both companies have a relationship and a shared interest." },
      { title: "Partner health monitoring", body: "Track what's happening at key partners — leadership changes, new product directions, funding events, competitive moves — so the partnerships team is never caught off-guard when a partner shifts strategy or gets acquired." },
      { title: "Referral timing", body: "A partner's customer just started showing buying signals relevant to the company's product. Bonggy surfaces it so the partnerships team can ask the partner for a warm introduction while the timing is right." },
      { title: "Joint customer story sourcing", body: "Bonggy scans for joint customers where both companies are publicly active and flags candidates for co-marketed case studies, joint webinars, or shared press moments." },
      { title: "Partner pipeline contribution analysis", body: "Bonggy ties each partner's referrals to actual deal outcomes using external signals to confirm which partnerships are creating real revenue vs. low-quality lead volume." },
      { title: "Co-marketing opportunity scoring", body: "When a partner proposes a joint campaign, Bonggy scores the proposed audience overlap, segment fit, and timing — so partnerships can say yes or no with data instead of vibes." },
    ],
  },
  {
    slug: "founders",
    role: "Founders Doing Their Own Sales",
    intro:
      "No SDR. No team. Just you, a list of companies, and the work of getting in front of them.",
    cases: [
      { title: "Outbound at scale without an SDR", body: "Early-stage founders doing their own sales can run Bonggy to do what an SDR would — surface the right companies, research each one, draft the first message — without hiring someone to do it. Consistent pipeline generation without consistent time investment." },
      { title: "Investor research", body: "Before fundraising outreach, Bonggy researches each VC — what they've invested in recently, what sectors they're focused on, who at the firm led deals closest to the company's space — so every outreach is specific and the founder doesn't send 200 identical cold emails." },
      { title: "Press and media outreach", body: "Bonggy identifies journalists and writers covering the company's space, researches what each one has written recently, and drafts tailored pitches — so media outreach is targeted rather than spray-and-pray." },
      { title: "Recruiting outreach", body: "Founders building their first team can use Bonggy to find candidates with specific backgrounds, research them, and draft outreach that speaks to what would make the role interesting for that specific person." },
      { title: "Beta tester recruitment", body: "Bonggy finds the right people to pull into a product beta — by role, recent activity, public interest in the problem — and drafts the personal invitation so beta sign-ups come from a curated list, not a public form." },
      { title: "Conference speaking outreach", body: "Bonggy surfaces conferences relevant to the founder's space, identifies who runs the agenda, researches what they've programmed previously, and drafts a pitch tied to a topic they already care about." },
      { title: "Customer interview scheduling", body: "Before product or market research, Bonggy helps build a target list of people to interview, drafts the request, and tracks who said yes — so 20 conversations get scheduled without becoming the founder's full-time job." },
    ],
  },
  {
    slug: "recruiter",
    role: "Recruiter",
    intro:
      "Target the people most open to a move, with messages specific enough to get answered.",
    cases: [
      { title: "Passive candidate outreach", body: "Recruiter has a hard-to-fill role. Bonggy identifies people at other companies with the right background, researches each one — what they've worked on, what they seem to care about professionally — and drafts a message that's specific enough to get a response." },
      { title: "Job change targeting", body: "People who just changed jobs are statistically more open to new opportunities. Bonggy watches for relevant professionals making moves and surfaces them as high-probability outreach candidates before they've settled into the new role." },
      { title: "Layoff and hiring signal monitoring", body: "A competitor announces layoffs. Bonggy identifies which roles were affected, finds the relevant people, and gives the recruiter a timely, targeted outreach list with context — people who are likely available and already proven in the function." },
      { title: "Company-specific talent mapping", body: "Before approaching a specific company as a poaching target, Bonggy maps the relevant team — who's there, how long they've been there, what they've been working on — so the recruiter reaches the right people with the right message." },
      { title: "Compensation intelligence per role", body: "Bonggy aggregates public salary data, leveling guides, and posted comp ranges for the role and market so the recruiter walks into offer conversations with grounded numbers, not a guess." },
      { title: "Boomerang candidate re-engagement", body: "Former employees who've been gone 18+ months get flagged — what they've been doing since, whether they're in a phase where a return is plausible, and a personalized re-engagement draft." },
      { title: "Internal mobility tracking", body: "Bonggy watches current employees' public activity for signs they're growing into a new specialty or considering a move — so internal mobility conversations happen before a resignation does." },
    ],
  },
];

export default function UseCasesPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!q) return USE_CASES;
    return USE_CASES.map((section) => ({
      ...section,
      cases: section.cases.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.body.toLowerCase().includes(q) ||
          section.role.toLowerCase().includes(q)
      ),
    })).filter((section) => section.cases.length > 0);
  }, [q]);

  const totalCases = USE_CASES.reduce((sum, s) => sum + s.cases.length, 0);
  const matchCount = filteredSections.reduce((sum, s) => sum + s.cases.length, 0);

  return (
    <div className="min-h-screen bg-bonggy-bg text-bonggy-text-primary font-sans">
      {/* Top bar */}
      <div className="border-b border-bonggy-border">
        <div className="max-w-[1180px] mx-auto px-5 md:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">
            <ArrowLeft size={16} />
            <span className="text-[13px] font-mono-data uppercase tracking-[0.2em]">Back home</span>
          </Link>
          <Link href="/" className="flex items-center">
            <BonggyMark size={32} />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1180px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-10 md:pb-12">
        <span className="font-mono-data text-[11px] text-bonggy-accent uppercase tracking-[0.22em] block mb-5">
          Use cases · {totalCases} plays
        </span>
        <h1 className="font-serif-display text-[40px] md:text-[64px] lg:text-[76px] font-normal leading-[1.02] tracking-[-0.02em] text-bonggy-text-primary max-w-[920px]">
          What teams <span className="italic text-bonggy-accent">actually do</span> with Bonggy.
        </h1>
        <p className="mt-6 max-w-[640px] text-[15px] md:text-[17px] text-bonggy-text-secondary leading-[1.65]">
          Every play below shares the same pattern. Something changes in the market or at a company. Without Bonggy, a person has to notice it, research it, and write something. With Bonggy, that part is done. The person shows up to a decision.
        </p>
      </section>

      {/* Sticky search bar */}
      <div className="sticky top-0 z-40 bg-bonggy-bg/95 backdrop-blur-md border-y border-bonggy-border">
        <div className="max-w-[1180px] mx-auto px-5 md:px-10 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-bonggy-text-tertiary pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search use cases…"
              className="w-full pl-11 pr-10 py-3 rounded-full border border-bonggy-border bg-bonggy-surface text-[14px] text-bonggy-text-primary placeholder:text-bonggy-text-tertiary outline-none focus:border-bonggy-accent/60 transition-colors"
              aria-label="Search use cases"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-bonggy-text-tertiary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="font-mono-data text-[11px] text-bonggy-text-tertiary uppercase tracking-[0.18em] shrink-0">
            {q
              ? `${matchCount} of ${totalCases} match`
              : `${totalCases} plays across ${USE_CASES.length} roles`}
          </div>
        </div>

        {/* Role index pills (hidden while searching to reduce noise) */}
        {!q && (
          <div className="max-w-[1180px] mx-auto px-5 md:px-10 pb-4 flex flex-wrap gap-2">
            {USE_CASES.map((r) => (
              <a
                key={r.slug}
                href={`#${r.slug}`}
                className="px-3 py-1.5 rounded-full border border-bonggy-border text-[11px] font-mono-data uppercase tracking-[0.15em] text-bonggy-text-secondary hover:text-bonggy-text-primary hover:border-bonggy-accent/40 transition-colors"
              >
                {r.role}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Role sections */}
      {filteredSections.length === 0 ? (
        <section className="max-w-[1180px] mx-auto px-5 md:px-10 py-24 text-center">
          <p className="font-mono-data text-[11px] text-bonggy-accent uppercase tracking-[0.22em] mb-4">No matches</p>
          <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-4">
            Nothing matches <span className="italic">&ldquo;{query}&rdquo;</span>.
          </h2>
          <p className="text-[14px] text-bonggy-text-secondary max-w-[480px] mx-auto">
            Try a role (&ldquo;SDR&rdquo;, &ldquo;RevOps&rdquo;), an action (&ldquo;onboarding&rdquo;, &ldquo;competitor&rdquo;), or clear the search to see everything.
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-6 inline-flex items-center gap-2 text-[13px] text-bonggy-accent hover:text-bonggy-accent-hover transition-colors"
          >
            <X size={14} />
            Clear search
          </button>
        </section>
      ) : (
        <div>
          {filteredSections.map((section, sectionIdx) => (
            <section
              key={section.slug}
              id={section.slug}
              className="scroll-mt-32 border-b border-bonggy-border"
            >
              <div className="max-w-[1180px] mx-auto px-5 md:px-10 py-16 md:py-24">
                <div className="md:grid md:grid-cols-[280px_1fr] gap-10 md:gap-16">
                  <div className="md:sticky md:top-44 self-start mb-10 md:mb-0">
                    <span className="font-mono-data text-[10px] text-bonggy-accent uppercase tracking-[0.22em] block mb-3">
                      {String(sectionIdx + 1).padStart(2, "0")} · Role
                    </span>
                    <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-4">
                      {section.role}
                    </h2>
                    <p className="text-[14px] text-bonggy-text-secondary leading-[1.6] max-w-[280px] mb-4">
                      {section.intro}
                    </p>
                    <span className="font-mono-data text-[10px] text-bonggy-text-tertiary uppercase tracking-[0.18em]">
                      {section.cases.length} {section.cases.length === 1 ? "play" : "plays"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 md:gap-5">
                    {section.cases.map((c, i) => (
                      <div
                        key={c.title}
                        className="group relative p-5 md:p-6 rounded-2xl border border-bonggy-border bg-bonggy-surface overflow-hidden transition-colors hover:border-bonggy-accent/40"
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-mono-data text-[12px] text-bonggy-accent tracking-wider shrink-0 mt-0.5 min-w-[28px]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[16px] md:text-[17px] font-medium text-bonggy-text-primary mb-2 leading-[1.3]">
                              {c.title}
                            </h3>
                            <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">
                              {c.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <section className="max-w-[1180px] mx-auto px-5 md:px-10 py-20 md:py-28 text-center">
        <h2 className="font-serif-display text-[32px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary max-w-[640px] mx-auto">
          Don&apos;t see your motion? <span className="italic text-bonggy-accent">Tell us.</span>
        </h2>
        <p className="mt-5 max-w-[520px] mx-auto text-[15px] text-bonggy-text-secondary leading-[1.6]">
          We&apos;re shaping Bonggy with design partners right now. One call to walk through your motion and see what Bonggy can do for it.
        </p>
        <a
          href="https://cal.com/bonggy/30min?overlayCalendar=true"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2 text-[15px] font-medium bg-bonggy-accent text-bonggy-bg px-7 py-3.5 rounded-md hover:bg-bonggy-accent-hover transition-colors shadow-[0_0_40px_-8px_rgba(95,191,143,0.5)]"
        >
          Book a strategy session
          <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}
