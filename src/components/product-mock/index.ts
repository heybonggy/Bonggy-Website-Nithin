// Product mock: the drawn product UI used by the homepage demos. Data-driven;
// example data lives in data.ts. Mocks render inside DemoFrame (inert,
// aria-hidden, with a screen-reader summary).
export { AnalyticsView } from "./analytics-view";
export { ContextView } from "./context-view";
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
export { DealRiskCard, BriefCard, ChannelPostCard, CrmDiffCard, type CrmChange } from "./result-card";
export { ApprovalCard, type ApprovalState } from "./approval-card";
export { ApprovalsInbox } from "./approvals-inbox";
export { PillTabs, PhoneFrame, type PillTab } from "./team-tabs";
export { HandoffPill, type HandoffMember } from "./handoff-pill";
export { AppWindow, SidebarTeam, type Screen } from "./app-window";
export { ScriptedCursor, CURSOR_IDLE, type CursorState } from "./scripted-cursor";
export { DemoFrame } from "./demo-frame";
export * from "./demo/types";
export { useDemoPlayer, type DemoPlayer } from "./demo/player";
