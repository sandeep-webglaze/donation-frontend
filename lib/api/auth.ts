import { apiClient } from "./client";

const TOKEN_KEY = "auth_token";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

/** Log in with email + password. Stores the JWT for subsequent admin calls. */
export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await apiClient.post("/auth/login", { email, password });
  const payload = res.data?.data; // { access_token, user, message }
  if (payload?.access_token && typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, payload.access_token);
  }
  return payload?.user;
}

export function logout(): void {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
