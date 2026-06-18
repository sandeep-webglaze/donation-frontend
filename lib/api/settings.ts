import { serverFetch } from "./server";

/** Website settings as returned by the backend Settings API. */
export interface SiteSettings {
  id: string;
  siteName: string;
  logo: string | null;
  favicon: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  copyrightText: string | null;
}

/** Sensible fallbacks so the UI never renders blank if the API is unreachable. */
export const SETTINGS_FALLBACK: SiteSettings = {
  id: "",
  siteName: "Our Foundation",
  logo: null,
  favicon: null,
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  facebook: null,
  instagram: null,
  linkedin: null,
  twitter: null,
  metaTitle: null,
  metaDescription: null,
  metaKeywords: null,
  ogImage: null,
  canonicalUrl: null,
  copyrightText: null,
};

/** Fetch website settings (server-side). Falls back to defaults on failure. */
export async function getSettings(): Promise<SiteSettings> {
  const data = await serverFetch<SiteSettings>("/settings", { revalidate: 60 });
  return data ?? SETTINGS_FALLBACK;
}
