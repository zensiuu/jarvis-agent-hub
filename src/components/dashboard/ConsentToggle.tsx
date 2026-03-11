type ConsentToggleProps = {
  isOn: boolean;
  onToggle: (next: boolean) => void;
  disabled?: boolean;
};

export function ConsentToggle({ isOn, onToggle, disabled }: ConsentToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div>
        <h4 className="text-sm font-semibold text-white">Memory Retention</h4>
        <p className="text-xs text-slate-500">Enable/disable learning for this user.</p>
      </div>
      <button
        onClick={() => onToggle(!isOn)}
        disabled={disabled}
        className={`relative h-6 w-12 rounded-full transition ${
          disabled ? "bg-slate-700 opacity-60" : isOn ? "bg-emerald-500" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            isOn ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
