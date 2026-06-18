import { serverFetch } from "./server";

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  pageKey: string;
  section: string;
  url: string;
  thumbnail: string | null;
  caption: string | null;
  sortOrder: number;
  createdAt: string;
}

/** Public — fetch gallery items, optionally scoped to a page + section. */
export async function getGallery(
  pageKey?: string,
  section?: string
): Promise<GalleryItem[]> {
  const params = new URLSearchParams();
  if (pageKey) params.set("pageKey", pageKey);
  if (section) params.set("section", section);
  const q = params.toString() ? `?${params.toString()}` : "";
  return (await serverFetch<GalleryItem[]>(`/gallery${q}`, {})) ?? [];
}
