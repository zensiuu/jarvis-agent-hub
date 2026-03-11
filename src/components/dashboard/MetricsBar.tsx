import { Bot, DollarSign, Activity, Heart } from "lucide-react";
import { agents } from "@/data/mockData";
import { motion } from "framer-motion";

const metrics = [
  {
    label: "Active Agents",
    value: agents.filter((a) => a.status === "online").length.toString(),
    total: `/ ${agents.length}`,
    icon: Bot,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Cost Today",
    value: `$${agents.reduce((s, a) => s + a.costToday, 0).toFixed(2)}`,
    total: "",
    icon: DollarSign,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Active Sessions",
    value: "3",
    total: "",
    icon: Activity,
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    label: "System Health",
    value: "98%",
    total: "",
    icon: Heart,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function MetricsBar() {
  return (
    <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card p-4 flex items-center gap-3"
        >
          <div className={`${m.bg} ${m.color} p-2.5 rounded-lg`}>
            <m.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-xl font-bold text-foreground">
              {m.value}
              <span className="text-sm font-normal text-muted-foreground">{m.total}</span>
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
