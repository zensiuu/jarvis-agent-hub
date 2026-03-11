import { tokenUsage } from "@/data/mockData";

export function TokenUsageCard() {
  const maxTokens = Math.max(...tokenUsage.map((t) => t.tokens));

  return (
    <div className="glass-card p-5 col-span-12 md:col-span-6 lg:col-span-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Token Usage</h3>
      <p className="text-xs text-muted-foreground mb-4">By model — last 7 days</p>
      <div className="space-y-4">
        {tokenUsage.map((t) => (
          <div key={t.model}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-foreground font-medium">{t.model}</span>
              <span className="text-muted-foreground">{(t.tokens / 1_000_000).toFixed(2)}M tokens</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(t.tokens / maxTokens) * 100}%`,
                  background: t.color,
                }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">${t.cost.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
