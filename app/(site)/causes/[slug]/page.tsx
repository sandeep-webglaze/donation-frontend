import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import { CAUSES, getCause } from "@/config/causes";
import { getPageContent } from "@/lib/api/content";
import { getGallery } from "@/lib/api/gallery-items";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return CAUSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cause = getCause(params.slug);
  if (!cause) return { title: "Not found", robots: { index: false, follow: false } };
  return buildMetadata({ pageKey: cause.slug, title: cause.title, path: `/causes/${cause.slug}` });
}

export default async function CausePage({ params }: Props) {
  const cause = getCause(params.slug);
  if (!cause) notFound();

  const [content, heroMedia, projects] = await Promise.all([
    getPageContent(cause.slug),
    getGallery(cause.slug, "hero"),
    getGallery(cause.slug, "projects"),
  ]);

  const hero = content.hero;
  const intro = content.intro;
  const heroImg = heroMedia.find((m) => m.type === "image")?.url;
  const title = hero?.title || cause.title;
  const Icon = cause.icon;

  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden md:min-h-[440px]">
        {heroImg ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${cause.tint} via-primary/30 to-secondary/30`} />
        )}
        <div className="relative z-10 px-4 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
            <Icon className="h-7 w-7" />
          </span>
          <h1 className={`font-serif text-3xl font-bold tracking-tight md:text-5xl ${heroImg ? "text-white" : ""}`}>
            {title}
          </h1>
          {hero?.subtitle && (
            <p className={`mx-auto mt-3 max-w-2xl ${heroImg ? "text-white/90" : "text-muted-foreground"}`}>
              {hero.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Intro */}
      <section className="container max-w-3xl py-14 md:py-20">
        <Link href="/#causes" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> All causes
        </Link>
        <h2 className="font-serif text-2xl font-bold md:text-3xl">{intro?.title || "Our work"}</h2>
        <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-muted-foreground">
          {intro?.body || cause.blurb}
        </p>

        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link href="/donate"><Heart className="mr-2 h-4 w-4" /> Support this cause</Link>
          </Button>
        </div>
      </section>

      {/* Projects & stories */}
      {projects.length > 0 && (
        <section className="container pb-20 md:pb-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">In action</p>
            <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">Projects &amp; stories</h2>
          </div>
          <div className="mt-10">
            <GalleryGrid items={projects} />
          </div>
        </section>
      )}
    </>
  );
}
