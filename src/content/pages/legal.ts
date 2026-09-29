/**
 * The legal pages' copy, so each page and its markdown twin render from one
 * source. Bodies are plain strings; the pages link the email address.
 */
import { EMAIL } from "../site";

export type LegalSection = { h: string; body: string };

export const PRIVACY_SECTIONS: LegalSection[] = [
  { h: "What we collect", body: "We collect only what we need to make Bonggy work for your team: account information (your email, company name), product usage data to improve the service, and the data your bots read through the tools you connect. We do not sell your data, and there's no training on your data: we don't use it to train AI models." },
  { h: "How we use it", body: "Your data powers your own bots. Running your flows, mapping work to your revenue goals, and showing your team what each bot did all happen on your data, for your team. We use anonymized, aggregate metrics to improve the product, never your specific account data or contact lists." },
  { h: "Cookies and website analytics", body: "We use essential cookies to run the site and privacy-respecting analytics to understand how the site is used in aggregate. We do not use third-party services to de-anonymize visitors or associate your browsing with your personal email for marketing. You can control cookies through your browser settings." },
  { h: "Data retention", body: "We keep your data while you're a customer, and you can ask us to delete your data at any time. You can export it while your account is active. Anything else about retention is set out in your agreement with us. You own your data; we're the layer that makes it useful." },
  { h: "Third-party integrations", body: "Bonggy connects to the tools your team already uses (CRM, email, calendar, Slack, call notes) through the permissions you grant. Bots are built to be read-only by default and write back only where a flow your team sets up allows it, such as adding a CRM task. Nothing customer-facing goes out without a person approving it." },
  { h: "Your choices", body: "You can access your data, export it while your account is active, and ask us to delete your data at any time. To opt out of product or marketing emails, use the unsubscribe link in any message or email us." },
  { h: "Contact", body: `Questions? Reach us at ${EMAIL}. We read every email.` },
];

export const TERMS_SECTIONS: LegalSection[] = [
  { h: "What you get", body: "Bonggy is an agent workspace for sales, RevOps and marketing teams. Your team builds bots and designs the flows they run, and every flow ties to a revenue goal. Nothing customer-facing goes out without a person approving it. Bots are built to be read-only by default and write back only where a flow your team sets up allows it. We don't guarantee pipeline, and bots don't replace anyone." },
  { h: "Acceptable use", body: "Use Bonggy to build and run bots for your own team's work. Connect only the tools and accounts you're authorized to. Don't use it to ingest data you don't have rights to, to send bulk or unsolicited messages, to get around the approval step, or to monitor individuals outside a legitimate business context." },
  { h: "Billing", body: "Billing terms are set out in your order form or agreement with us." },
  { h: "Data ownership", body: "Your account data, contacts, activity and the work your bots produce are yours. You design the flows and approve what goes out; we run the workspace. No training on your data: we don't use it to train AI models. You can export your data while your account is active, and you can ask us to delete your data at any time." },
  { h: "Limitation of liability", body: "Bonggy runs the flows your team designs, and people on your team approve what customers see. We're not responsible for what your team approves or sends, how prospects respond, or whether a deal closes. The service is provided “as is,” to the fullest extent permitted by law." },
  { h: "Contact", body: `Questions about these terms? ${EMAIL}. We read every email.` },
];
