import { useEffect, useState } from "react";

type AuthGateProps = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("ADMIN_TOKEN") || "";
    if (existing) {
      setToken(existing);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (!token.trim()) {
      return;
    }
    localStorage.setItem("ADMIN_TOKEN", token.trim());
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("ADMIN_TOKEN");
    setToken("");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-8 text-white">
        <h2 className="text-2xl font-bold">Admin Portal Login</h2>
        <p className="text-sm text-slate-400">Enter your ADMIN_TOKEN to unlock the dashboard.</p>
        <input
          type="password"
          placeholder="ADMIN_TOKEN"
          className="w-72 rounded border border-slate-800 bg-slate-900 px-3 py-2 text-white outline-none"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <button
          onClick={handleLogin}
          className="rounded bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          Authorize
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="rounded border border-slate-800 px-3 py-1 text-xs text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}
