import { subAgentRuns } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  running: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-muted text-muted-foreground border-border",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
  queued: "bg-warning/20 text-warning border-warning/30",
};

export function SubAgentActivityCard() {
  return (
    <div className="glass-card p-5 col-span-12 md:col-span-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Sub-Agent Activity</h3>
      <div className="space-y-3">
        {subAgentRuns.map((run) => (
          <div key={run.id} className="rounded-lg border border-border bg-secondary/20 p-3">
            <div className="flex items-start justify-between mb-1">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{run.subAgent}</p>
                <p className="text-xs text-muted-foreground">by {run.parentAgent}</p>
              </div>
              <Badge className={`text-[10px] shrink-0 ${statusColors[run.status]}`}>{run.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2 truncate">{run.task}</p>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>{run.duration}</span>
              <span>•</span>
              <span>${run.cost.toFixed(2)}</span>
              <span>•</span>
              <span>{run.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
