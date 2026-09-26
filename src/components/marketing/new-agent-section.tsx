"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import {
  AppShell,
  TopBar,
  WindowFrame,
  AgentAvatar,
  AgentMessage,
  UserMessage,
  StatusLine,
  GoalChip,
  SetupCard,
  ChatView,
  AGENTS,
  GROUPS,
  DEAL_COACH,
  COACH_PROMPT,
  COACH_SETUP,
  type Agent,
} from "@/components/product-mock";
import { Section } from "./section";
import { usePrefersReducedMotion } from "./_motion";
import { useIsNarrow } from "./use-is-narrow";

const NEW_AGENT = { name: "New agent", avatar: { shape: "circle" as const, tone: "steel" as const } };
const COACH_GOAL = "Q4 new enterprise logos";
const NEW_ROW: Agent = { ...DEAL_COACH, preview: "Set up · first review Monday", time: "now", unread: false };
const BASE_AGENTS = AGENTS.filter((a) => a.id !== DEAL_COACH.id);

type Stage = "idle" | "press" | "new" | "typing" | "sent" | "setting" | "done";
const ORDER: Stage[] = ["idle", "press", "new", "typing", "sent", "setting", "done"];
const reached = (stage: Stage, s: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(s);

export function NewAgentSection() {
  return (
    <Section id="agents" eyebrow="Build your own">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="text-display text-balance text-[36px] font-normal leading-none tracking-tight sm:text-[44px] lg:text-[56px]">
          An agent for every job.{" "}
          <span className="text-muted-foreground/85">Describe it, and it sets itself up.</span>
        </h2>
        <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted-foreground lg:pt-2">
          Start from a template or describe the job in plain words. The new
          agent confirms what it will do and which revenue goal it serves, and
          nothing it makes goes out without your approval.
        </p>
      </div>
      <NewAgentPreview />
    </Section>
  );
}

function NewAgentPreview() {
  const reduce = usePrefersReducedMotion();
  const narrow = useIsNarrow();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  const [runId, setRunId] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>("idle");
  const [typed, setTyped] = React.useState(0);

  const [autoplayed, setAutoplayed] = React.useState(false);
  if (inView && !autoplayed && !reduce) {
    setAutoplayed(true);
    setRunId(1);
  }

  React.useEffect(() => {
    if (runId === 0 || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    at(0, () => {
      setStage("idle");
      setTyped(0);
    });
    at(500, () => setStage("press"));
    at(1100, () => setStage("new"));
    let t = 1700;
    at(t, () => setStage("typing"));
    if (narrow) {
      at(t + 100, () => setTyped(COACH_PROMPT.length));
      t += 600;
    } else {
      for (let i = 1; i <= COACH_PROMPT.length; i++) at(t + i * 22, () => setTyped(i));
      t += COACH_PROMPT.length * 22 + 350;
    }
    at(t, () => setStage("sent"));
    at(t + 500, () => setStage("setting"));
    at(t + 1800, () => setStage("done"));
    return () => timers.forEach(clearTimeout);
  }, [runId, reduce, narrow]);

  const shown: Stage = reduce ? "done" : stage;
  const isNew = reached(shown, "new");
  const named = reached(shown, "done");
  const agents = named ? [...BASE_AGENTS, NEW_ROW] : BASE_AGENTS;
  const current = named ? DEAL_COACH : isNew ? NEW_AGENT : BASE_AGENTS[1];

  return (
    <div ref={ref} className="mt-14 grid min-w-0 grid-cols-1 gap-3">
      <p className="sr-only">
        Product preview with example data: you press New agent and write &ldquo;{COACH_PROMPT}&rdquo;.
        The agent confirms its job (every Monday at 8:00 it reviews your open deals and flags ones with
        no activity in 14 days or no next step), maps its work to the goal &ldquo;{COACH_GOAL}&rdquo;, and
        appears in the sidebar as Deal Coach.
      </p>
      <MotionConfig reducedMotion="user">
        <div aria-hidden inert className="h-[600px] md:h-[640px]">
          <WindowFrame label="Product preview · example data" path={isNew ? "agents/new" : "agents/market-modeller"}>
            <AppShell
              sidebar={{
                agents,
                groups: GROUPS,
                view: "agents",
                activeId: named ? DEAL_COACH.id : isNew ? undefined : "modeller",
                highlightId: named && !reduce ? DEAL_COACH.id : undefined,
                newPressed: shown === "press" || (isNew && !named),
              }}
              header={
                <TopBar
                  leading={<AgentAvatar avatar={current.avatar} size={22} />}
                  title={current.name}
                  subtitle={named ? "Value generator" : isNew ? "Describe the job" : "Modeller"}
                />
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {isNew ? (
                  <motion.div key={`new-${runId}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ChatView
                      placeholder="Describe the job…"
                      composerValue={shown === "typing" ? COACH_PROMPT.slice(0, typed) : ""}
                      composerId="new-agent-composer"
                    >
                      <AgentMessage agent={NEW_AGENT}>
                        <p className="m-0 text-[13.5px] leading-relaxed text-foreground">
                          Tell me the job. I&apos;ll set myself up, and nothing I make goes out without your approval.
                        </p>
                      </AgentMessage>
                      {reached(shown, "sent") ? (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                          <UserMessage>{COACH_PROMPT}</UserMessage>
                        </motion.div>
                      ) : null}
                      {reached(shown, "setting") ? (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                          <AgentMessage agent={named ? DEAL_COACH : NEW_AGENT} time="now">
                            <StatusLine working={shown === "setting"}>
                              {shown === "setting" ? "Setting up…" : "Set up as Deal Coach"}
                            </StatusLine>
                            {named ? (
                              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2.5">
                                <p className="m-0 text-[13.5px] leading-relaxed text-foreground">
                                  Got it. I&apos;m your Deal Coach. Here&apos;s the job as I understand it:
                                </p>
                                <SetupCard title="Deal Coach" rows={COACH_SETUP} />
                                <GoalChip goal={COACH_GOAL} />
                              </motion.div>
                            ) : null}
                          </AgentMessage>
                        </motion.div>
                      ) : null}
                    </ChatView>
                  </motion.div>
                ) : (
                  <motion.div key="modeller" className="h-full" exit={{ opacity: 0 }}>
                    <ChatView placeholder="Ask Market Modeller…" composerId="modeller-composer">
                      <AgentMessage agent={BASE_AGENTS[1]} time="Yesterday">
                        <p className="m-0 text-[13.5px] leading-relaxed text-foreground">
                          Mid-market logistics is 40% of Q3 wins, with the shortest cycles. Start there.
                        </p>
                      </AgentMessage>
                    </ChatView>
                  </motion.div>
                )}
              </AnimatePresence>
            </AppShell>
          </WindowFrame>
        </div>
      </MotionConfig>

      <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-[12px] text-muted-foreground">
          Scripted preview. Deals and goals are example data.
        </p>
        {!reduce ? (
          <button
            type="button"
            onClick={() => setRunId((r) => r + 1)}
            disabled={shown !== "done" && runId > 0}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border px-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal disabled:opacity-50"
          >
            <Plus weight="bold" className="size-3.5" aria-hidden />
            Create a Deal Coach
          </button>
        ) : null}
      </div>
    </div>
  );
}
