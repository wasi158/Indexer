const AUTH_KEY = "ii_auth_session";

export type AuthSession = {
  name: string;
  email: string;
  loggedIn: true;
};

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.loggedIn || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setSession(session: Omit<AuthSession, "loggedIn">) {
  if (typeof window === "undefined") return;
  const payload: AuthSession = {
    name: session.name.trim() || "Member",
    email: session.email.trim(),
    loggedIn: true,
  };
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  return Boolean(getSession());
}
