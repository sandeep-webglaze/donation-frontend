import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { FOM_LOGO, type SiteSettings } from "@/lib/api/settings";
import type { CmsPageSummary } from "@/lib/api/cms";

interface SiteFooterProps {
  settings: SiteSettings;
  pages: CmsPageSummary[];
}

/** Dynamic public footer — all content driven by the Settings + CMS APIs. */
export function SiteFooter({ settings, pages }: SiteFooterProps) {
  const socials = [
    { icon: Facebook, href: settings.facebook || "https://www.facebook.com/FriendsofMewar/" },
    { icon: Instagram, href: settings.instagram || "https://www.instagram.com/thefriendsofmewar" },
    { icon: Linkedin, href: settings.linkedin || "https://www.linkedin.com/company/friends-of-mewar/" },
    { icon: Youtube, href: "https://www.youtube.com/@TheFriendsOfMewar" },
    ...(settings.twitter ? [{ icon: Twitter, href: settings.twitter }] : []),
  ].filter((s) => s.href);

  const year = new Date().getFullYear();
  const copyright =
    settings.copyrightText || `© ${year} ${settings.siteName}. All rights reserved.`;

  // Always-present legal links — use the matching CMS page if it exists, else the standard slug.
  const findSlug = (needle: string, fallback: string) =>
    pages.find((p) => p.slug.includes(needle))?.slug ?? fallback;
  const legalLinks = [
    { href: `/${findSlug("privacy", "privacy-policy")}`, label: "Privacy Policy" },
    { href: `/${findSlug("terms", "terms-and-conditions")}`, label: "Terms & Conditions" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        {/* Brand + socials */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logo || FOM_LOGO} alt={settings.siteName} className="h-10 w-auto" />
          </div>
          {settings.metaDescription && (
            <p className="text-sm text-muted-foreground max-w-sm">
              {settings.metaDescription}
            </p>
          )}
          {socials.length > 0 && (
            <div className="flex gap-2 pt-1">
              {socials.map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.href as string}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick links — published CMS pages */}
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground">Quick Links</p>
          <Link href="/" className="block text-muted-foreground hover:text-foreground">Home</Link>
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="block text-muted-foreground hover:text-foreground"
            >
              {p.title}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground">Contact</p>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Mail className="h-3.5 w-3.5" /> {settings.email}
            </a>
          )}
          {settings.phone && (
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> {settings.phone}
            </a>
          )}
          {settings.address && (
            <p className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mt-0.5" /> {settings.address}
            </p>
          )}
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-sm text-muted-foreground sm:flex-row">
          <span>{copyright}</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
