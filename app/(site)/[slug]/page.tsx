import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/api/cms";
import { SITE_URL } from "@/lib/api/server";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

/** Asset-like requests (e.g. firebase-messaging-sw.js, *.png) aren't CMS pages. */
const isAssetLike = (slug: string) => /\.[a-z0-9]+$/i.test(slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (isAssetLike(params.slug)) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  const page = await getPageBySlug(params.slug);
  if (!page)
    return { title: "Not found", robots: { index: false, follow: false } };

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
  if (isAssetLike(params.slug)) notFound();

  const page = await getPageBySlug(params.slug);
  if (!page) notFound();

  return (
    <>
      {page.coverImage && (
        <section className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
          <Image
            src={page.coverImage}
            alt={page.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </section>
      )}

      <article className="w-[90%] lg:w-[80%] mx-auto py-12">
        <h1 className="text-4xl font-bold mb-3">{page.title}</h1>

        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date(page.updatedAt).toLocaleDateString()}
        </p>

        <div
          className="cms-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </>
  );
}
