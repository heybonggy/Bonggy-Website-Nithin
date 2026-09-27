"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

/**
 * BlogPostCard — adapted from the 21st.dev `card-18` recipe for the Bonggy
 * design system. Two variants:
 *
 *   - default   compact card for grid use
 *   - featured  full-width hero card with image (left) + copy (right)
 *
 * Paper styling: surface card, sentence-case meta, grayscale media, and a
 * tone change on hover (cards never lift).
 */

const cardVariants = cva(
  "group relative flex overflow-hidden rounded-3xl bg-surface transition-colors duration-[var(--dur-fast)] hover:bg-surface-2",
  {
    variants: {
      variant: {
        default: "flex-col",
        featured: "flex-col md:flex-row",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Extend HTMLMotionProps rather than React.HTMLAttributes — motion.div
// overrides drag-related event handlers (onDrag, onDragStart, onDragEnd)
// with its own pan callback signature, so the standard HTML types conflict
// at the spread site (...props) when the prop bag is the React one.
export interface BlogPostCardProps
  extends Omit<HTMLMotionProps<"div">, "title">,
    VariantProps<typeof cardVariants> {
  tag: string;
  date?: string;
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
  readMoreText?: string;
}

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  (
    {
      className,
      variant,
      tag,
      date,
      title,
      description,
      imageUrl,
      href,
      readMoreText = "Read the essay",
      ...props
    },
    ref,
  ) => {
    const isFeatured = variant === "featured";

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        <Link
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Read more: ${title}`}
        >
          <span className="sr-only">Read more</span>
        </Link>

        <div className="relative z-0 flex h-full w-full flex-col md:flex-row">
          {isFeatured && imageUrl && (
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:w-1/2 lg:w-3/5">
              <Image
                src={imageUrl}
                alt={title}
                fill
                // The featured cover is the page's largest paint: load it first.
                preload
                loading="eager"
                sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          )}

          <div
            className={cn(
              "flex flex-1 flex-col justify-between",
              isFeatured ? "p-8 sm:p-10 md:p-12" : "p-8 sm:p-10",
            )}
          >
            <div>
              <div className="mb-5 flex items-center gap-2 text-caption text-fg-3">
                <span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium text-foreground">
                  {tag}
                </span>
                {date && <span>{date}</span>}
              </div>

              <h2
                className={cn(
                  "text-foreground",
                  isFeatured ? "text-heading sm:text-heading-lg" : "text-title",
                )}
              >
                {title}
              </h2>

              <p className="mt-4 text-body text-fg-2">
                {description}
              </p>
            </div>

            {isFeatured && (
              <div className="mt-8">
                {/* The whole card is the link; this is its visible label. */}
                <span className="inline-flex h-11 items-center gap-1.5 rounded-full bg-surface-inverse px-6 text-body font-medium text-fg-inverse">
                  {readMoreText}
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

BlogPostCard.displayName = "BlogPostCard";

export { BlogPostCard };
