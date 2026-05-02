import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FaqCategory {
  id: string;
  label: string;
  items: { question: string; answer: string }[];
}

const faqData: FaqCategory[] = [
  {
    id: "general",
    label: "General & Product",
    items: [
      {
        question: "What is Bonggy?",
        answer:
          "Bonggy is the intelligence layer between your sales signals and your outbound sequences. We ingest job changes, funding rounds, tech shifts, and organizational moves, then cluster them by account to surface actionable buying windows. Instead of giving your reps more data, we tell them exactly what to say, when to say it, and why the prospect should care.",
      },
      {
        question: "Who is Bonggy built for?",
        answer:
          "Bonggy is designed for Series A-C SaaS companies with 10-100 SDR/AE headcount who are stitching together 3-4 tools and spending half their week on data plumbing. That said, any team doing outbound sales — from founder-led shops to enterprise divisions — benefits from turning raw signal into strategic narrative.",
      },
      {
        question: "How is Bonggy different from Apollo, ZoomInfo, or LinkedIn Sales Navigator?",
        answer:
          "Those are databases. Bonggy is what you do after the database. We do not compete on contact volume or email coverage. We compete on what happens next: clustering signals into narratives, scoring intent by strategic relevance, mapping the buying committee, and generating account-specific sequences. Think of us as the strategy layer that sits between your data source and your sequencer.",
      },
      {
        question: "Do you replace my CRM or sequencer?",
        answer:
          "No. We integrate with them. Bonggy reads signals from your CRM, enriches them with context, and pushes approved sequences back to Outreach, Apollo, Salesloft, or any CSV-based workflow. Your CRM stays the system of record. Your sequencer stays the delivery mechanism. We make both smarter.",
      },
      {
        question: "What modules does Bonggy include?",
        answer:
          "Five core modules: Agents (signal ingestion and clustering), Drafts (AI-generated sequences with tone matching), Lists (smart, auto-refreshing account lists), Enrich (deep research and personality analysis), and Playbooks (ICP definition, persona pain points, and competitive positioning).",
      },
    ],
  },
  {
    id: "getting-started",
    label: "Getting Started",
    items: [
      {
        question: "How long does it take to get set up?",
        answer:
          "Most teams are up and running within 30 minutes. Connect your CRM and sequencer, define your ICP and target territories, and Bonggy starts surfacing signal clusters immediately. Full playbook calibration and win-pattern training typically take a few days of feedback, not weeks.",
      },
      {
        question: "Do I need to provide my own data?",
        answer:
          "Bonggy enriches what you already have. If you have a CRM with accounts and contacts, we can start immediately. We also layer in public signal sources — job boards, funding databases, tech stacks, and social activity — so you do not need to buy a separate enrichment tool.",
      },
      {
        question: "Is there an onboarding process?",
        answer:
          "Yes. Every new workspace gets a guided onboarding that covers ICP definition, playbook setup, integration configuration, and a first sequence walkthrough. Enterprise customers also get a dedicated success session to align Bonggy with their existing sales motion.",
      },
      {
        question: "Can I try Bonggy before committing?",
        answer:
          "Absolutely. We offer a 14-day free trial with full access to all modules. No credit card required. You can also book a free strategy session with our team to see Bonggy calibrated against your actual accounts before you even sign up.",
      },
      {
        question: "What does the early access program include?",
        answer:
          "Early access members get priority feature input, direct Slack access to the founding team, discounted pricing locked for 12 months, and first access to beta modules like competitive win-pattern matching and multi-language sequence generation.",
      },
    ],
  },
  {
    id: "data-privacy",
    label: "Data & Privacy",
    items: [
      {
        question: "Where does Bonggy get its signals from?",
        answer:
          "We aggregate public and proprietary sources including job change APIs, funding announcement databases, technology stack trackers, social activity feeds, and your own CRM data. Every signal is verified and timestamped so you know exactly how fresh the intelligence is.",
      },
      {
        question: "Is my CRM data safe with Bonggy?",
        answer:
          "Yes. We use OAuth-based read permissions where possible, never store credentials, and encrypt all data at rest and in transit. We are SOC 2 Type II compliant and undergo regular third-party security audits. You own your data. We are just the layer that makes it useful.",
      },
      {
        question: "Do you train AI models on my proprietary data?",
        answer:
          "No. Your account narratives, contact lists, and win patterns are isolated to your workspace. We use anonymized aggregate metrics to improve the product — things like sequence length preferences or tone selection patterns — never your specific account data or messaging.",
      },
      {
        question: "Can I export my data if I leave?",
        answer:
          "Of course. We offer a full data export in CSV and JSON formats. If you cancel, you get a 30-day grace period to download everything before deletion. We will never hold your data hostage.",
      },
      {
        question: "How do you handle GDPR and CCPA compliance?",
        answer:
          "Bonggy is built with privacy-by-design principles. We honor data subject access requests, support right-to-deletion workflows, and maintain a Data Processing Agreement (DPA) for all customers. Contact founders@bonggy.com for a copy of our DPA.",
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    items: [
      {
        question: "Which CRMs do you integrate with?",
        answer:
          "We currently support Salesforce and HubSpot with native two-way sync. Pipedrive, Close, and Microsoft Dynamics are on our near-term roadmap. If you use something else, our CSV import/export workflow covers most use cases in the meantime.",
      },
      {
        question: "Which sequencers are supported?",
        answer:
          "Outreach, Apollo, and Salesloft are supported natively. You can push approved sequences directly into these platforms with one click. For other tools, export as CSV and upload manually. We are adding more native integrations every quarter based on customer demand.",
      },
      {
        question: "Can I connect Bonggy to my data warehouse?",
        answer:
          "Enterprise customers can connect Bonggy to Snowflake, BigQuery, or Redshift via a secure read-only connector. This lets you pull signal clusters and intent scores directly into your internal BI tools and revenue dashboards.",
      },
      {
        question: "Do you have an API?",
        answer:
          "Yes. Our REST API is available on Pro and Enterprise plans. It supports account lookup, signal retrieval, sequence generation, and list management. Documentation is available at docs.bonggy.com. Webhook support for real-time signal alerts is coming soon.",
      },
    ],
  },
  {
    id: "ai-sequences",
    label: "AI & Sequences",
    items: [
      {
        question: "How does the AI generate sequences?",
        answer:
          "Bonggy analyzes the signal cluster for an account — funding, hiring, tech changes, org moves — and cross-references it with your playbook (ICP, persona pains, competitive positioning). It then writes a multi-touch sequence tailored to that specific account, choosing from tones like Direct, Value-first, Question-led, Social Proof, Competitive, or Advisory.",
      },
      {
        question: "Can I edit the AI-generated drafts?",
        answer:
          "Yes, and we encourage it. Every draft goes through a Draft → Approved → Sent workflow. Reps can edit angles, adjust tone, rewrite entire steps, or reject the draft and request a new one. Managers can set approval gates for junior reps.",
      },
      {
        question: "How accurate is the intent scoring?",
        answer:
          "Intent scores improve with feedback. Out of the box, they are calibrated on industry-wide patterns. Within 2-3 weeks of your team marking accounts as qualified or disqualified, the model adapts to your specific win patterns. Most customers see correlation between Bonggy intent scores and actual close rates within the first month.",
      },
      {
        question: "Does Bonggy write in languages other than English?",
        answer:
          "English is fully supported today. Spanish, German, and French are in beta for early access members. The system adapts tone and cultural context, not just translation — so a German sequence will sound like it was written by a native SDR, not translated by a machine.",
      },
      {
        question: "What if the AI gets something wrong about an account?",
        answer:
          "Every signal is sourced and timestamped. If a fact is incorrect, you can flag it in one click and the system will learn from the correction. You can also override any narrative element manually. The AI is an assistant, not an autopilot.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Billing",
    items: [
      {
        question: "How much does Bonggy cost?",
        answer:
          "We offer three tiers: Starter at $49 per user per month for small teams getting their first signal system in place; Pro at $129 per user per month for scaling teams who need API access, custom playbooks, and manager approval workflows; and Enterprise with custom pricing for organizations needing SSO, data warehouse connectors, and dedicated success support.",
      },
      {
        question: "Is there a free plan?",
        answer:
          "We do not offer a permanent free plan, but our 14-day trial is fully functional and does not require a credit card. We also offer discounts for annual commitments and early access members.",
      },
      {
        question: "What counts as a user?",
        answer:
          "Any team member with a Bonggy login counts as a user. This includes SDRs who generate sequences, AEs who review account narratives, managers who approve drafts, and RevOps admins who manage integrations. View-only executive dashboards do not count toward your seat limit.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades take effect at the end of your current billing cycle. We prorate annual plans if you add seats mid-year.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & Troubleshooting",
    items: [
      {
        question: "How do I get help if something is not working?",
        answer:
          "All customers get email support with a 24-hour response time. Pro customers get live chat during business hours. Enterprise customers get a dedicated Slack channel with our success team and a 4-hour SLA for critical issues.",
      },
      {
        question: "Why are some of my accounts not showing signals?",
        answer:
          "Usually this means the account does not match any of your configured signal sources, or the company is too small to have public signal coverage. Try widening your territory rules, adding alternative company names, or manually enriching the account through the Enrich module.",
      },
      {
        question: "My CRM sync seems slow. What should I check?",
        answer:
          "First, check your integration health dashboard in Settings > Integrations. Make sure your OAuth tokens are valid and your API rate limits have not been hit. Salesforce bulk syncs typically take 5-15 minutes depending on record count. If the delay is longer than 30 minutes, contact support.",
      },
      {
        question: "How do I request a new feature?",
        answer:
          "Pro and Enterprise customers can submit feature requests directly in-app. Early access members can drop ideas in our shared Slack. We review every request and publish a public roadmap at roadmap.bonggy.com so you can track what is coming and upvote what matters to you.",
      },
      {
        question: "Where can I find documentation and tutorials?",
        answer:
          "Our docs live at docs.bonggy.com and cover setup, playbook configuration, API reference, and troubleshooting. We also publish video walkthroughs on our YouTube channel and run monthly office hours for live Q&A.",
      },
    ],
  },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = faqData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
    .filter((cat) => cat.items.length > 0);

  const totalQuestions = faqData.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-bonggy-bg text-bonggy-text-primary font-sans antialiased">
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-bonggy-text-tertiary hover:text-bonggy-text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <HelpCircle size={24} className="text-bonggy-accent" />
          <h1 className="font-serif-display text-[32px] md:text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-[15px] text-bonggy-text-secondary leading-[1.6] mb-10">
          Everything you need to know about Bonggy — from setup and integrations to AI sequences and pricing. Can&apos;t find what you&apos;re looking for? Reach us at{" "}
          <a
            href="mailto:founders@bonggy.com"
            className="text-bonggy-accent hover:underline"
          >
            founders@bonggy.com
          </a>
          .
        </p>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-bonggy-text-tertiary"
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-bonggy-border bg-bonggy-surface text-[14px] text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus:outline-none focus:border-bonggy-border-hover transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
              activeCategory === "all"
                ? "bg-bonggy-text-primary text-bonggy-surface font-medium"
                : "text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-surface border border-bonggy-border"
            }`}
          >
            All ({totalQuestions})
          </button>
          {faqData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                activeCategory === cat.id
                  ? "bg-bonggy-text-primary text-bonggy-surface font-medium"
                  : "text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-surface border border-bonggy-border"
              }`}
            >
              {cat.label} ({cat.items.length})
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-10">
          {filtered.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-[13px] font-medium text-bonggy-accent uppercase tracking-wide mb-4">
                {cat.label}
              </h2>
              <div className="bg-bonggy-surface border border-bonggy-border rounded-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {cat.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${cat.id}-${i}`}
                      className="px-5 border-b border-bonggy-border/40 last:border-b-0"
                    >
                      <AccordionTrigger className="text-[14px] font-medium text-bonggy-text-primary hover:no-underline py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] text-bonggy-text-secondary leading-[1.7]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <HelpCircle
              size={32}
              className="text-bonggy-text-tertiary mx-auto mb-3"
            />
            <p className="text-[15px] text-bonggy-text-secondary">
              No questions matched your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-3 text-[13px] text-bonggy-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-bonggy-surface border border-bonggy-border rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-[18px] font-medium text-bonggy-text-primary mb-2">
            Still have questions?
          </h3>
          <p className="text-[14px] text-bonggy-text-secondary mb-5 max-w-[400px] mx-auto">
            Our team is happy to help. Book a free strategy session or send us an email and we will get back to you within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://cal.com/bonggy/30min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium bg-bonggy-text-primary text-bonggy-surface px-5 py-2.5 rounded-md hover:opacity-85 transition-opacity inline-flex items-center gap-1.5"
            >
              Book a Call
            </a>
            <a
              href="mailto:founders@bonggy.com"
              className="text-[13px] font-medium text-bonggy-accent bg-bonggy-accent/10 border border-bonggy-accent/30 hover:bg-bonggy-accent/20 hover:border-bonggy-accent/50 transition-colors px-5 py-2.5 rounded-md"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
