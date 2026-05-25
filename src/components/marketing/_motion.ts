"use client";

import type { Variants, Transition } from "motion/react";

/**
 * Per taste-skill: spring physics with stiffness 100, damping 20 for premium weight.
 * NEVER linear easings on interactive elements.
 */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const SPRING_FAST: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 24,
  mass: 0.6,
};

export const SPRING_BOUNCE: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 14,
  mass: 0.7,
};

export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

/**
 * CRITICAL: Motion variants must NEVER hide content with opacity 0.
 * Content visible without JS / before hydration / when Playwright captures.
 * Animations animate transform ONLY. Opacity stays 1.
 */
export const fadeUp: Variants = {
  hidden: { y: 16 },
  visible: (i: number = 0) => ({
    y: 0,
    transition: { ...SPRING, delay: i * 0.06 },
  }),
};

export const slideUp: Variants = {
  hidden: { y: 24 },
  visible: (i: number = 0) => ({
    y: 0,
    transition: { ...SPRING, delay: i * 0.07 },
  }),
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

/** Viewport intent — trigger early so reveals start before user notices. */
export const inViewOnce = {
  once: true as const,
  amount: 0 as const,
  margin: "0px 0px -8% 0px",
};
