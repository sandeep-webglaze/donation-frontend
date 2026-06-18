import { serverFetch } from "./server";

export interface ContentBlock {
  pageKey: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  settings: Record<string, unknown> | null;
}

export type PageContent = Record<string, ContentBlock>;

/**
 * Fetch all editable content blocks for a page, keyed by sectionKey.
 * Coded pages read this and fall back to their default copy when empty.
 *   const c = await getPageContent("home");  c.hero?.title ?? "Default"
 */
export async function getPageContent(pageKey: string): Promise<PageContent> {
  const arr = (await serverFetch<ContentBlock[]>(`/content/${pageKey}`, {})) ?? [];
  const map: PageContent = {};
  for (const b of arr) map[b.sectionKey] = b;
  return map;
}
