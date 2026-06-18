import Link from "next/link";
import { Heart, Target, Eye, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/lib/api/settings";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { buildMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  buildMetadata({ pageKey: "about", title: "About Us", path: "/about-us" });

export default async function AboutPage() {
  const [settings, media, content, founderMedia] = await Promise.all([
    getSettings(),
    getGallery("about", "gallery"),
    getPageContent("about"),
    getGallery("about", "founder"),
  ]);
  const founderImg =
    founderMedia.find((m) => m.type === "image")?.url ||
    media.find((m) => m.type === "image")?.url ||
    null;

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-center text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:26px_26px]" />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
          <Heart className="h-4 w-4 text-secondary" /> Our Story
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">About Us</h1>
        <p className="mx-auto mt-5 max-w-3xl px-4 text-lg text-white/90">
          The Friends of Mewar was born from the values of the House of Mewar — the
          world&apos;s longest-serving dynasty — and carries forward this legacy through
          philanthropy, community empowerment, and cultural preservation.
        </p>
      </section>

      {/* Who we are */}
      <section className="container py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-5 text-muted-foreground">
          <h2 className="text-3xl font-bold tracking-tight">Who We Are</h2>
          <p>
            With a strong, unwavering desire to support children in need, help people
            take charge of their health, and care for the longest-serving, unbroken
            custodianship of the world — Padmaja Kumari Parmar, the daughter of the
            House of Mewar, started The Friends of Mewar.
          </p>
          <p>
            A nonprofit founded for those who cannot and should not be left helpless,
            The Friends of Mewar is a philanthropic community of friends passionate
            about bringing change and transforming the world.
          </p>
          <p>
            It breaks our hearts to know that nearly half of India&apos;s children are
            deprived of an education, while 1 in every 3 people runs a risk of premature
            death by non-communicable diseases that could have been prevented. We
            can&apos;t just sit around and do nothing about it.
          </p>
          <p>
            If we come together as a community that collectively and honestly works
            towards a better world, we will start living in one. The Friends of Mewar is
            for all those who see the world as one and look at life as an opportunity to
            bring a smile, help people, and live to inspire.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="border-y bg-muted/30">
        <div className="container grid gap-8 py-16 md:grid-cols-2 md:py-20">
          <div className="rounded-3xl border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">{content.mission?.title || "Our Mission"}</h3>
            <p className="mt-3 text-muted-foreground">
              {content.mission?.body ||
                "The most effective way to improve the quality of life of under-served sections of society is to provide educational opportunities and preventive healthcare, while strengthening and preserving the rich culture that is part of their proud heritage. Our mission is to bring together a community to support projects across these three causes."}
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/30 text-foreground">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">{content.vision?.title || "Our Vision"}</h3>
            <p className="mt-3 text-muted-foreground">
              {content.vision?.body ||
                "An India where children find easy access to quality education, where no one suffers because of a lack of preventive measures and timely treatments, and where our world-famous cultural heritage lives to inspire generations to come."}
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="container py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
          <div className="mx-auto w-full max-w-xs">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border bg-muted shadow-lg">
              {founderImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={founderImg} alt="Founder" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <Heart className="h-12 w-12" />
                </div>
              )}
            </div>
            <p className="mt-4 text-center font-semibold text-primary">Padmaja Kumari Parmar</p>
            <p className="text-center text-sm text-muted-foreground">Founder</p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Meet our Founder</h2>
            <p>
              Padmaja Kumari Parmar (née Mewar), daughter of the House of Mewar,
              represents the world&apos;s oldest serving dynasty, founded in 734 AD in
              Udaipur, Rajasthan. Inspired by her grandfather&apos;s establishment of the
              Maharana of Mewar Charitable Foundation in 1969, her work spans philanthropy,
              hospitality and health. In 2013, she founded The Friends of Mewar.
            </p>
            <p>
              A seasoned hospitality executive and a Global Ambassador for Breakthrough
              T1D, Padmaja educates and inspires individuals and communities toward
              positive change — championing impactful initiatives locally and on global
              platforms.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {["Preventive Healthcare", "Women's Empowerment & Education", "Cultural Heritage", "80G-eligible donations"].map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About gallery */}
      {media.length > 0 && (
        <section className="border-t bg-muted/30">
          <div className="container py-16 md:py-20">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Moments &amp; Memories</h2>
            <GalleryGrid items={media} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Be a friend of Mewar</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Your support powers {settings.siteName}. Join us in making a lasting difference.
        </p>
        <Button size="lg" asChild className="mt-6 rounded-full px-8">
          <Link href="/donate">Donate Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>
    </>
  );
}
