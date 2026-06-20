import Link from "next/link";
import { Heart, ChevronsRight } from "lucide-react";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";

// Impact indicators (edit labels/percent here).
const BARS = [
  { label: "Preventive care", pct: 90 },
  { label: "Community reach", pct: 80 },
];

export async function FeaturedCampaign() {
  const [media, content] = await Promise.all([
    getGallery("home", "campaign"),
    getPageContent("home"),
  ]);
  const imgs = media.filter((m) => m.type === "image").map((m) => m.url);
  const left = imgs[0] || null;
  const right = imgs[1] || imgs[0] || null;

  const c = content.campaign;
  const title = c?.title || "Rural Health Camps 2026";
  const body =
    c?.body ||
    "Help us run preventive health camps, diabetes screenings and maternal care across villages in Mewar — bringing quality care to those who need it most.";

  return (
    <section className="relative overflow-hidden bg-[#f6f1e7] py-16 md:py-20">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(18,47,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,47,42,0.05)_1px,transparent_1px)] [background-size:34px_34px]"
      />

      <div className="container relative grid items-center gap-10 lg:grid-cols-[minmax(0,380px)_1fr_minmax(0,340px)]">
        {/* Left — tilted image with accent block */}
        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute -inset-2 rotate-3 rounded-3xl bg-secondary shadow-lg" />
          <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-3xl border-4 border-background shadow-xl">
            {left ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={left} alt={title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                <Heart className="h-14 w-14" />
              </div>
            )}
          </div>
        </div>

        {/* Middle — copy + bars + CTA */}
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
            <Heart className="h-4 w-4 fill-primary" /> Featured Campaign <Heart className="h-4 w-4 fill-primary" />
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">{body}</p>

          {/* Progress bars */}
          <div className="mt-7 grid max-w-xl gap-5 sm:grid-cols-2">
            {BARS.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm font-semibold">
                  <span className="text-foreground">{b.label}</span>
                  <span className="text-primary">{b.pct}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/donate"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-2.5 pr-6 font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ChevronsRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            Explore More
          </Link>
        </div>

        {/* Right — dashed circular image */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block">
          <div aria-hidden className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50" />
          <div className="absolute inset-4 overflow-hidden rounded-full shadow-xl">
            {right ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={right} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-secondary/20 text-primary">
                <Heart className="h-14 w-14" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
