export type AgentStatus = "online" | "offline" | "idle" | "error";

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  model: string;
  lastActive: string;
  tokensUsed: number;
  costToday: number;
  costTotal: number;
  sessionsCount: number;
  avatar: string;
}

export interface Session {
  id: string;
  agentId: string;
  agentName: string;
  model: string;
  contextUsage: number;
  duration: string;
  status: "active" | "completed" | "failed";
  startedAt: string;
}

export interface SubAgentRun {
  id: string;
  parentAgent: string;
  subAgent: string;
  task: string;
  status: "running" | "completed" | "failed" | "queued";
  cost: number;
  duration: string;
  timestamp: string;
}

export interface CostDataPoint {
  date: string;
  cost: number;
}

export interface TokenUsage {
  model: string;
  tokens: number;
  cost: number;
  color: string;
}

export const agents: Agent[] = [
  {
    id: "agent-1",
    name: "Research Agent",
    description: "Deep web research, paper analysis, and knowledge synthesis",
    status: "online",
    model: "GPT-4o",
    lastActive: "Just now",
    tokensUsed: 1_245_000,
    costToday: 4.82,
    costTotal: 142.50,
    sessionsCount: 34,
    avatar: "🔍",
  },
  {
    id: "agent-2",
    name: "Code Reviewer",
    description: "Automated code review, vulnerability scanning, and suggestions",
    status: "online",
    model: "Claude 3.5",
    lastActive: "2m ago",
    tokensUsed: 890_000,
    costToday: 3.21,
    costTotal: 98.30,
    sessionsCount: 28,
    avatar: "🧑‍💻",
  },
  {
    id: "agent-3",
    name: "Data Analyst",
    description: "Data processing, visualization, and insight generation",
    status: "idle",
    model: "GPT-4o-mini",
    lastActive: "15m ago",
    tokensUsed: 520_000,
    costToday: 0.95,
    costTotal: 67.20,
    sessionsCount: 19,
    avatar: "📊",
  },
  {
    id: "agent-4",
    name: "Content Writer",
    description: "Blog posts, documentation, and marketing copy generation",
    status: "offline",
    model: "Claude 3.5",
    lastActive: "2h ago",
    tokensUsed: 2_100_000,
    costToday: 0,
    costTotal: 215.80,
    sessionsCount: 45,
    avatar: "✍️",
  },
  {
    id: "agent-5",
    name: "Email Agent",
    description: "Email drafting, scheduling, and response management",
    status: "online",
    model: "GPT-4o-mini",
    lastActive: "Just now",
    tokensUsed: 340_000,
    costToday: 0.62,
    costTotal: 34.10,
    sessionsCount: 52,
    avatar: "📧",
  },
  {
    id: "agent-6",
    name: "DevOps Monitor",
    description: "Infrastructure monitoring, alerts, and automated remediation",
    status: "error",
    model: "GPT-4o",
    lastActive: "5m ago",
    tokensUsed: 180_000,
    costToday: 1.10,
    costTotal: 56.90,
    sessionsCount: 12,
    avatar: "🛠️",
  },
];

export const sessions: Session[] = [
  { id: "s1", agentId: "agent-1", agentName: "Research Agent", model: "GPT-4o", contextUsage: 72, duration: "12m", status: "active", startedAt: "2 min ago" },
  { id: "s2", agentId: "agent-2", agentName: "Code Reviewer", model: "Claude 3.5", contextUsage: 45, duration: "8m", status: "active", startedAt: "5 min ago" },
  { id: "s3", agentId: "agent-5", agentName: "Email Agent", model: "GPT-4o-mini", contextUsage: 23, duration: "3m", status: "active", startedAt: "1 min ago" },
  { id: "s4", agentId: "agent-1", agentName: "Research Agent", model: "GPT-4o", contextUsage: 100, duration: "45m", status: "completed", startedAt: "1h ago" },
  { id: "s5", agentId: "agent-6", agentName: "DevOps Monitor", model: "GPT-4o", contextUsage: 89, duration: "5m", status: "failed", startedAt: "10 min ago" },
];

export const subAgentRuns: SubAgentRun[] = [
  { id: "r1", parentAgent: "Research Agent", subAgent: "Web Scraper", task: "Extract pricing data from competitors", status: "running", cost: 0.12, duration: "2m 30s", timestamp: "Just now" },
  { id: "r2", parentAgent: "Code Reviewer", subAgent: "Security Scanner", task: "Check for SQL injection vulnerabilities", status: "completed", cost: 0.08, duration: "1m 15s", timestamp: "3m ago" },
  { id: "r3", parentAgent: "Research Agent", subAgent: "PDF Parser", task: "Extract data from quarterly report", status: "completed", cost: 0.05, duration: "45s", timestamp: "8m ago" },
  { id: "r4", parentAgent: "Data Analyst", subAgent: "Chart Generator", task: "Create revenue visualization", status: "queued", cost: 0, duration: "-", timestamp: "12m ago" },
  { id: "r5", parentAgent: "DevOps Monitor", subAgent: "Log Analyzer", task: "Parse error logs from production", status: "failed", cost: 0.03, duration: "30s", timestamp: "15m ago" },
];

export const costTrend: CostDataPoint[] = [
  { date: "Mar 1", cost: 8.2 },
  { date: "Mar 2", cost: 12.5 },
  { date: "Mar 3", cost: 9.8 },
  { date: "Mar 4", cost: 15.3 },
  { date: "Mar 5", cost: 11.2 },
  { date: "Mar 6", cost: 14.7 },
  { date: "Mar 7", cost: 10.7 },
  { date: "Mar 8", cost: 13.1 },
  { date: "Mar 9", cost: 16.2 },
  { date: "Mar 10", cost: 12.8 },
  { date: "Mar 11", cost: 10.7 },
];

export const tokenUsage: TokenUsage[] = [
  { model: "GPT-4o", tokens: 1_425_000, cost: 5.92, color: "hsl(160, 80%, 48%)" },
  { model: "Claude 3.5", tokens: 890_000, cost: 3.21, color: "hsl(200, 80%, 55%)" },
  { model: "GPT-4o-mini", tokens: 860_000, cost: 1.57, color: "hsl(38, 92%, 50%)" },
];

export const costBreakdown = [
  { name: "GPT-4o", value: 5.92, fill: "hsl(160, 80%, 48%)" },
  { name: "Claude 3.5", value: 3.21, fill: "hsl(200, 80%, 55%)" },
  { name: "GPT-4o-mini", value: 1.57, fill: "hsl(38, 92%, 50%)" },
];
