import { Heart, ShieldCheck } from "lucide-react";
import { TopoLines } from "@/components/site/Decor";
import { getPageContent } from "@/lib/api/content";
import { DonateAmountPicker } from "@/components/site/DonateAmountPicker";

export async function DonateBanner({ siteName }: { siteName: string }) {
  const c = (await getPageContent("home")).donate;
  const heading = c?.title || "Every donation builds healthier, brighter futures";
  const sub =
    c?.subtitle ||
    `Support ${siteName} and help us honour centuries of tradition while transforming lives today.`;

  return (
    <section className="container py-16 md:py-20">
      <div className="on-dark relative overflow-hidden rounded-[2.5rem] border bg-gradient-to-br from-primary to-primary/70 px-8 py-16 text-primary-foreground shadow-2xl shadow-primary/20 md:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        </div>
        <TopoLines className="absolute inset-0 h-full w-full text-white/10" />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-primary-foreground/85">{sub}</p>

          <DonateAmountPicker />

          <div className="mt-5 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/85">
              <ShieldCheck className="h-4 w-4" /> 80G tax benefit · Secure &amp; instant receipt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
