/** /resources' index, so the page and its markdown twin render from one source. */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  kind: string;
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
};

export const RESOURCES_LEDE =
  "Long-form thinking from the Bonggy team on GTM bots, the work before the conversation, and the parts of the job a person still has to do.";

export const RESOURCE_POSTS: Post[] = [] = [
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
    imageAlt: "A note from us: why we built Bonggy",
  },
];
