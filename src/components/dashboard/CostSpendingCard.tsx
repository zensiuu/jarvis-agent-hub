import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { costBreakdown } from "@/data/mockData";

export function CostSpendingCard() {
  const total = costBreakdown.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card p-5 col-span-12 lg:col-span-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Cost Breakdown</h3>
      <p className="text-xs text-muted-foreground mb-4">Today's spending by model</p>

      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={costBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {costBreakdown.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(240, 12%, 7%)",
                border: "1px solid hsl(240, 10%, 18%)",
                borderRadius: "8px",
                color: "hsl(210, 20%, 92%)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-foreground">${total.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">Total today</p>
      </div>

      <div className="space-y-2">
        {costBreakdown.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.fill }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-foreground font-medium">${item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
