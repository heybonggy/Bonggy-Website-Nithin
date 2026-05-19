import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Bonggy",
  description: "How Bonggy handles your data — what we collect, how we use it, and what you control.",
};

export default function Privacy() {
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
          Privacy Policy
        </h1>
        <p className="text-[13px] text-bonggy-text-tertiary mb-10">Last updated: January 2026</p>

        <div className="space-y-8 text-[15px] text-bonggy-text-secondary leading-[1.7]">
          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">What We Collect</h2>
            <p>
              We collect only what we need to make Bonggy work for your team. This includes account
              information (email, company name), usage data to improve the product, and the signals you
              choose to track through our integrations. We do not sell your data. We do not train AI
              models on your proprietary account information.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">How We Use It</h2>
            <p>
              Your data powers your outbound intelligence. Signal clustering, narrative generation, and
              win pattern matching all happen on your data for your benefit. We use anonymized aggregate
              metrics to improve the product — never your specific account narratives or contact lists.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Data Retention</h2>
            <p>
              We keep your data as long as you are a customer. If you cancel, we offer a 30-day grace
              period to export everything before deletion. You own your data. We are just the layer that
              makes it useful.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Third-Party Integrations</h2>
            <p>
              Bonggy connects to your CRM and sequencer to read signals and push account data. We only
              request the permissions necessary to do this. We never write to your CRM without explicit
              approval.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Website Tracking</h2>
            <p>
              When you visit or log in to our website, cookies and similar technologies may be used by
              our online data partners or vendors to associate these activities with other personal
              information they or others have about you, including by association with your email. We
              (or service providers on our behalf) may then send communications and marketing to these
              email addresses. You may opt out of receiving this advertising by visiting{" "}
              <a
                href="https://app.retention.com/optout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bonggy-accent hover:underline"
              >
                https://app.retention.com/optout
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-medium text-bonggy-text-primary mb-3">Contact</h2>
            <p>
              Questions? Reach us at{" "}
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
