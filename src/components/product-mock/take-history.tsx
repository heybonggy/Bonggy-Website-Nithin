"use client";

import * as React from "react";
import { motion } from "motion/react";
import { EASE } from "@/components/marketing/_motion";
import { SystemLine } from "./chat";

/**
 * A finished take shown as chat history above a live one: it dims to 40%
 * over 300ms when playback starts, with a divider below it. Keeps a demo
 * pane from ever sitting empty while the new take builds up.
 */
export function TakeHistory({ label = "now", children }: { label?: string; children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.3, ease: EASE.exit }}
        className="flex flex-col gap-3"
      >
        {children}
      </motion.div>
      <SystemLine timestamp text={label} />
    </>
  );
}
