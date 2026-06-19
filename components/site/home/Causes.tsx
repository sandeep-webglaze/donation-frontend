import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGallery } from "@/lib/api/gallery-items";
import { CAUSES } from "@/config/causes";

export async function Causes() {
  // Admin-managed images (Pages → Home → Gallery → "Our Causes"). One per card, in order.
  const images = (await getGallery("home", "causes"))
    .filter((m) => m.type === "image")
    .map((m) => m.url);

  return (
    <section id="causes" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Causes</p>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Three pillars, one timeless purpose
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every contribution advances healthcare, education and cultural preservation —
          rooted in the values of the House of Mewar.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {CAUSES.map((c, i) => {
          const Icon = c.icon;
          const img = images[i];
          return (
            <Link
              key={c.title}
              href={`/causes/${c.slug}`}
              className="group relative overflow-hidden rounded-3xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${c.tint} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
              {img ? (
                <div className="mx-auto h-44 w-44 overflow-hidden rounded-full border-4 border-background shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-14 w-14" />
                </div>
              )}
              <h3 className="mt-6 font-serif text-xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
