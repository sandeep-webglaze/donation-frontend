import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaShowcase } from "@/components/site/MediaShowcase";
import { HeroMediaDiagonal } from "@/components/site/HeroMediaDiagonal";
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

  const eyebrow = c?.subtitle || "Change the world together";
  const heading = c?.title || "Carrying forward a timeless legacy";
  const body =
    c?.body ||
    "The Friends of Mewar was born from the values of the House of Mewar — the world's longest-serving dynasty — advancing healthcare, women's empowerment & education, and cultural preservation.";

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#d44b55_0%,#c43c46_50%,#a32f37_100%)]">
      {/* brand glows — red base with a warm yellow accent in the corner */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -bottom-20 -right-10 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-[130px]" />
        <div className="absolute -top-32 left-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
      </div>
      <TopoLines className="absolute inset-0 h-full w-full text-white/10" />

      {/* desktop diagonal media panel (bleeds to the right edge) */}
      <HeroMediaDiagonal items={media} />

      <div className="container relative z-10 grid items-center gap-12 pt-16 pb-32 lg:grid-cols-2 lg:gap-10 lg:pt-24 lg:pb-44">
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
        {/* mobile media (desktop uses the diagonal panel above) */}
        <div className="relative lg:hidden">
          <MediaShowcase items={media} aspect="aspect-[5/4]" />
        </div>
      </div>
    </section>
  );
}
