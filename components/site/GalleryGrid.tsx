"use client";

import { useCallback, useEffect, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/api/gallery-items";

/** Extract a YouTube video id from common URL formats. */
function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  const current = active === null ? null : items[active];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border bg-muted"
          >
            {it.type === "video" ? (
              <div className="flex h-full items-center justify-center bg-foreground/5">
                {it.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.thumbnail} alt={it.caption || ""} className="h-full w-full object-cover" />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.url}
                alt={it.caption || ""}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            )}
            {it.caption && (
              <span className="absolute bottom-0 left-0 right-0 truncate bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm font-medium text-white">
                {it.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button onClick={close} className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 md:left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {current.type === "video" ? (
              youtubeId(current.url) ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId(current.url)}?autoplay=1`}
                    title={current.caption || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <video src={current.url} controls autoPlay className="max-h-[85vh] w-full rounded-xl bg-black" />
              )
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current.url} alt={current.caption || ""} className="mx-auto max-h-[85vh] w-auto rounded-xl object-contain" />
            )}
            {current.caption && (
              <p className="mt-3 text-center text-sm text-white/80">{current.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
