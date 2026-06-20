"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { youtubeId, posterFor } from "@/lib/media";
import type { GalleryItem } from "@/lib/api/gallery-items";

interface Props {
  items: GalleryItem[];
  /** Tailwind aspect class for the main frame. */
  aspect?: string;
  className?: string;
  frameClassName?: string;
  /** Auto-advance interval (ms). 0 disables. */
  interval?: number;
}

type Modal = { type: "image" | "video"; url: string } | null;

/**
 * Image + video showcase.
 * - Auto-advances every few seconds (pauses while a modal is open).
 * - Dots to jump between items.
 * - Image → click opens a full-screen view. Video → click opens the player.
 */
export function MediaShowcase({
  items,
  aspect = "aspect-[5/4]",
  className,
  frameClassName,
  interval = 3000,
}: Props) {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<Modal>(null);

  // Auto-advance.
  useEffect(() => {
    if (items.length <= 1 || interval <= 0 || modal) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items.length, interval, modal]);

  if (items.length === 0) {
    return (
      <div className={cn("overflow-hidden rounded-[2rem] border", className)}>
        <div className={cn(aspect, "w-full bg-white/10")} />
      </div>
    );
  }

  const current = items[Math.min(active, items.length - 1)];
  const poster = posterFor(current);

  const openCurrent = () =>
    setModal({ type: current.type, url: current.url });

  return (
    <div className={className}>
      {/* Main frame */}
      <button
        onClick={openCurrent}
        className={cn(
          "group relative block w-full overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl",
          aspect,
          frameClassName
        )}
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <span className="block h-full w-full bg-white/10 backdrop-blur-sm" />
        )}

        {current.type === "video" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-xl">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
              <Play className="relative h-7 w-7 translate-x-0.5 fill-primary" />
            </span>
          </span>
        )}
      </button>

      {/* Dots */}
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setActive(i)}
              aria-label={`Go to item ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === active ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}

      {/* Modal — full image / video player */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setModal(null)}
        >
          <button className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {modal.type === "video" ? (
              youtubeId(modal.url) ? (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId(modal.url)}?autoplay=1`}
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <video src={modal.url} controls autoPlay className="max-h-[85vh] w-full rounded-xl bg-black" />
              )
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={modal.url} alt="" className="mx-auto max-h-[85vh] w-auto rounded-xl object-contain" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
