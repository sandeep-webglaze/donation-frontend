import { HeartPulse, GraduationCap, Landmark, Users, Sparkles, Camera } from "lucide-react";

const TILES = [
  { icon: HeartPulse, label: "Health Camps", grad: "from-rose-500/20 to-rose-500/5" },
  { icon: GraduationCap, label: "Education Drives", grad: "from-violet-500/20 to-violet-500/5" },
  { icon: Landmark, label: "Heritage Walks", grad: "from-amber-500/20 to-amber-500/5" },
  { icon: Users, label: "Women's Programs", grad: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Sparkles, label: "Cultural Festivals", grad: "from-primary/20 to-primary/5" },
  { icon: Camera, label: "Community Events", grad: "from-sky-500/20 to-sky-500/5" },
];

export function Gallery() {
  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Work</p>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Glimpses of impact in Mewar
        </h2>
        <p className="mt-4 text-muted-foreground">
          From rural health camps to heritage preservation — a look at the work
          your support makes possible.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className={`group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br ${t.grad}`}
            >
              <Icon className="h-10 w-10 text-foreground/30 transition-transform group-hover:scale-110" />
              <span className="absolute bottom-3 left-4 text-sm font-medium text-foreground/70">
                {t.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
