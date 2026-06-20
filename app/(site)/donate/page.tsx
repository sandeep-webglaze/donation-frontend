import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { getSettings } from "@/lib/api/settings";
import { getGallery } from "@/lib/api/gallery-items";
import { CAUSES } from "@/config/causes";
import { DonationForm, type Fund } from "@/components/site/DonationForm";

export const metadata: Metadata = {
  title: "Donate",
  description: "Make a secure donation and receive your 80G certificate.",
};

export default async function DonatePage({
  searchParams,
}: {
  searchParams: { amount?: string };
}) {
  const [settings, media] = await Promise.all([
    getSettings(),
    getGallery("home", "about"),
  ]);
  const img = media.find((m) => m.type === "image")?.url || null;

  const funds: Fund[] = [
    { id: "general", label: `${settings.siteName} Fund` },
    ...CAUSES.map((c) => ({ id: c.slug, label: c.title })),
  ];

  const amt = Number(searchParams?.amount);
  const defaultAmount = Number.isFinite(amt) && amt > 0 ? amt : 1000;

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Heart className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Support {settings.siteName}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your contribution advances healthcare, education and cultural preservation across Mewar.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-2">
        {/* Visual */}
        <div className="overflow-hidden rounded-3xl border shadow-lg">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={settings.siteName} className="h-full max-h-[560px] w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
              <Heart className="h-16 w-16" />
            </div>
          )}
        </div>

        {/* Form */}
        <DonationForm funds={funds} defaultAmount={defaultAmount} />
      </div>
    </section>
  );
}
