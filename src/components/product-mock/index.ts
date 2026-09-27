// Product UI seed: the shared app shell and screens used by the homepage
// previews. Presentational and data-driven; example data lives in data.ts.
export { AppShell, TopBar, WindowFrame } from "./app-shell";
export { Sidebar, SidebarRail, type SidebarProps, type View } from "./sidebar";
export { AgentRow } from "./agent-row";
export { AgentAvatar, AvatarStack } from "./avatar";
export { UserMessage, AgentMessage, StatusLine, GoalChip } from "./chat-message";
export { BriefCard, type Brief } from "./brief-card";
export { DraftCard, type Draft, type DraftStatus } from "./draft-card";
export { SetupCard } from "./setup-card";
export { Composer } from "./composer";
export { ChatView } from "./chat-view";
export { AnalyticsView } from "./analytics-view";
export { ContextView } from "./context-view";
export * from "./legacy-data";

// Paper product mock (bots, flows, approvals). Replaces the legacy exports
// above section by section.
export * from "./data";
export { StatusPill, StatusDot } from "./status-pill";
export { TeamTag, GoalTag, LimitChip } from "./tags";
export { OnOffSwitch } from "./switch";
export { BotRow } from "./bot-row";
export { UserBubble, BotBubble, SystemLine, PendingRow, RichText } from "./chat";
export { ChatComposer } from "./chat-composer";
export { FlowCard, type FlowCardState, type FlowEdit } from "./flow-card";
export { FlowsList, RunHistory } from "./flows-view";
export { RunReceipt, type ReceiptItem } from "./run-receipt";
export { DealRiskCard, BriefCard as PaperBriefCard, ChannelPostCard, CrmDiffCard, type CrmChange } from "./result-card";
export { ApprovalCard, type ApprovalState } from "./approval-card";
export { ApprovalsInbox } from "./approvals-inbox";
export { PillTabs, PhoneFrame, type PillTab } from "./team-tabs";
export { HandoffPill, type HandoffMember } from "./handoff-pill";
export { AppWindow, SidebarTeam, type Screen } from "./app-window";
export { ScriptedCursor, CURSOR_IDLE, type CursorState } from "./scripted-cursor";
export { DemoFrame } from "./demo-frame";
export * from "./demo/types";
export { useDemoPlayer, type DemoPlayer } from "./demo/player";
