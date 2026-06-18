import type { MetadataRoute } from "next";
import { getPublishedPages } from "@/lib/api/cms";
import { SITE_URL } from "@/lib/api/server";

/** Dynamic XML sitemap: static routes + every published CMS page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPages();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/donate`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const cmsRoutes: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...cmsRoutes];
}
