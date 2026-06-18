import { serverFetch } from "./server";

/** Admin-managed SEO for a coded page (home, about, contact, ...). */
export interface PageSeo {
  pageKey: string;
  label: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
}

/** Fetch admin-managed SEO for a page key (server-side). null if not set. */
export function getPageSeo(pageKey: string): Promise<PageSeo | null> {
  return serverFetch<PageSeo>(`/seo/${pageKey}`, { revalidate: 60 });
}
