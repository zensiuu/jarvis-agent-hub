import { Database, Wifi } from "lucide-react";

type HealthStatusProps = {
  apiOnline: boolean;
  memoryOnline: boolean;
};

export function HealthStatus({ apiOnline, memoryOnline }: HealthStatusProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-2">
        <Wifi className={apiOnline ? "text-emerald-400" : "text-red-400"} size={16} />
        <span className="text-xs font-semibold uppercase text-slate-400">
          API: {apiOnline ? "Live" : "Offline"}
        </span>
      </div>
      <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
        <Database className={memoryOnline ? "text-blue-400" : "text-slate-600"} size={16} />
        <span className="text-xs font-semibold uppercase text-slate-400">
          Memory: {memoryOnline ? "Connected" : "Unknown"}
        </span>
      </div>
    </div>
  );
}
