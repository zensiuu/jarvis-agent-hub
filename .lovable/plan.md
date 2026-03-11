

# Jarvis AI Agent Dashboard

A dark-themed bento grid dashboard for managing and interacting with your AI agents, with Jarvis as the central command interface.

## Design
- **Dark theme** with bento grid layout — cards of varying sizes in a responsive CSS grid
- Glass/subtle border effects on cards, dark background (#0a0a0f range)
- Green/cyan accent colors for status indicators, warm amber for warnings
- Sidebar navigation with collapsible icon mode

## Pages & Layout

### 1. Dashboard (Main Bento Grid)
- **Top Metrics Bar** — Live agent count, total cost today, active sessions, system health (mock data)
- **Agent Overview Card** (large) — Grid of agent cards showing name, status (online/offline/idle), model, last active, token usage
- **Cost & Spending Card** — Today's cost, projected monthly, cost breakdown donut chart (Recharts)
- **Active Sessions Card** — Recent sessions with agent name, model, context %, duration
- **Sub-Agent Activity Card** — Runs with status badges, cost, duration
- **Token Usage Card** — Per-model usage bars with 7d/30d toggle
- **Cost Trend Chart** — Line chart showing daily costs over time
- **Quick Actions Card** — Start/stop agents, trigger runs

### 2. Agents Page
- Full list of all agents with detailed status, configuration, and controls
- Click into individual agent detail view

### 3. Jarvis Chat Interface
- Slide-out panel or dedicated page with full chat UI
- Message bubbles with markdown rendering
- Command interface: type `/start agent-name`, `/stop agent-name`, `/status` etc.
- Mock responses that simulate Jarvis managing your agents
- Typing indicator, message history
- Jarvis personality — addresses user, references agent statuses from mock data

## Mock Data
- 5-6 sample agents (e.g., "Research Agent", "Code Reviewer", "Data Analyst", "Content Writer", "Email Agent")
- Realistic cost/token data, session histories, and activity logs
- All data stored in React state — ready to swap for real backend later

## Components
- Sidebar with nav links (Dashboard, Agents, Chat with Jarvis)
- Reusable stat cards, status badges, charts
- Chat component with input, message list, command parsing

