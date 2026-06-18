import Link from "next/link";
import { Gift, CalendarHeart, Award, ArrowRight } from "lucide-react";

const WAYS = [
  {
    icon: Gift,
    title: "One-time Gift",
    desc: "Make an immediate impact with a single contribution — every rupee goes toward our causes.",
  },
  {
    icon: CalendarHeart,
    title: "Monthly Giving",
    desc: "Become a sustaining friend of Mewar. Recurring support helps us plan for lasting change.",
  },
  {
    icon: Award,
    title: "Honor a Loved One",
    desc: "Dedicate your gift in memory or celebration of someone special, and carry their legacy forward.",
  },
];

export function WaysToGive() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Ways to Give</p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Choose how you&apos;d like to help
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WAYS.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.title} className="group rounded-3xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                <Link href="/donate" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Give now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
