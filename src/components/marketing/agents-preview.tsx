"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import { ArrowClockwise } from "@phosphor-icons/react/dist/ssr";
import {
  AppShell,
  TopBar,
  WindowFrame,
  AgentAvatar,
  AgentMessage,
  UserMessage,
  StatusLine,
  GoalChip,
  BriefCard,
  DraftCard,
  ChatView,
  AGENTS,
  GROUPS,
  ACCOUNT_RESEARCHER,
  DEMO_PROMPT,
  DEMO_SOURCES,
  DEMO_BRIEF,
  DEMO_DRAFT,
  DEMO_GOAL,
} from "@/components/product-mock";
import { usePrefersReducedMotion } from "./_motion";
import { useIsNarrow } from "./use-is-narrow";

const DONE_PREVIEW = "Brief ready for Acme · Thu call";

// Script stages, in order.
type Stage = "idle" | "typing" | "sent" | "reading" | "brief" | "draft" | "done";
const ORDER: Stage[] = ["idle", "typing", "sent", "reading", "brief", "draft", "done"];
const reached = (stage: Stage, s: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(s);

/**
 * Hero preview: the Agents screen playing out a scripted conversation with
 * the Account Researcher. Plays once when first on screen, then Replay.
 * Decorative (inert, aria-hidden) with a text summary for screen readers.
 */
export function AgentsPreview({ onPlayingChange }: { onPlayingChange?: (p: boolean) => void }) {
  const reduce = usePrefersReducedMotion();
  const narrow = useIsNarrow();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const [runId, setRunId] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>("idle");
  const [typed, setTyped] = React.useState(0);
  const [source, setSource] = React.useState(0);

  const [autoplayed, setAutoplayed] = React.useState(false);
  if (inView && !autoplayed && !reduce) {
    setAutoplayed(true);
    setRunId(1);
  }

  React.useEffect(() => {
    if (runId === 0 || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(0, () => {
      setStage("typing");
      setTyped(0);
      setSource(0);
    });
    // Type the prompt into the composer (instant on narrow screens).
    if (narrow) {
      at(150, () => setTyped(DEMO_PROMPT.length));
      t = 700;
    } else {
      for (let i = 1; i <= DEMO_PROMPT.length; i++) at(300 + i * 24, () => setTyped(i));
      t = 300 + DEMO_PROMPT.length * 24 + 350;
    }
    at(t, () => setStage("sent"));
    at(t + 500, () => setStage("reading"));
    DEMO_SOURCES.forEach((_, i) => at(t + 500 + i * 480, () => setSource(i)));
    at(t + 2100, () => setStage("brief"));
    at(t + 2100 + (narrow ? 700 : 1700), () => setStage("draft"));
    at(t + 2100 + (narrow ? 1500 : 2600), () => setStage("done"));
    return () => timers.forEach(clearTimeout);
  }, [runId, reduce, narrow]);

  const shown: Stage = reduce ? "done" : stage;
  const playing = !reduce && shown !== "idle" && shown !== "done";

  React.useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  const agents = AGENTS.map((a) =>
    a.id === ACCOUNT_RESEARCHER.id && reached(shown, "done") ? { ...a, preview: DONE_PREVIEW, time: "now" } : a,
  );
  const composerText = shown === "typing" ? DEMO_PROMPT.slice(0, typed) : "";

  return (
    <div ref={ref} className="grid min-w-0 grid-cols-1 gap-3">
      <p className="sr-only">
        Product preview with example data: you ask the Account Researcher to research acme.com before
        a Thursday call. It reads the website, LinkedIn and CRM notes, returns an account brief (company,
        why now, three likely pains, who&apos;s in the room, a suggested angle) and a draft email that
        needs your approval, mapped to the goal &ldquo;{DEMO_GOAL}&rdquo;.
      </p>
      <MotionConfig reducedMotion="user">
        <div aria-hidden inert className="h-[640px] sm:h-[620px] lg:h-[660px]">
          <WindowFrame label="Product preview · example data" path="agents/account-researcher">
            <AppShell
              sidebar={{
                agents,
                groups: GROUPS,
                view: "agents",
                activeId: ACCOUNT_RESEARCHER.id,
                highlightId: shown === "done" && !reduce ? ACCOUNT_RESEARCHER.id : undefined,
              }}
              header={
                <TopBar
                  leading={<AgentAvatar avatar={ACCOUNT_RESEARCHER.avatar} size={22} />}
                  title={ACCOUNT_RESEARCHER.name}
                  subtitle={ACCOUNT_RESEARCHER.role}
                />
              }
            >
              <ChatView
                placeholder={`Ask ${ACCOUNT_RESEARCHER.name}…`}
                composerValue={composerText}
                composerId="hero-preview-composer"
              >
                <AgentMessage agent={ACCOUNT_RESEARCHER} time="09:15">
                  <p className="m-0 text-[13.5px] leading-relaxed text-foreground">
                    Morning. Give me a company and I&apos;ll brief you before the call.
                  </p>
                </AgentMessage>

                <AnimatePresence initial={false}>
                  {reached(shown, "sent") ? (
                    <motion.div key={`u-${runId}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <UserMessage time="10:42">{DEMO_PROMPT}</UserMessage>
                    </motion.div>
                  ) : null}

                  {reached(shown, "reading") ? (
                    <motion.div key={`a-${runId}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <AgentMessage agent={ACCOUNT_RESEARCHER} time="10:43" showActions={shown === "done"}>
                        <StatusLine working={shown === "reading"}>
                          {shown === "reading"
                            ? `Reading ${DEMO_SOURCES.slice(0, source + 1).join(", ")}…`
                            : `Read ${DEMO_SOURCES.join(", ")}`}
                        </StatusLine>
                        {reached(shown, "brief") ? (
                          <BriefCard
                            title="Account brief · Acme Logistics"
                            brief={DEMO_BRIEF}
                            build={!reduce && !narrow}
                          />
                        ) : null}
                        {reached(shown, "draft") ? (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                            <DraftCard draft={DEMO_DRAFT} pulseApprove={!reduce && !narrow} />
                          </motion.div>
                        ) : null}
                        {reached(shown, "done") ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <GoalChip goal={DEMO_GOAL} />
                          </motion.div>
                        ) : null}
                      </AgentMessage>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </ChatView>
            </AppShell>
          </WindowFrame>
        </div>
      </MotionConfig>

      <div className="flex min-h-8 items-center justify-between gap-3">
        <p className="m-0 text-[12px] text-muted-foreground">
          Scripted preview. Names, companies and results are made up.
        </p>
        {!reduce && shown === "done" ? (
          <button
            type="button"
            onClick={() => setRunId((r) => r + 1)}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border px-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <ArrowClockwise weight="bold" className="size-3.5" aria-hidden />
            Replay
          </button>
        ) : null}
      </div>
    </div>
  );
}
