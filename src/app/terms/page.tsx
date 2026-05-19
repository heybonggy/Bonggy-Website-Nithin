import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service · Bonggy",
  description: "How Bonggy works, what you get, and how we treat your data.",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-bonggy-bg text-bonggy-text-primary font-sans antialiased">
      <div className="max-w-[680px] mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-bonggy-text-tertiary hover:text-bonggy-text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        <h1 className="font-serif-display text-[32px] md:text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-bonggy-text-primary mb-2">
          Terms of Service
        </h1>
        <p className="text-[13px] text-bonggy-text-tertiary mb-10">Last updated: January 2026</p>

        <div className="space-y-8 text-[15px] text-bonggy-text-secondary leading-[1.7]">
          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">What You Get</h2>
            <p>
              Bonggy is an outbound intelligence platform. We watch for buying signals, cluster them
              into narratives, and generate account-specific sequences. What we do not do: guarantee
              pipeline, promise specific reply rates, or replace the need for skilled salespeople. We
              arm them. We do not replace them.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Acceptable Use</h2>
            <p>
              Use Bonggy to sell to accounts that should want to hear from you. Do not use it to spam,
              scrape, or violate anti-spam laws. If your sequences get reported as spam at a rate that
              damages our sender reputation, we reserve the right to pause your account and work with
              you to fix it.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Billing</h2>
            <p>
              We offer flexible billing: monthly, quarterly, or annual. You can cancel anytime. No
              implementation fees, no surprise charges. We are flexible — if your team needs a different
              structure, talk to us.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Data Ownership</h2>
            <p>
              Your account data, contacts, and sequences are yours. We provide the intelligence layer.
              You provide the strategy. Export anytime. Leave anytime. No lock-in.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Limitation of Liability</h2>
            <p>
              Bonggy helps you find the right accounts and say the right things. We are not responsible
              for what your reps actually send, how prospects respond, or whether a deal closes. Sales
              is still a human skill. We just make the research part less painful.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Contact</h2>
            <p>
              Questions about these terms?{" "}
              <a href="mailto:founders@bonggy.com" className="text-bonggy-accent hover:underline">
                founders@bonggy.com
              </a>
              . We read every email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
