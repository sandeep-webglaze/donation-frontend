import Link from "next/link";
import { Gift, CalendarHeart, Award, HeartHandshake, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WAYS = [
  { icon: Gift, title: "One-time Gift", desc: "Make an immediate impact with a single contribution — every rupee goes toward our causes." },
  { icon: CalendarHeart, title: "Monthly Giving", desc: "Become a sustaining friend of Mewar. Recurring support helps us plan for lasting change." },
  { icon: Award, title: "Honor a Loved One", desc: "Dedicate your gift in memory or celebration of someone special, and carry their legacy forward." },
  { icon: HeartHandshake, title: "Volunteer With Us", desc: "Give your time and skills — join camps, drives and events on the ground across Mewar." },
];

export function WaysToGive() {
  return (
    <section className="bg-white">
      <div className="container py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
            <span className="text-primary">♥</span> Ways to Give <span className="text-primary">♥</span>
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-5xl">
            Make a difference
          </h2>
        </div>

        {/* Dotted connector (desktop) */}
        <div className="relative mx-auto mt-12 hidden max-w-6xl lg:block">
          <div className="absolute left-8 right-8 top-1/2 border-t-2 border-dashed border-primary/30" />
          <div className="relative grid grid-cols-4">
            {WAYS.map((_, i) => (
              <div key={i} className="flex justify-center">
                <span className={cn("h-4 w-4 rounded-full ring-4 ring-white", i % 2 === 0 ? "bg-primary" : "bg-secondary")} />
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS.map((w, i) => {
            const Icon = w.icon;
            const featured = i === 1 || i === 2;
            return (
              <div key={w.title} className="relative">
                {featured && (
                  <div aria-hidden className="absolute -inset-1.5 rotate-3 rounded-[1.75rem] bg-secondary shadow-lg" />
                )}
                <div
                  className={cn(
                    "relative flex flex-col items-center rounded-[1.5rem] p-8 text-center transition-transform hover:-translate-y-1",
                    featured ? "bg-[#6d1f26] text-white shadow-2xl" : "border bg-card shadow-sm"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full",
                      featured ? "bg-secondary text-[#122f2a]" : "border-2 border-primary/40 text-primary"
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className={cn("mt-5 font-serif text-lg font-bold", featured ? "text-white" : "")}>{w.title}</h3>
                  <p className={cn("mt-3 text-sm leading-relaxed", featured ? "text-white/80" : "text-muted-foreground")}>
                    {w.desc}
                  </p>
                  <Link
                    href="/donate"
                    className={cn(
                      "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold",
                      featured ? "text-secondary" : "text-primary"
                    )}
                  >
                    Give now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
