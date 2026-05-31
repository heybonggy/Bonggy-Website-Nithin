import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Long-form thinking from the Bonggy team on signal-led outbound, the state of sales today, and how Bonggy fits in.",
};

const POSTS = [
  {
    slug: "why-we-built-bonggy",
    title: "Why we built Bonggy",
    excerpt:
      "Three salespeople from Bengaluru on what is broken about sales today, what software can do about the reading part, and what should stay human.",
    readTime: "8 min read",
    date: "",
    kind: "Essay",
  },
];

export default function ResourcesPage() {
  return (
    <SubPageShell
      eyebrow="Resources"
      title="What we&apos;ve been"
      titleAccent="writing."
      lede="Long-form thinking from the Bonggy team — on outbound, signal, and the parts of the sales job a human still has to do."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/resources/${post.slug}`}
            className="group relative flex flex-col rounded-2xl border border-border/60 bg-background/40 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-background/70 sm:p-10"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              {post.kind}
            </div>
            <h3 className="mt-4 text-display text-[26px] font-normal leading-tight tracking-tight text-foreground sm:text-[28px]">
              {post.title}
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                {post.readTime}
              </span>
              <ArrowUpRight
                size={18}
                weight="regular"
                className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </div>
          </Link>
        ))}
      </div>
    </SubPageShell>
  );
}
