import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  settingsAdminApi,
  seoAdminApi,
  cmsAdminApi,
  usersAdminApi,
  galleryAdminApi,
  contentAdminApi,
  type AdminUser,
} from "@/lib/api/admin";
import type { GalleryItem } from "@/lib/api/gallery-items";
import type { ContentBlock } from "@/lib/api/content";
import type { SiteSettings } from "@/lib/api/settings";
import type { CmsPage } from "@/lib/api/cms";
import type { PageSeo } from "@/lib/api/seo-meta";

const err = (e: any) => toast.error(e?.message || "Something went wrong");

// ─── Settings ────────────────────────────────────────────────────────────────
export function useSiteSettings() {
  return useQuery({ queryKey: ["settings"], queryFn: settingsAdminApi.get });
}
export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SiteSettings>) => settingsAdminApi.update(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings saved");
    },
    onError: err,
  });
}

// ─── SEO Manager ─────────────────────────────────────────────────────────────
export function useSeoList() {
  return useQuery({ queryKey: ["seo"], queryFn: seoAdminApi.list });
}
export function useUpsertSeo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ key, data }: { key: string; data: Partial<PageSeo> }) =>
      seoAdminApi.upsert(key, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seo"] });
      toast.success("SEO saved");
    },
    onError: err,
  });
}

// ─── CMS Pages ───────────────────────────────────────────────────────────────
export function useCmsPages() {
  return useQuery({ queryKey: ["cms"], queryFn: cmsAdminApi.list });
}
export function useCmsPage(id: string) {
  return useQuery({
    queryKey: ["cms", id],
    queryFn: () => cmsAdminApi.get(id),
    enabled: !!id && id !== "new",
  });
}
export function useCreateCmsPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CmsPage>) => cmsAdminApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      toast.success("Page created");
    },
    onError: err,
  });
}
export function useUpdateCmsPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CmsPage> }) =>
      cmsAdminApi.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      qc.invalidateQueries({ queryKey: ["cms", id] });
      toast.success("Page saved");
    },
    onError: err,
  });
}
export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, publish }: { id: string; publish: boolean }) =>
      publish ? cmsAdminApi.publish(id) : cmsAdminApi.unpublish(id),
    onSuccess: (_, { publish }) => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      toast.success(publish ? "Published" : "Unpublished");
    },
    onError: err,
  });
}
export function useDeleteCmsPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cmsAdminApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      toast.success("Page deleted");
    },
    onError: err,
  });
}

// ─── Users ───────────────────────────────────────────────────────────────────
export function useUsersList() {
  return useQuery({ queryKey: ["users"], queryFn: usersAdminApi.list });
}
export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminUser> }) =>
      usersAdminApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
    },
    onError: err,
  });
}
export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersAdminApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted");
    },
    onError: err,
  });
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
export function useGalleryList() {
  return useQuery({ queryKey: ["gallery"], queryFn: galleryAdminApi.list });
}
export function useAddGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<GalleryItem>) => galleryAdminApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Added to gallery");
    },
    onError: err,
  });
}
export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => galleryAdminApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Removed");
    },
    onError: err,
  });
}
/** Media for one page+section. */
export function useSectionMedia(pageKey: string, section: string) {
  return useQuery({
    queryKey: ["gallery", pageKey, section],
    queryFn: () => galleryAdminApi.listFor(pageKey, section),
  });
}

// ─── Content blocks ──────────────────────────────────────────────────────────
export function useContentList() {
  return useQuery({ queryKey: ["content"], queryFn: contentAdminApi.list });
}
export function useUpsertContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ pageKey, sectionKey, data }: { pageKey: string; sectionKey: string; data: Partial<ContentBlock> }) =>
      contentAdminApi.upsert(pageKey, sectionKey, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["content"] });
      toast.success("Content saved");
    },
    onError: err,
  });
}
