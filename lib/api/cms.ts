import { serverFetch } from "./server";

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface CmsPageSummary {
  slug: string;
  title: string;
  updatedAt: string;
}

/** Fetch a single PUBLISHED page by slug (server-side). null if missing. */
export function getPageBySlug(slug: string): Promise<CmsPage | null> {
  return serverFetch<CmsPage>(`/cms/pages/slug/${slug}`, { revalidate: 60 });
}

/** List all PUBLISHED pages (for footer quick links + sitemap). */
export async function getPublishedPages(): Promise<CmsPageSummary[]> {
  const data = await serverFetch<CmsPageSummary[]>("/cms/pages/public", {
    revalidate: 60,
  });
  return data ?? [];
}
