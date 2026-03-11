import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { costTrend } from "@/data/mockData";

export function CostTrendCard() {
  return (
    <div className="glass-card p-5 col-span-12 md:col-span-6 lg:col-span-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Cost Trend</h3>
      <p className="text-xs text-muted-foreground mb-4">Daily spending — last 11 days</p>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={costTrend}>
            <defs>
              <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 80%, 48%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(160, 80%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }}
              tickFormatter={(v) => `$${v}`}
              width={40}
            />
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
            <Area
              type="monotone"
              dataKey="cost"
              stroke="hsl(160, 80%, 48%)"
              strokeWidth={2}
              fill="url(#costGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
