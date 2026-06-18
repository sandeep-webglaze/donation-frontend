import Link from "next/link";
import { HeartPulse, GraduationCap, Landmark, ArrowRight } from "lucide-react";

const CAUSES = [
  {
    icon: HeartPulse,
    title: "Provide Preventive Healthcare",
    desc: "Support our mission to bring preventive healthcare, screenings and awareness to underserved communities across Mewar.",
    href: "/about-us",
    tint: "from-rose-500/15",
  },
  {
    icon: GraduationCap,
    title: "Women's Empowerment & Education",
    desc: "Open doors to world-class education and skills for women and students from low-income families in Udaipur and beyond.",
    href: "/about-us",
    tint: "from-violet-500/15",
  },
  {
    icon: Landmark,
    title: "Preserve Cultural Heritage",
    desc: "Help carry forward a living legacy of art, architecture and traditions that date back to 734 AD.",
    href: "/about-us",
    tint: "from-amber-500/15",
  },
];

export function Causes() {
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
        {CAUSES.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${c.tint} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
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
