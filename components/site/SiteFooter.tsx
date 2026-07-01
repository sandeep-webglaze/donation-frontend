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
    <footer className="relative bg-[linear-gradient(135deg,#7c2128_0%,#a32f37_45%,#d44b55_100%)] text-white/80">
      {/* brand accent strip */}
      <div aria-hidden className="h-1.5 w-full bg-[linear-gradient(90deg,#d44b55_0%,#fddc35_50%,#d44b55_100%)]" />

      <div className="container grid gap-10 py-16 md:grid-cols-4">
        {/* Brand + socials */}
        <div className="space-y-4 md:col-span-2">
          <div className="inline-flex rounded-xl bg-white px-3 py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logo || FOM_LOGO} alt={settings.siteName} className="h-10 w-auto" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            {settings.metaDescription ||
              "Born from the values of the House of Mewar, we advance healthcare, women’s empowerment & education, and cultural preservation."}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2.5 pt-1">
              {socials.map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.href as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social link"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-secondary hover:text-[#3b141a]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wide text-white">Quick Links</p>
          <Link href="/" className="block text-white/60 transition-colors hover:text-secondary">Home</Link>
          <Link href="/#causes" className="block text-white/60 transition-colors hover:text-secondary">Our Causes</Link>
          <Link href="/gallery" className="block text-white/60 transition-colors hover:text-secondary">Media</Link>
          {pages.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="block text-white/60 transition-colors hover:text-secondary">
              {p.title}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wide text-white">Contact</p>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-white/60 transition-colors hover:text-secondary">
              <Mail className="h-4 w-4 text-secondary" /> {settings.email}
            </a>
          )}
          {settings.phone && (
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-white/60 transition-colors hover:text-secondary">
              <Phone className="h-4 w-4 text-secondary" /> {settings.phone}
            </a>
          )}
          {settings.address && (
            <p className="flex items-start gap-2 text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 text-secondary" /> {settings.address}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-sm text-white/50 sm:flex-row">
          <span>{copyright}</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-secondary">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
