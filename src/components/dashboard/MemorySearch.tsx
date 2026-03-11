import { useState } from "react";
import { Database, Sliders } from "lucide-react";
import { searchMemory } from "@/services/api";

type MemorySearchProps = {
  userId: string;
  onMemoryStatus: (online: boolean) => void;
};

type MemoryItem = {
  kind: string;
  text: string;
};

export function MemorySearch({ userId, onMemoryStatus }: MemorySearchProps) {
  const [query, setQuery] = useState("");
  const [topK, setTopK] = useState(5);
  const [results, setResults] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError("Enter a user ID first.");
      return;
    }
    if (!query.trim()) {
      setError("Enter a search query.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchMemory(userId.trim(), query.trim(), topK);
      setResults(data.items || []);
      onMemoryStatus(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
      onMemoryStatus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <Database size={16} /> Memory Inspect
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <Sliders size={14} /> k: {topK}
          <input
            type="range"
            min={1}
            max={20}
            value={topK}
            onChange={(event) => setTopK(Number(event.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="flex-1 rounded border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          placeholder="Semantic query (e.g. user preferences)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          onClick={handleSearch}
          className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          disabled={loading}
        >
          {loading ? "Searching..." : "Query"}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <div className="mt-4 space-y-2">
        {results.length === 0 && !loading ? (
          <p className="text-xs text-slate-500">No results yet.</p>
        ) : null}
        {results.map((item, idx) => (
          <div key={`${item.kind}-${idx}`} className="rounded border-l-4 border-emerald-500 bg-slate-950 p-3">
            <span className="text-[10px] font-mono uppercase text-emerald-400">
              {item.kind || "memory"}
            </span>
            <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-200">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
