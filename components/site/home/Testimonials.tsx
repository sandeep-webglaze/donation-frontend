import { Quote } from "lucide-react";

const ITEMS = [
  {
    quote:
      "The health camp reached our village when we had nowhere else to turn. My mother received care she could never have afforded.",
    name: "A beneficiary",
    role: "Udaipur district",
    initials: "BM",
  },
  {
    quote:
      "Giving monthly to Friends of Mewar is the most meaningful thing I do. I can see exactly where my contribution goes.",
    name: "Monthly donor",
    role: "Supporter since 2024",
    initials: "MD",
  },
  {
    quote:
      "Volunteering on the education drives showed me how tradition and progress can move forward together.",
    name: "A volunteer",
    role: "Education program",
    initials: "VL",
  },
];

export function Testimonials() {
  return (
    <section className="container py-20 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Voices of Mewar</p>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          The people behind every gift
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {ITEMS.map((t) => (
          <figure key={t.initials} className="flex flex-col rounded-3xl border bg-card p-8 shadow-sm">
            <Quote className="h-8 w-8 text-amber-500/60" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
