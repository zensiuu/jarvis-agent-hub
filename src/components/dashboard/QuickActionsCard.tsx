import { Play, Square, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const actions = [
  { label: "Start All", icon: Play, variant: "default" as const, action: () => toast.success("All agents started") },
  { label: "Stop All", icon: Square, variant: "secondary" as const, action: () => toast.info("All agents stopped") },
  { label: "Restart Failed", icon: RotateCcw, variant: "secondary" as const, action: () => toast.success("Failed agents restarted") },
  { label: "Quick Run", icon: Zap, variant: "secondary" as const, action: () => toast.success("Quick run triggered") },
];

export function QuickActionsCard() {
  return (
    <div className="glass-card p-5 col-span-12 lg:col-span-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Quick Actions</h3>
      <p className="text-xs text-muted-foreground mb-4">Manage all agents at once</p>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <Button
            key={a.label}
            variant={a.variant}
            className="h-auto py-3 flex flex-col gap-1.5"
            onClick={a.action}
          >
            <a.icon className="h-4 w-4" />
            <span className="text-xs">{a.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
