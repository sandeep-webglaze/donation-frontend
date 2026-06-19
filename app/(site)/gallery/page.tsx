import { Camera } from "lucide-react";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";
import { GalleryExplorer } from "@/components/site/GalleryExplorer";
import { GALLERY_CATEGORIES } from "@/config/pages";
import { buildMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  buildMetadata({ pageKey: "gallery", title: "Gallery", path: "/gallery" });

export default async function GalleryPage() {
  const [items, content] = await Promise.all([
    getGallery("gallery"),
    getPageContent("gallery"),
  ]);
  const intro = content.intro;

  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Work</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          {intro?.title || "Gallery & Media"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {intro?.subtitle ||
            "Moments from our work across healthcare, education and cultural preservation in Mewar. Browse by category — tap any photo or video to view."}
        </p>
      </div>

      <div className="mt-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-muted-foreground">
            <Camera className="mb-3 h-10 w-10" />
            <p>Photos &amp; videos coming soon.</p>
          </div>
        ) : (
          <GalleryExplorer items={items} categories={GALLERY_CATEGORIES} />
        )}
      </div>
    </section>
  );
}
