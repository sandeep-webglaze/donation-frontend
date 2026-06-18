import { apiClient } from "./client";
import type { SiteSettings } from "./settings";
import type { CmsPage } from "./cms";
import type { PageSeo } from "./seo-meta";
import type { GalleryItem } from "./gallery-items";
import type { ContentBlock } from "./content";

/** Backend wraps responses as { success, data, ... }; unwrap to the payload. */
function unwrap<T>(res: { data: { data: T } }): T {
  return res.data.data;
}

// ─── Settings ────────────────────────────────────────────────────────────────
export const settingsAdminApi = {
  get: async (): Promise<SiteSettings> => unwrap(await apiClient.get("/settings")),
  update: async (payload: Partial<SiteSettings>): Promise<SiteSettings> =>
    unwrap(await apiClient.patch("/settings", payload)),
};

// ─── SEO Manager ─────────────────────────────────────────────────────────────
export const seoAdminApi = {
  list: async (): Promise<PageSeo[]> => unwrap(await apiClient.get("/seo")),
  get: async (key: string): Promise<PageSeo | null> =>
    unwrap(await apiClient.get(`/seo/${key}`)),
  upsert: async (key: string, payload: Partial<PageSeo>): Promise<PageSeo> =>
    unwrap(await apiClient.put(`/seo/${key}`, payload)),
};

// ─── CMS Pages ───────────────────────────────────────────────────────────────
export const cmsAdminApi = {
  list: async (): Promise<CmsPage[]> =>
    unwrap(await apiClient.get("/cms/pages?limit=100")),
  get: async (id: string): Promise<CmsPage> =>
    unwrap(await apiClient.get(`/cms/pages/${id}`)),
  create: async (payload: Partial<CmsPage>): Promise<CmsPage> =>
    unwrap(await apiClient.post("/cms/pages", payload)),
  update: async (id: string, payload: Partial<CmsPage>): Promise<CmsPage> =>
    unwrap(await apiClient.patch(`/cms/pages/${id}`, payload)),
  publish: async (id: string): Promise<CmsPage> =>
    unwrap(await apiClient.patch(`/cms/pages/${id}/publish`)),
  unpublish: async (id: string): Promise<CmsPage> =>
    unwrap(await apiClient.patch(`/cms/pages/${id}/unpublish`)),
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/cms/pages/${id}`);
  },
};

// ─── Users ───────────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string; // "user" | "admin" | "super_admin"
  phone?: string | null;
  isActive: boolean;
  createdAt: string;
}

export const usersAdminApi = {
  list: async (): Promise<AdminUser[]> =>
    unwrap(await apiClient.get("/users?limit=100")),
  update: async (id: string, data: Partial<AdminUser>): Promise<AdminUser> =>
    unwrap(await apiClient.patch(`/users/${id}`, data)),
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

// ─── Gallery ─────────────────────────────────────────────────────────────────
export const galleryAdminApi = {
  list: async (): Promise<GalleryItem[]> => unwrap(await apiClient.get("/gallery")),
  listFor: async (pageKey: string, section: string): Promise<GalleryItem[]> =>
    unwrap(await apiClient.get(`/gallery?pageKey=${pageKey}&section=${section}`)),
  create: async (data: Partial<GalleryItem>): Promise<GalleryItem> =>
    unwrap(await apiClient.post("/gallery", data)),
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/gallery/${id}`);
  },
};

// ─── Content blocks ──────────────────────────────────────────────────────────
export const contentAdminApi = {
  list: async (): Promise<ContentBlock[]> => unwrap(await apiClient.get("/content")),
  upsert: async (
    pageKey: string,
    sectionKey: string,
    data: Partial<ContentBlock>
  ): Promise<ContentBlock> =>
    unwrap(await apiClient.put(`/content/${pageKey}/${sectionKey}`, data)),
};
