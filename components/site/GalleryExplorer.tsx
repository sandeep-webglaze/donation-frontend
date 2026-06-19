"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import type { GalleryItem } from "@/lib/api/gallery-items";

interface Props {
  items: GalleryItem[];
  categories: { key: string; label: string }[];
}

/** Category filter chips + filtered media grid (with lightbox via GalleryGrid). */
export function GalleryExplorer({ items, categories }: Props) {
  const [active, setActive] = useState<string>("all");

  // Only show categories that actually have media.
  const available = useMemo(
    () => categories.filter((c) => items.some((i) => i.section === c.key)),
    [items, categories]
  );

  const filtered = active === "all" ? items : items.filter((i) => i.section === active);

  const chip = (key: string, label: string, count: number) => (
    <button
      key={key}
      onClick={() => setActive(key)}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active === key
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {label} <span className="opacity-60">({count})</span>
    </button>
  );

  return (
    <div>
      {available.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {chip("all", "All", items.length)}
          {available.map((c) => chip(c.key, c.label, items.filter((i) => i.section === c.key).length))}
        </div>
      )}

      <GalleryGrid items={filtered} />
    </div>
  );
}
