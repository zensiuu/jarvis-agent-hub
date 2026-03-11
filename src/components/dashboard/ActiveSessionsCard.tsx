import { sessions } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const statusColors: Record<string, string> = {
  active: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-muted text-muted-foreground border-border",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
};

export function ActiveSessionsCard() {
  return (
    <div className="glass-card p-5 col-span-12 md:col-span-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Active Sessions</h3>
      <div className="space-y-3">
        {sessions.slice(0, 4).map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/20 p-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-foreground truncate">{s.agentName}</p>
                <Badge className={`text-[10px] ${statusColors[s.status]}`}>{s.status}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{s.model}</span>
                <span>•</span>
                <span>{s.duration}</span>
                <span>•</span>
                <span>{s.startedAt}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Progress value={s.contextUsage} className="h-1.5 flex-1" />
                <span className="text-[10px] text-muted-foreground w-8 text-right">{s.contextUsage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
