"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import type { SiteSettings } from "@/lib/api/settings";
import type { CmsPageSummary } from "@/lib/api/cms";

interface SiteHeaderProps {
  settings: SiteSettings;
  pages: CmsPageSummary[];
}

/**
 * Dynamic public site header. Logo + name come from Settings API; nav links
 * include the published CMS pages.
 */
export function SiteHeader({ settings, pages }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const navPages = pages.slice(0, 4);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-8">
          {settings.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logo} alt={settings.siteName} className="h-9 w-auto" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <Heart className="h-4 w-4" />
            </div>
          )}
          <span className="font-bold text-lg tracking-tight">{settings.siteName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          {navPages.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="hover:text-foreground transition-colors">
              {p.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex shadow-sm shadow-primary/30">
            <Link href="/donate">Donate</Link>
          </Button>
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col py-3 gap-1 text-sm">
            <Link href="/" className="py-2" onClick={() => setOpen(false)}>Home</Link>
            {pages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="py-2" onClick={() => setOpen(false)}>
                {p.title}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link href="/donate" onClick={() => setOpen(false)}>Donate</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
