export type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  expires_in?: number;
  token_type?: string;
  user: SupabaseUser;
};

const url = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, "");
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
const STORAGE_KEY = "crm-suite-supabase-session";

export const supabaseConfigured = Boolean(url && key);

function requireConfig() {
  if (!url || !key) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.");
  }
}

function saveSession(session: SupabaseSession | null) {
  if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("crm-auth-change"));
}

function readSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

async function request(path: string, options: RequestInit = {}) {
  requireConfig();
  const response = await fetch(`${url}/auth/v1/${path}`, {
    ...options,
    headers: {
      apikey: key!,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.msg || body?.message || body?.error_description || body?.error || "Authentication request failed.");
  }
  return body;
}

export async function signUp(name: string, email: string, password: string) {
  const body = await request("signup", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      data: { full_name: name.trim() },
    }),
  });
  if (body?.access_token && body?.refresh_token && body?.user) saveSession(body);
  return body as SupabaseSession & { confirmation_sent_at?: string };
}

export async function signIn(email: string, password: string) {
  const body = await request("token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });
  saveSession(body);
  return body as SupabaseSession;
}

export async function signOut() {
  const session = readSession();
  try {
    if (session?.access_token) {
      await request("logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
    }
  } finally {
    saveSession(null);
  }
}

export function getSession() {
  return readSession();
}

export function getUser() {
  return readSession()?.user ?? null;
}

export async function refreshSession() {
  const session = readSession();
  if (!session?.refresh_token) return null;
  try {
    const body = await request("token?grant_type=refresh_token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    saveSession(body);
    return body as SupabaseSession;
  } catch {
    saveSession(null);
    return null;
  }
}

export function onAuthStateChange(callback: (session: SupabaseSession | null) => void) {
  const handler = () => callback(readSession());
  window.addEventListener("crm-auth-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("crm-auth-change", handler);
    window.removeEventListener("storage", handler);
  };
}
