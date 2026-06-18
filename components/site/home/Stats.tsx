import { Crown, HeartHandshake, Sparkles, ShieldCheck } from "lucide-react";

const STATS = [
  { value: "1290+", label: "Years of legacy", icon: Crown },
  { value: "10,000+", label: "Lives touched", icon: HeartHandshake },
  { value: "3", label: "Core causes", icon: Sparkles },
  { value: "100%", label: "Transparency", icon: ShieldCheck },
];

export function Stats() {
  return (
    <section className="relative z-10 -mt-16 pb-16 md:-mt-24">
      <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
