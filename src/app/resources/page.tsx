import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { RESOURCE_POSTS } from "@/content/pages/resources";

export const metadata: Metadata = pageMetadata({ slug: "resources" });



export default function ResourcesPage() {
  const featured = RESOURCE_POSTS.find((p) => p.featured);
  const rest = RESOURCE_POSTS.filter((p) => !p.featured);

  return (
    <>
      <JsonLd graph={graphFor("resources")} />

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
            imageAlt={featured.imageAlt}
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
    </>
  );
}
