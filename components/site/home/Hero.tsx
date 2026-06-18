import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Landmark, HeartPulse, GraduationCap, ShieldCheck } from "lucide-react";
import type { SiteSettings } from "@/lib/api/settings";

export function Hero({ settings }: { settings: SiteSettings }) {
  const description =
    settings.metaDescription ||
    "Born from the values of the House of Mewar — the world's longest-serving dynasty — we carry forward a legacy of philanthropy, community empowerment and cultural preservation.";

  return (
    <section className="relative overflow-hidden border-b">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[130px]" />
        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-amber-400/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.6)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
      </div>

      <div className="container grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
        {/* Copy */}
        <div className="space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            <Crown className="h-3.5 w-3.5 text-amber-500" />
            House of Mewar · Since 734 AD
          </span>

          <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {settings.siteName}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="h-12 px-8 text-base shadow-lg shadow-primary/25">
              <Link href="/donate">
                Donate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
              <Link href="/about-us">Our Story</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> 80G tax benefits</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Secure payments</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> 100% transparency</span>
          </div>
        </div>

        {/* Decorative emblem panel */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border bg-gradient-to-br from-primary/15 via-amber-400/10 to-background shadow-2xl shadow-primary/10">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.25),transparent_60%)]" />
            {settings.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logo} alt={settings.siteName} className="absolute inset-0 m-auto h-1/2 w-1/2 object-contain" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-amber-400/40 bg-background/70 text-primary shadow-xl backdrop-blur">
                  <Landmark className="h-14 w-14" />
                </div>
              </div>
            )}
          </div>

          {/* Floating cause badges */}
          <FloatBadge className="-left-4 top-8" icon={<HeartPulse className="h-4 w-4" />} label="Healthcare" />
          <FloatBadge className="-right-4 top-1/3" icon={<GraduationCap className="h-4 w-4" />} label="Education" />
          <FloatBadge className="bottom-6 left-1/4" icon={<Landmark className="h-4 w-4" />} label="Heritage" />
        </div>
      </div>
    </section>
  );
}

function FloatBadge({ className, icon, label }: { className: string; icon: React.ReactNode; label: string }) {
  return (
    <div className={`absolute ${className} flex items-center gap-2 rounded-xl border bg-background/90 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur`}>
      <span className="text-primary">{icon}</span> {label}
    </div>
  );
}
