import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Users,
  Building2,
  Zap,
  Lightbulb,
  Flame,
  TrendingUp,
  MessageSquare,
  Quote,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

// ─── UI Helpers ───
function Logo() {
  return (
    <div className="w-14 h-14 rounded-xl bg-[#111111] overflow-hidden flex items-center justify-center shrink-0">
      <img
        src="/cow-logo.png"
        alt="Bonggy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed top-5 left-5 right-5 z-50 flex items-center justify-between bg-bonggy-surface/80 backdrop-blur-md border border-bonggy-border rounded-full px-4 py-2 shadow-sm">
      <Link to="/" className="flex items-center justify-center shrink-0">
        <Logo />
      </Link>
      <div className="flex items-center gap-1">
        <Link to="/" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">Home</Link>
        <Link to="/who-its-for" className="text-[13px] text-bonggy-text-primary font-medium transition-colors px-3 py-1.5 rounded-md bg-bonggy-bg">Who it's for</Link>
        <Link to="/#cta" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-bonggy-bg">About Us</Link>
        <div className="w-px h-4 bg-bonggy-border mx-1" />
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full text-bonggy-text-secondary hover:text-bonggy-text-primary hover:bg-bonggy-bg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function WhoItsFor() {
  return (
    <div className="min-h-screen bg-bonggy-bg text-bonggy-text-primary font-sans antialiased transition-colors duration-300">
      <FloatingControls />

      {/* Hero / Founder Note Header */}
      <section className="pt-32 md:pt-40 pb-16 px-5 md:px-10 max-w-[800px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-bonggy-text-tertiary hover:text-bonggy-text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="mb-10">
          <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium mb-3">Founder Note</p>
          <h1 className="font-serif-display text-[36px] md:text-[52px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary">
            Who Bonggy is actually for
          </h1>
        </div>

        {/* Founder Quote */}
        <div className="bg-bonggy-surface border border-bonggy-border rounded-xl p-6 md:p-8 mb-12">
          <Quote size={24} className="text-bonggy-accent mb-4" />
          <p className="text-[18px] md:text-[20px] text-bonggy-text-primary leading-[1.6] font-serif-display mb-4">
            "I built Bonggy because I was tired of watching great reps burn out on bad data. The best SDR I ever hired quit because she spent 70% of her week researching and 30% selling. That is not a talent problem. That is a tooling problem."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bonggy-text-primary flex items-center justify-center text-[12px] font-medium text-bonggy-surface">
              JD
            </div>
            <div>
              <p className="text-[14px] text-bonggy-text-primary font-medium">John Doe</p>
              <p className="text-[12px] text-bonggy-text-tertiary">Founder, Bonggy</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-20 px-5 md:px-10 bg-bonggy-surface border-y border-bonggy-border">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Flame size={18} className="text-bonggy-accent" />
            <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium">The Problem</p>
          </div>
          <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary mb-6">
            Your reps are drowning in data but starving for insight.
          </h2>
          <div className="space-y-4 text-[16px] md:text-[17px] text-bonggy-text-secondary leading-[1.7]">
            <p>
              They know the account raised Series B. They know a VP Sales got hired. They know 3 SDRs joined. What they do not know — what your best rep figures out in 20 minutes of mental gymnastics — is <strong className="text-bonggy-text-primary font-normal">why that combination means the account is buyable right now, and exactly what to say to make them feel it.</strong>
            </p>
            <p>
              Apollo gives them contacts. Outreach gives them sequences. 6sense gives them intent scores. <strong className="text-bonggy-text-primary font-normal">None of them tell your reps what to do with any of it.</strong>
            </p>
            <p>
              The result? 500 accounts sprayed with the same 3 angles. A 1% reply rate. Reps who are not lazy — they are exhausted from being forced to think like analysts when they were hired to sell.
            </p>
          </div>
        </div>
      </section>

      {/* ICP */}
      <section className="py-16 md:py-20 px-5 md:px-10 max-w-[800px] mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Target size={18} className="text-bonggy-accent" />
          <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium">Our ICP</p>
        </div>
        <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary mb-8">
          Series A-C SaaS companies with 10-100 SDR/AE headcount
        </h2>
        <p className="text-[16px] md:text-[17px] text-bonggy-text-secondary leading-[1.7] mb-10">
          If you are currently stitching together 3-4 tools and spending half your week on data plumbing, you are exactly who we built this for.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: Users,
              title: "The SDR who sprays 500 accounts",
              desc: "With the same 3 angles because there is no time to research 500. Bonggy writes the angle for each account automatically.",
            },
            {
              icon: Building2,
              title: "The RevOps lead who manually dedupes CSVs",
              desc: "Who exports from Apollo, cleans in Excel, uploads to Salesforce. Bonggy replaces the entire waterfall with one sync.",
            },
            {
              icon: Zap,
              title: "The founding AE who researches more than sells",
              desc: "Who knows every signal but can not scale that knowledge to the rest of the team. Bonggy makes your playbook available to everyone.",
            },
            {
              icon: MessageSquare,
              title: "The VP Sales who can not trust the data",
              desc: "Who gets pipeline reviews full of gut feelings instead of signal-backed narratives. Bonggy gives you the why behind every target.",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-bonggy-surface border border-bonggy-border rounded-xl p-6 hover:border-bonggy-border-hover transition-colors">
                <Icon size={18} className="text-bonggy-accent mb-3" />
                <h3 className="text-[15px] font-medium text-bonggy-text-primary mb-2">{card.title}</h3>
                <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Titles Who Benefit */}
      <section className="py-16 md:py-20 px-5 md:px-10 bg-bonggy-surface border-y border-bonggy-border">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-bonggy-accent" />
            <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium">Titles Who Benefit</p>
          </div>
          <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary mb-8">
            Built for the people who own pipeline
          </h2>

          <div className="space-y-4">
            {[
              { role: "VP Sales / Head of Sales", outcome: "Hot accounts ranked by urgency, not alphabetically. Know what to talk about before the call starts." },
              { role: "Sales Manager / Team Lead", outcome: "Every rep armed with account-specific angles. No more 'just checking in' emails." },
              { role: "RevOps Lead", outcome: "Own the enrichment waterfall. See cost per field. Approve every data point before it hits the CRM." },
              { role: "SDR / BDR", outcome: "Spend 70% of your time selling, not researching. The narrative is written for you." },
              { role: "Founding AE / Founder", outcome: "Your instinct, systematized. Every rep gets the playbook you developed through 200 conversations." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-bonggy-border bg-bonggy-bg">
                <div className="w-8 h-8 rounded-full bg-bonggy-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[12px] font-medium text-bonggy-accent">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[15px] font-medium text-bonggy-text-primary mb-1">{item.role}</p>
                  <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">{item.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-20 px-5 md:px-10 max-w-[800px] mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb size={18} className="text-bonggy-accent" />
          <p className="text-[13px] text-bonggy-accent uppercase tracking-wide font-medium">Vision</p>
        </div>
        <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary mb-8">
          The strategy layer between signal and send
        </h2>
        <div className="space-y-4 text-[16px] md:text-[17px] text-bonggy-text-secondary leading-[1.7]">
          <p>
            We are not building another lead database. We are not building another sequencer. We are building the <strong className="text-bonggy-text-primary font-normal">intelligence layer</strong> that turns raw signal into actionable strategy.
          </p>
          <p>
            The future of outbound is not more volume. It is more precision. One account with the right narrative at the right moment beats 500 generic touches every time.
          </p>
          <p>
            We believe the best sales teams of the next decade will look like small special forces units: deeply researched, precisely targeted, and armed with exactly what they need to win. Not spray-and-pray armies burning through lists.
          </p>
        </div>

        <div className="mt-10 bg-bonggy-bg border border-bonggy-border rounded-xl p-6">
          <p className="text-[15px] text-bonggy-text-primary leading-[1.6] font-serif-display">
            "Your best rep's playbook. Available to everyone."
          </p>
          <p className="text-[13px] text-bonggy-text-tertiary mt-2">— This is what we are building toward.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-bonggy-surface border-t border-bonggy-border">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="font-serif-display text-[28px] md:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary mb-4">
            Sound like you?
          </h2>
          <p className="text-[16px] text-bonggy-text-secondary leading-[1.6] mb-8">
            Most teams find their first hot window account within 10 minutes of connecting. No setup forms. No implementation calls.
          </p>
          <a
            href="https://cal.com/bonggy/30min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base font-normal bg-bonggy-text-primary text-bonggy-surface px-8 py-4 rounded-md hover:opacity-85 transition-opacity"
          >
            Strategy Session <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 md:px-10 border-t border-bonggy-border">
        <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Logo />
            <span className="text-sm font-medium text-bonggy-text-primary">Bonggy</span>
          </Link>
          <p className="text-[14px] text-bonggy-text-tertiary">The strategy layer between signal and send.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[14px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">Privacy</a>
            <a href="#" className="text-[13px] text-bonggy-text-secondary hover:text-bonggy-text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
