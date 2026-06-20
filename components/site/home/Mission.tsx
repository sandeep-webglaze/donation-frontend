import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { TopoLines } from "@/components/site/Decor";
import type { SiteSettings } from "@/lib/api/settings";

const POINTS = [
  "Rooted in 1,290+ years of unbroken heritage",
  "Transparent, community-first philanthropy",
  "Healthcare, education & cultural preservation",
  "80G-eligible donations for Indian taxpayers",
];

export function Mission({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="relative overflow-hidden border-y bg-muted/30">
      <TopoLines className="absolute inset-0 h-full w-full text-foreground/[0.035]" />
      <div className="container relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-gradient-to-br from-amber-400/15 via-primary/10 to-background shadow-xl">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.2),transparent_55%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className="h-24 w-24 text-amber-500/70" />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl border bg-background px-6 py-4 shadow-lg">
            <div className="font-serif text-3xl font-bold text-primary">734 AD</div>
            <div className="text-xs text-muted-foreground">A legacy that endures</div>
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Mission</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Carrying a timeless legacy into tomorrow
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {settings.metaDescription ||
              `${settings.siteName} was born from the values of the House of Mewar — the world's longest-serving dynasty. We channel that spirit into philanthropy, community empowerment and the preservation of culture, so that tradition continues to inspire generations to come.`}
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-2">
            <Link href="/about-us">Learn more about us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
