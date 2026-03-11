import { Search } from "lucide-react";

type UserSelectorProps = {
  selectedUser: string;
  onUserChange: (value: string) => void;
};

export function UserSelector({ selectedUser, onUserChange }: UserSelectorProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
      <label className="text-xs font-semibold uppercase text-slate-400">Target User</label>
      <div className="mt-2 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            className="w-full rounded border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white outline-none"
            placeholder="User ID (e.g. 123456789)"
            value={selectedUser}
            onChange={(event) => onUserChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
