import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/api/cms";
import { SITE_URL } from "@/lib/api/server";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  if (!page) return { title: "Not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: page.metaTitle || page.title,
    description: page.metaDescription || undefined,
    keywords: page.metaKeywords || undefined,
    path: `/${page.slug}`,
    image: page.coverImage || undefined,
    type: "article",
  });
}

export default async function CmsPageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    url: `${SITE_URL}/${page.slug}`,
    dateModified: page.updatedAt,
    description: page.metaDescription || undefined,
  };

  return (
    <article className="container py-16 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {page.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={page.coverImage}
          alt={page.title}
          className="rounded-2xl mb-8 w-full max-h-80 object-cover"
        />
      )}
      <h1 className="text-4xl font-bold tracking-tight mb-2">{page.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: {new Date(page.updatedAt).toLocaleDateString()}
      </p>
      <div
        className="cms-content"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </article>
  );
}
