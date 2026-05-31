"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * BlogPostCard — adapted from the 21st.dev `card-18` recipe for the Bonggy
 * design system. Two variants:
 *
 *   - default   compact card for grid use
 *   - featured  full-width hero card with image (left) + copy (right)
 *
 * Uses Bonggy tokens: text-display heading, font-mono eyebrow with
 * 0.22em tracking, signal-green accent chip, restrained -2px hover lift.
 */

const cardVariants = cva(
  "group relative flex overflow-hidden rounded-2xl border border-border/60 bg-background/40 transition-all duration-300 hover:border-border hover:bg-background/70",
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
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Tint so the image sits in the editorial palette rather than
                  popping against the dark background. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/40 md:to-background/30"
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
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span className="rounded-full bg-signal/10 px-2.5 py-1 text-signal">
                  {tag}
                </span>
                {date && <span className="text-muted-foreground/70">{date}</span>}
              </div>

              <h3
                className={cn(
                  "text-display font-normal leading-tight tracking-tight text-foreground",
                  isFeatured
                    ? "text-[28px] sm:text-[36px] lg:text-[44px]"
                    : "text-[24px] sm:text-[28px]",
                )}
              >
                {title}
              </h3>

              <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {isFeatured && (
              <div className="mt-8">
                <Button size="lg" className="group/button relative z-20">
                  {readMoreText}
                  <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </Button>
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
