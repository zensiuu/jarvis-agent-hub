const API_BASE = import.meta.env.VITE_ADMIN_API_URL || "http://localhost:8000";

function getToken(): string {
  return localStorage.getItem("ADMIN_TOKEN") || "";
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  if (!token) {
    throw new Error("Missing ADMIN_TOKEN. Please authenticate.");
  }

  const headers = new Headers(options.headers || {});
  headers.set("X-Admin-Token", token);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchHealth() {
  return apiFetch("/health");
}

export async function fetchConsent(userId: string) {
  return apiFetch(`/admin/consent/${encodeURIComponent(userId)}`);
}

export async function setConsent(userId: string, enabled: boolean) {
  return apiFetch(`/admin/consent/${encodeURIComponent(userId)}`, {
    method: "POST",
    body: JSON.stringify({ enabled }),
  });
}

export async function searchMemory(userId: string, query: string, topK: number) {
  const params = new URLSearchParams({
    q: query,
    top_k: String(topK),
  });
  return apiFetch(`/admin/memory/${encodeURIComponent(userId)}?${params.toString()}`);
}
