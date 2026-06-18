import type { Metadata } from "next";
import { getSettings } from "@/lib/api/settings";
import { getPageSeo } from "@/lib/api/seo-meta";
import { SITE_URL } from "@/lib/api/server";

export interface SeoInput {
  /**
   * Admin-managed SEO key for a coded page (e.g. "home", "about", "contact").
   * When set, meta is pulled from the admin SEO Manager so it can be changed
   * later without touching code.
   */
  pageKey?: string;
  /** Page title (without site name — appended via the template). */
  title?: string;
  description?: string;
  keywords?: string | string[];
  /** Path for the canonical URL, e.g. "/about". Defaults to home. */
  path?: string;
  /** OG/Twitter image URL. */
  image?: string;
  type?: "website" | "article";
  /** Force private pages (profile/dashboard) out of the index. */
  noIndex?: boolean;
}

function firstString(...vals: (string | null | undefined)[]): string | undefined {
  for (const v of vals) if (v) return v;
  return undefined;
}

/**
 * Build complete, consistent SEO metadata for ANY page in 1 line.
 *
 * Precedence (highest → lowest):
 *   1. Values passed in code (`input`)
 *   2. Admin-managed page SEO (`pageKey` → SEO Manager)
 *   3. Global site defaults (Settings API)
 *
 * Usage:
 *   export const generateMetadata = () =>
 *     buildMetadata({ pageKey: "about", path: "/about" });
 */
export async function buildMetadata(input: SeoInput = {}): Promise<Metadata> {
  const [s, pageSeo] = await Promise.all([
    getSettings(),
    input.pageKey ? getPageSeo(input.pageKey) : Promise.resolve(null),
  ]);

  const siteName = s.siteName || "Our Foundation";

  const title = firstString(input.title, pageSeo?.metaTitle, s.metaTitle, siteName)!;
  const description = firstString(
    input.description,
    pageSeo?.metaDescription,
    s.metaDescription,
    `${siteName} — make an impact.`
  )!;

  const rawKeywords = Array.isArray(input.keywords)
    ? input.keywords.join(",")
    : firstString(input.keywords, pageSeo?.metaKeywords, s.metaKeywords) || "";
  const keywords = rawKeywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const image = firstString(input.image, pageSeo?.ogImage, s.ogImage);
  const url = firstString(
    pageSeo?.canonicalUrl,
    input.path ? `${SITE_URL}${input.path}` : undefined,
    s.canonicalUrl,
    SITE_URL
  )!;
  const noIndex = input.noIndex || pageSeo?.noIndex || false;

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: firstString(pageSeo?.ogTitle, title)!,
      description: firstString(pageSeo?.ogDescription, description)!,
      url,
      siteName,
      type: input.type || "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: firstString(pageSeo?.ogTitle, title)!,
      description: firstString(pageSeo?.ogDescription, description)!,
      images: image ? [image] : undefined,
    },
  };
}
