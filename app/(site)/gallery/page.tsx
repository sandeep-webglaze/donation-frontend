import { Camera } from "lucide-react";
import { getGallery } from "@/lib/api/gallery-items";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { buildMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  buildMetadata({ pageKey: "gallery", title: "Gallery", path: "/gallery" });

export default async function GalleryPage() {
  const items = await getGallery("home", "gallery");

  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Work</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Gallery</h1>
        <p className="mt-4 text-muted-foreground">
          Moments from our work across healthcare, education and cultural preservation in Mewar.
          Tap any photo or video to view.
        </p>
      </div>

      <div className="mt-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-muted-foreground">
            <Camera className="mb-3 h-10 w-10" />
            <p>Photos &amp; videos coming soon.</p>
          </div>
        ) : (
          <GalleryGrid items={items} />
        )}
      </div>
    </section>
  );
}
