/**
 * Server-side API helper for SSR/ISR data fetching (public endpoints).
 *
 * Uses the native `fetch` with Next.js caching so pages are server-rendered and
 * SEO-friendly. The browser axios client (./client) is for authenticated,
 * client-side calls; this is for public, server-rendered content.
 */

/** Backend API base, e.g. http://localhost:8080/api (server-only). */
export const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080/api";

/** Public site origin, used for canonical URLs and the sitemap. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Fetch a public endpoint and return its unwrapped `data` payload.
 * Returns `null` on any failure so callers can render a graceful fallback
 * instead of crashing the page.
 */
export async function serverFetch<T>(
  path: string,
  opts: { revalidate?: number } = {}
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      // Always fetch fresh so admin changes appear immediately on the site.
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    // Backend wraps successful responses as { success, data, meta, ... }
    return (json?.data ?? json) as T;
  } catch {
    return null;
  }
}
