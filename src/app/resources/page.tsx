import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { BlogPostCard } from "@/components/ui/blog-post-card";

export const metadata: Metadata = pageMetadata({ slug: "resources" });

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
    slug: "a-note-from-us",
    title: "A note from us",
    excerpt: "Why we built Bonggy, and the few things we will not do.",
    readTime: "3 min read",
    date: "",
    kind: "Note",
    featured: true,
    // Unsplash photo 1522071820081-009f0129c71c, served locally.
    imageUrl: "/images/resources/a-note-from-us.jpg",
  },
];

export default function ResourcesPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <SubPageShell
      eyebrow="Resources"
      title="What we've been"
      titleAccent="writing."
      lede="Long-form thinking from the Bonggy team on GTM bots, the work before the conversation, and the parts of the job a person still has to do."
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
            readMoreText="Read"
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
