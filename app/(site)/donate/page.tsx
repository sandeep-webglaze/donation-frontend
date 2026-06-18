import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { getSettings } from "@/lib/api/settings";

export const metadata: Metadata = {
  title: "Donate",
  description: "Make a secure donation and receive your 80G certificate.",
};

export default async function DonatePage() {
  const settings = await getSettings();

  return (
    <section className="container py-24 max-w-2xl text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Heart className="h-6 w-6" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Donate to {settings.siteName}
      </h1>
      <p className="text-muted-foreground mb-8">
        Secure online donations (UPI, cards, net-banking) with automatic 80G
        certificates are coming soon. To contribute today, please reach out to us.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {settings.email && (
          <Button size="lg" asChild>
            <Link href={`mailto:${settings.email}`}>Email us to donate</Link>
          </Button>
        )}
        {settings.phone && (
          <Button size="lg" variant="outline" asChild>
            <Link href={`tel:${settings.phone}`}>Call {settings.phone}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
