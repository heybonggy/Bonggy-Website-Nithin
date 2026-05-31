import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { BlogPostCard } from "@/components/ui/blog-post-card";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Long-form thinking from the Bonggy team on signal-led outbound, the state of sales today, and how Bonggy fits in.",
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  kind: string;
  featured?: boolean;
  imageUrl?: string;
};

const POSTS: Post[] = [
  {
    slug: "why-we-built-bonggy",
    title: "Why we built Bonggy",
    excerpt:
      "Three salespeople from Bengaluru on what is broken about sales today, what software can do about the reading part, and what should stay human.",
    readTime: "8 min read",
    date: "",
    kind: "Essay",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function ResourcesPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <SubPageShell
      eyebrow="Resources"
      title="What we&apos;ve been"
      titleAccent="writing."
      lede="Long-form thinking from the Bonggy team — on outbound, signal, and the parts of the sales job a human still has to do."
    >
      {featured && (
        <div className="mb-12 md:mb-16">
          <BlogPostCard
            variant="featured"
            tag={featured.kind}
            date={featured.date || featured.readTime}
            title={featured.title}
            description={featured.excerpt}
            imageUrl={featured.imageUrl}
            href={`/resources/${featured.slug}`}
            readMoreText="Read the essay"
          />
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {rest.map((post) => (
            <BlogPostCard
              key={post.slug}
              variant="default"
              tag={post.kind}
              date={post.date || post.readTime}
              title={post.title}
              description={post.excerpt}
              href={`/resources/${post.slug}`}
            />
          ))}
        </div>
      )}
    </SubPageShell>
  );
}
