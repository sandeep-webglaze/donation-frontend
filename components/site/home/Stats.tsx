const STATS = [
  { value: "1290+", label: "Years of legacy" },
  { value: "10,000+", label: "Lives touched" },
  { value: "3", label: "Core causes" },
  { value: "100%", label: "Transparency" },
];

export function Stats() {
  return (
    <section className="border-b bg-muted/30">
      <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-4xl font-bold text-primary md:text-5xl">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
