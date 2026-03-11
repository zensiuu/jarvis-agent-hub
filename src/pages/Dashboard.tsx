import { MetricsBar } from "@/components/dashboard/MetricsBar";
import { AgentOverviewCard } from "@/components/dashboard/AgentOverviewCard";
import { CostSpendingCard } from "@/components/dashboard/CostSpendingCard";
import { ActiveSessionsCard } from "@/components/dashboard/ActiveSessionsCard";
import { SubAgentActivityCard } from "@/components/dashboard/SubAgentActivityCard";
import { TokenUsageCard } from "@/components/dashboard/TokenUsageCard";
import { CostTrendCard } from "@/components/dashboard/CostTrendCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your AI agent ecosystem</p>
      </div>
      <div className="bento-grid">
        <MetricsBar />
        <AgentOverviewCard />
        <CostSpendingCard />
        <ActiveSessionsCard />
        <SubAgentActivityCard />
        <TokenUsageCard />
        <CostTrendCard />
        <QuickActionsCard />
      </div>
    </div>
  );
}
