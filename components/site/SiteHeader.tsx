"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOM_LOGO, type SiteSettings } from "@/lib/api/settings";
import type { CmsPageSummary } from "@/lib/api/cms";

interface SiteHeaderProps {
  settings: SiteSettings;
  pages: CmsPageSummary[];
}

export function SiteHeader({ settings, pages }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const navPages = pages.slice(0, 4);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    ...navPages.map((p) => ({ href: `/${p.slug}`, label: p.title })),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="container flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.logo || FOM_LOGO}
            alt={settings.siteName}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Right — nav + donate (desktop) */}
        <div className="hidden items-center gap-9 lg:flex">
          <nav className="flex items-center gap-8 text-[15px] font-semibold text-foreground/80">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative py-1 transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="lg" className="rounded-full px-7 shadow-sm shadow-primary/30">
            <Link href="/donate">Donate</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background lg:hidden">
          <nav className="container flex flex-col gap-1 py-3 text-[15px] font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-2 py-2.5 transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full rounded-full">
              <Link href="/donate" onClick={() => setOpen(false)}>Donate</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
