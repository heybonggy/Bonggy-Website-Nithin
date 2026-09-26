// Product UI seed: the shared app shell and screens used by the homepage
// previews. Presentational and data-driven; example data lives in data.ts.
export { AppShell, TopBar, WindowFrame } from "./app-shell";
export { Sidebar, SidebarRail, type SidebarProps, type View } from "./sidebar";
export { AgentRow } from "./agent-row";
export { AgentAvatar, AvatarStack } from "./avatar";
export { UserMessage, AgentMessage, StatusLine, GoalChip } from "./chat-message";
export { BriefCard, type Brief } from "./brief-card";
export { DraftCard, type Draft, type DraftStatus } from "./draft-card";
export { Composer } from "./composer";
export { ChatView } from "./chat-view";
export { AnalyticsView } from "./analytics-view";
export { ContextView } from "./context-view";
export * from "./data";
