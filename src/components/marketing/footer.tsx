import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const COLUMNS: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    items: [
      { label: "What we do", href: "/#what-we-do" },
      { label: "Flows", href: "/#flows" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
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
    heading: "Resources",
    items: [
      { label: "All resources", href: "/resources" },
      { label: "A note from us", href: "/resources/a-note-from-us" },
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
    <footer className="border-t border-border px-4 pb-16 pt-10 sm:px-6">
      <div className="mx-auto w-full max-w-wide">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[280px_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Bonggy, home" className="inline-flex min-h-11 items-center">
              <Logo />
            </Link>
            <p className="mt-4 text-ui font-medium text-foreground">Your process, not ours.</p>
            <p className="mt-1 max-w-xs text-ui text-fg-2">
              The agent workspace for sales, RevOps and marketing teams.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-ui-sm font-medium text-foreground">{col.heading}</h2>
              <ul className="mt-2 grid pointer-fine:mt-3 pointer-fine:gap-1">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="inline-flex min-h-11 items-center text-ui text-fg-2 transition-colors hover:text-foreground pointer-fine:min-h-8"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-caption text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Bonggy. All rights reserved.</span>
          <span className="select-all">founders@bonggy.com</span>
        </div>

      </div>
    </footer>
  );
}
