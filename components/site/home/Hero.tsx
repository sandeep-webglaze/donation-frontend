import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayVideoButton } from "@/components/site/PlayVideoButton";
import { TopoLines } from "@/components/site/Decor";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";
import type { SiteSettings } from "@/lib/api/settings";

export async function Hero({ settings }: { settings: SiteSettings }) {
  const [media, content] = await Promise.all([
    getGallery("home", "hero"),
    getPageContent("home"),
  ]);
  const c = content.hero;
  const heroImg = media.find((g) => g.type === "image")?.url || null;
  const introVideo = media.find((g) => g.type === "video")?.url || null;

  const eyebrow = c?.subtitle || "Change the world together";
  const heading = c?.title || "Carrying forward a timeless legacy";
  const body =
    c?.body ||
    "The Friends of Mewar was born from the values of the House of Mewar — the world's longest-serving dynasty — advancing healthcare, women's empowerment & education, and cultural preservation.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
      {/* logo-color accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 right-10 h-96 w-96 rounded-full bg-secondary/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/40 blur-[120px]" />
      </div>
      <TopoLines className="absolute inset-0 h-full w-full text-white/10" />

      <div className="container grid items-center gap-12 pt-16 pb-32 lg:grid-cols-2 lg:gap-10 lg:pt-24 lg:pb-44">
        {/* Left — copy (FOM content) */}
        <div className="space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/95 px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm">
            <Heart className="h-4 w-4 fill-primary text-primary" />
            {eyebrow}
          </span>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
            {heading}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/90">{body}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 rounded-full bg-white px-8 text-base text-primary shadow-lg shadow-black/20 hover:bg-white/90"
            >
              <Link href="/donate">
                Donate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="h-12 rounded-full px-8 text-base shadow-lg shadow-black/10"
            >
              <Link href="/about-us">Explore More</Link>
            </Button>
          </div>
        </div>

        {/* Right — image + play */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -left-2 top-8 hidden h-[80%] w-3 -skew-x-12 bg-secondary lg:block"
          />
          <div
            aria-hidden
            className="absolute left-3 top-16 hidden h-[70%] w-3 -skew-x-12 bg-white/40 lg:block"
          />

          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl">
            {heroImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImg}
                alt={settings.siteName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-white/10 backdrop-blur-sm" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayVideoButton url={introVideo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
