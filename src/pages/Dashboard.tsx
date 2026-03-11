import { useEffect, useState } from "react";
import AuthGate from "@/components/dashboard/AuthGate";
import { MetricsBar } from "@/components/dashboard/MetricsBar";
import { AgentOverviewCard } from "@/components/dashboard/AgentOverviewCard";
import { CostSpendingCard } from "@/components/dashboard/CostSpendingCard";
import { ActiveSessionsCard } from "@/components/dashboard/ActiveSessionsCard";
import { SubAgentActivityCard } from "@/components/dashboard/SubAgentActivityCard";
import { TokenUsageCard } from "@/components/dashboard/TokenUsageCard";
import { CostTrendCard } from "@/components/dashboard/CostTrendCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { UserSelector } from "@/components/dashboard/UserSelector";
import { ConsentToggle } from "@/components/dashboard/ConsentToggle";
import { HealthStatus } from "@/components/dashboard/HealthStatus";
import { MemorySearch } from "@/components/dashboard/MemorySearch";
import { fetchConsent, fetchHealth, setConsent } from "@/services/api";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState("");
  const [apiOnline, setApiOnline] = useState(false);
  const [memoryOnline, setMemoryOnline] = useState(false);
  const [consent, setConsentState] = useState<boolean | null>(null);
  const [consentLoading, setConsentLoading] = useState(false);

  useEffect(() => {
    fetchHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  useEffect(() => {
    if (!selectedUser.trim()) {
      setConsentState(null);
      return;
    }
    setConsentLoading(true);
    fetchConsent(selectedUser.trim())
      .then((data) => setConsentState(Boolean(data.enabled)))
      .catch(() => setConsentState(null))
      .finally(() => setConsentLoading(false));
  }, [selectedUser]);

  const handleToggleConsent = async (next: boolean) => {
    if (!selectedUser.trim()) {
      return;
    }
    setConsentLoading(true);
    try {
      await setConsent(selectedUser.trim(), next);
      setConsentState(next);
    } finally {
      setConsentLoading(false);
    }
  };

  return (
    <AuthGate>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your AI agent ecosystem</p>
        </div>

        <div className="mb-8 grid gap-4">
          <HealthStatus apiOnline={apiOnline} memoryOnline={memoryOnline} />
          <UserSelector selectedUser={selectedUser} onUserChange={setSelectedUser} />
          <ConsentToggle
            isOn={Boolean(consent)}
            onToggle={handleToggleConsent}
            disabled={!selectedUser || consentLoading}
          />
          {selectedUser ? (
            <MemorySearch userId={selectedUser} onMemoryStatus={setMemoryOnline} />
          ) : (
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-xs text-slate-400">
              Select a user to inspect memory.
            </div>
          )}
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
    </AuthGate>
  );
}
