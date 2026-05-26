import Link from "next/link";
import { BonggyMark } from "./bonggy-mark";

const FOOTER_LINKS: {
  heading: string;
  items: { label: string; href: string }[];
}[] = [
  {
    heading: "Product",
    items: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "The fix", href: "/#fix" },
      { label: "Use cases", href: "/#use-cases" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 pt-16 pb-20 sm:pb-12">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BonggyMark className="size-7" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[0.18em]">
                Bonggy
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
              The command centre for sales teams. Find the signal, decide the
              move, run.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                {col.heading}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <div className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Bonggy. All rights reserved.
          </div>
          <div className="font-mono text-[11px] text-muted-foreground/60">
            Built for the people who have to live with the reply.
          </div>
        </div>
      </div>
    </footer>
  );
}
