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
      <div className="on-dark relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-white shadow-2xl shadow-primary/30 md:px-16 md:py-16 bg-[linear-gradient(135deg,#6d1f26_0%,#a32f37_55%,#d44b55_100%)]">
        {/* grid boxes + decorative glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-8 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
        <TopoLines className="absolute inset-0 h-full w-full text-white/10" />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-[#122f2a] shadow-lg shadow-black/20 ring-4 ring-white/20">
            <Heart className="h-7 w-7 fill-current" />
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 text-white/90">{sub}</p>

          <DonateAmountPicker />

          <div className="mt-5 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 text-sm text-white/85">
              <ShieldCheck className="h-4 w-4 text-secondary" /> 80G tax benefit · Secure &amp; instant receipt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
