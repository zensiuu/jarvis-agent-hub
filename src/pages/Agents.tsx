import { useState } from "react";
import { agents, type Agent, type AgentStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Square, Settings, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const statusConfig: Record<AgentStatus, { class: string; label: string; dot: string }> = {
  online: { class: "bg-primary/20 text-primary border-primary/30", label: "Online", dot: "bg-primary" },
  offline: { class: "bg-muted text-muted-foreground border-border", label: "Offline", dot: "bg-muted-foreground" },
  idle: { class: "bg-warning/20 text-warning border-warning/30", label: "Idle", dot: "bg-warning" },
  error: { class: "bg-destructive/20 text-destructive border-destructive/30", label: "Error", dot: "bg-destructive" },
};

export default function Agents() {
  const [selected, setSelected] = useState<Agent | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Agents</h1>
        <p className="text-sm text-muted-foreground">Manage and configure your AI agents</p>
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => setSelected(null)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="glass-card p-6 max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{selected.avatar}</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.description}</p>
                </div>
                <Badge className={`ml-auto ${statusConfig[selected.status].class}`}>
                  {statusConfig[selected.status].label}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Model", value: selected.model },
                  { label: "Sessions", value: selected.sessionsCount.toString() },
                  { label: "Cost Today", value: `$${selected.costToday.toFixed(2)}` },
                  { label: "Total Cost", value: `$${selected.costTotal.toFixed(2)}` },
                  { label: "Tokens Used", value: `${(selected.tokensUsed / 1000).toFixed(0)}k` },
                  { label: "Last Active", value: selected.lastActive },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-secondary/20 p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => toast.success(`${selected.name} started`)}>
                  <Play className="h-3 w-3 mr-1" /> Start
                </Button>
                <Button size="sm" variant="secondary" onClick={() => toast.info(`${selected.name} stopped`)}>
                  <Square className="h-3 w-3 mr-1" /> Stop
                </Button>
                <Button size="sm" variant="secondary">
                  <Settings className="h-3 w-3 mr-1" /> Configure
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {agents.map((agent) => {
              const sc = statusConfig[agent.status];
              return (
                <div
                  key={agent.id}
                  className="glass-card p-5 cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => setSelected(agent)}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{agent.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                        <div className={`w-2 h-2 rounded-full ${sc.dot} animate-pulse-glow`} />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
                    </div>
                    <Badge className={`text-[10px] ${sc.class}`}>{sc.label}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Model</p>
                      <p className="text-foreground font-medium">{agent.model}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Cost</p>
                      <p className="text-foreground font-medium">${agent.costToday.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sessions</p>
                      <p className="text-foreground font-medium">{agent.sessionsCount}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
