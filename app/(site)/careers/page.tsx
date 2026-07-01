import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ArrowRight, Mail } from "lucide-react";
import { getSettings } from "@/lib/api/settings";
import { getPageContent } from "@/lib/api/content";
import { getGallery } from "@/lib/api/gallery-items";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

// SEO — admin "Pages → Careers → SEO" se override hota hai, warna ye default.
export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageKey: "careers", title: "Careers", path: "/careers" });
}

export default async function CareersPage() {
  // Content + image admin se aata hai (pageKey = "careers").
  const [settings, content, media] = await Promise.all([
    getSettings(),
    getPageContent("careers"),
    getGallery("careers", "hero"),
  ]);

  const hero = content.hero;
  const intro = content.intro;
  const positions = content.positions;
  const heroImg = media.find((m) => m.type === "image")?.url || null;

  // "Open Positions" — admin Body me har line ek role.
  const roles = (positions?.body || "")
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  return (
    <>
      {/* Hero band */}
      <section className="relative flex min-h-[260px] items-center justify-center overflow-hidden md:min-h-[360px]">
        {heroImg ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#6d1f26,#a32f37,#d44b55)]" />
        )}
        <div className="relative z-10 px-4 text-center text-white">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Briefcase className="h-6 w-6" />
          </span>
          <h1 className="font-serif text-3xl font-bold md:text-5xl">{hero?.title || "Careers"}</h1>
          {hero?.subtitle && <p className="mx-auto mt-3 max-w-xl text-white/90">{hero.subtitle}</p>}
        </div>
      </section>

      {/* Intro */}
      <section className="container max-w-3xl py-14 md:py-16">
        <h2 className="font-serif text-2xl font-bold md:text-3xl">{intro?.title || "Work with us"}</h2>
        <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
          {intro?.body ||
            "Join The Friends of Mewar and help advance healthcare, education and cultural preservation across Mewar."}
        </p>
      </section>

      {/* Open positions */}
      <section className="container max-w-3xl pb-16">
        <h2 className="font-serif text-2xl font-bold md:text-3xl">{positions?.title || "Open positions"}</h2>
        {roles.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {roles.map((role) => (
              <li key={role} className="flex items-center justify-between rounded-xl border bg-card p-4">
                <span className="font-medium">{role}</span>
                {settings.email && (
                  <Button asChild size="sm" variant="outline">
                    <Link href={`mailto:${settings.email}?subject=Application: ${encodeURIComponent(role)}`}>
                      Apply <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-muted-foreground">No open positions right now — check back soon.</p>
        )}

        {settings.email && (
          <div className="mt-10 rounded-2xl border bg-muted/30 p-6 text-center">
            <p className="text-muted-foreground">Don’t see a fit? Send us your resume.</p>
            <Button asChild className="mt-3 rounded-full">
              <Link href={`mailto:${settings.email}?subject=Career enquiry`}>
                <Mail className="mr-2 h-4 w-4" /> Email us
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
