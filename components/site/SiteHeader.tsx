"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOM_LOGO, type SiteSettings } from "@/lib/api/settings";
import type { CmsPageSummary } from "@/lib/api/cms";
import { CAUSES } from "@/config/causes";

interface SiteHeaderProps {
  settings: SiteSettings;
  pages: CmsPageSummary[];
}

export function SiteHeader({ settings, pages }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [causesOpen, setCausesOpen] = useState(false);
  const navPages = pages.slice(0, 3);

  const tailLinks = [
    { href: "/gallery", label: "Media" },
    ...navPages.map((p) => ({ href: `/${p.slug}`, label: p.title })),
    { href: "/contact", label: "Contact" },
  ];

  const linkCls =
    "relative py-1 transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="container flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={settings.logo || FOM_LOGO} alt={settings.siteName} className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 lg:flex">
          <nav className="flex items-center gap-8 text-[15px] font-semibold text-foreground/80">
            <Link href="/" className={linkCls}>Home</Link>
            <Link href="/about-us" className={linkCls}>About Us</Link>

            {/* Our Causes dropdown */}
            <div className="group relative">
              <button className={`flex items-center gap-1 ${linkCls}`}>
                Our Causes <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border bg-background p-2 shadow-xl shadow-primary/5">
                  {CAUSES.map((c) => {
                    const Icon = c.icon;
                    return (
                      <Link
                        key={c.slug}
                        href={`/causes/${c.slug}`}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium leading-snug text-foreground">{c.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {tailLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>
            ))}
          </nav>
          <Button asChild size="lg" className="group/donate rounded-full px-7 shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40">
            <Link href="/donate">
              <Heart className="mr-2 h-4 w-4 transition-transform group-hover/donate:scale-110" />
              Donate
            </Link>
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
            <Link href="/" className="rounded-md px-2 py-2.5 hover:bg-muted hover:text-primary" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about-us" className="rounded-md px-2 py-2.5 hover:bg-muted hover:text-primary" onClick={() => setOpen(false)}>About Us</Link>

            {/* Causes (collapsible) */}
            <button
              className="flex items-center justify-between rounded-md px-2 py-2.5 text-left hover:bg-muted"
              onClick={() => setCausesOpen((v) => !v)}
            >
              Our Causes
              <ChevronDown className={`h-4 w-4 transition-transform ${causesOpen ? "rotate-180" : ""}`} />
            </button>
            {causesOpen && (
              <div className="ml-3 flex flex-col gap-0.5 border-l pl-3">
                {CAUSES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/causes/${c.slug}`}
                    className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            )}

            {tailLinks.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-md px-2 py-2.5 hover:bg-muted hover:text-primary" onClick={() => setOpen(false)}>
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
