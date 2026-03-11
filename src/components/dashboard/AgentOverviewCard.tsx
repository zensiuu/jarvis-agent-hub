import { agents, type AgentStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const statusConfig: Record<AgentStatus, { class: string; label: string }> = {
  online: { class: "bg-primary/20 text-primary border-primary/30", label: "Online" },
  offline: { class: "bg-muted text-muted-foreground border-border", label: "Offline" },
  idle: { class: "bg-warning/20 text-warning border-warning/30", label: "Idle" },
  error: { class: "bg-destructive/20 text-destructive border-destructive/30", label: "Error" },
};

export function AgentOverviewCard() {
  return (
    <div className="glass-card p-5 col-span-12 lg:col-span-8">
      <h3 className="text-sm font-semibold text-foreground mb-4">Agent Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {agents.map((agent, i) => {
          const sc = statusConfig[agent.status];
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{agent.avatar}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.model}</p>
                  </div>
                </div>
                <Badge className={`text-[10px] ${sc.class}`}>{sc.label}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Cost today</p>
                  <p className="text-foreground font-medium">${agent.costToday.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tokens</p>
                  <p className="text-foreground font-medium">{(agent.tokensUsed / 1000).toFixed(0)}k</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Last active: {agent.lastActive}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
