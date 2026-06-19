import Link from "next/link";
import { Heart, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/api/settings";

/** Sticky bottom action bar on mobile — Call + Donate (hidden on desktop). */
export function MobileDonateBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 py-2.5 shadow-[0_-4px_16px_-6px_rgba(0,0,0,0.2)] backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        {settings.phone && (
          <Link
            href={`tel:${settings.phone}`}
            className="flex h-11 w-12 shrink-0 items-center justify-center rounded-full border text-primary"
            aria-label="Call us"
          >
            <Phone className="h-5 w-5" />
          </Link>
        )}
        <Link
          href="/donate"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground shadow-md shadow-primary/30"
        >
          <Heart className="h-4 w-4" /> Donate Now
        </Link>
      </div>
    </div>
  );
}
