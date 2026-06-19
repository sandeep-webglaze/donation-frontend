import Link from "next/link";
import { Heart, HeartHandshake, Landmark, Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayVideoButton } from "@/components/site/PlayVideoButton";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";
import type { SiteSettings } from "@/lib/api/settings";

const FEATURES = [
  { icon: HeartHandshake, title: "Healthcare & Education", desc: "Preventive care and quality learning for the under-served." },
  { icon: Landmark, title: "Heritage Preservation", desc: "Carrying forward a 1,300-year-old living legacy." },
];

export async function AboutPreview({ settings }: { settings: SiteSettings }) {
  const [media, content] = await Promise.all([
    getGallery("home", "about"),
    getPageContent("home"),
  ]);
  const c = content.about;
  const img = media.find((m) => m.type === "image")?.url || null;
  const video = media.find((m) => m.type === "video")?.url || null;

  const heading = c?.title || "A timeless legacy of compassion & care";
  const body =
    c?.body ||
    "The Friends of Mewar carries forward the values of the House of Mewar — supporting children in need, advancing preventive healthcare, empowering women through education, and preserving a centuries-old cultural heritage.";

  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left — image with ribbon + video */}
        <div className="relative">
          <div className="relative aspect-[5/4] w-full max-w-lg overflow-hidden rounded-[2rem] border bg-muted shadow-xl">
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={settings.siteName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                <Heart className="h-14 w-14" />
              </div>
            )}
          </div>

          {/* vertical ribbon */}
          <div className="absolute left-4 top-10 hidden rounded-md bg-primary px-3 py-5 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg [writing-mode:vertical-rl] sm:block">
            Get Inspired · Donate · Help
          </div>

          {/* overlapping video card */}
          <div className="absolute -bottom-6 right-2 hidden h-36 w-52 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-secondary/30 shadow-2xl sm:flex">
            <PlayVideoButton url={video} />
          </div>
        </div>

        {/* Right — copy */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
            <Heart className="h-4 w-4 fill-primary" /> About Us
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-xl text-muted-foreground">{body}</p>

          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Button size="lg" asChild className="rounded-full px-8">
              <Link href="/about-us">
                Read Full <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Call Any Time</span>
                  <span className="block font-bold">{settings.phone}</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
