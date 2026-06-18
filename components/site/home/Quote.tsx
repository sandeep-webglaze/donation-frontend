import { Quote as QuoteIcon } from "lucide-react";

export function Quote() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <QuoteIcon className="mx-auto h-10 w-10 text-amber-500/70" />
          <blockquote className="mt-6 font-serif text-2xl font-medium leading-relaxed tracking-tight md:text-3xl">
            “When the traditions of a people are preserved, they continue to inspire
            the nation — invigorating our self-reliance, self-respect and integrity.”
          </blockquote>
          <p className="mt-6 text-sm font-medium text-muted-foreground">
            — Inspired by the values of the House of Mewar
          </p>
        </div>
      </div>
    </section>
  );
}
