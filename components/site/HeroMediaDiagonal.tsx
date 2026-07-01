"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { youtubeId, posterFor } from "@/lib/media";
import type { GalleryItem } from "@/lib/api/gallery-items";

/**
 * Donatm-style diagonal media panel for the hero — image/video bleeds to the
 * right edge with a slanted left edge + brand stripes, and a rotating play badge.
 */
export function HeroMediaDiagonal({ items }: { items: GalleryItem[] }) {
  const [modal, setModal] = useState<{ type: "image" | "video"; url: string } | null>(null);
  const current = items[0] ?? null;
  const poster = current ? posterFor(current) : null;

  return (
    <div className="absolute inset-y-0 right-0 z-0 hidden w-[54%] lg:block">
      {/* image, clipped on a diagonal (no zoom) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "polygon(150px 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              const t = e.currentTarget;
              if (!t.dataset.fb && t.src.includes("maxresdefault")) {
                t.dataset.fb = "1";
                t.src = t.src.replace("maxresdefault", "mqdefault");
              }
            }}
          />
        ) : (
          <div className="h-full w-full bg-black/20" />
        )}
        {/* warm red→yellow brand overlay (subtle) + edge blends */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(212,75,85,0.32)_0%,rgba(212,75,85,0.08)_40%,rgba(253,220,53,0.06)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-primary/30 to-transparent" />
      </div>

      {/* diagonal brand stripes along the divide */}
      <span className="absolute inset-y-0 left-[56px] w-5 -skew-x-[11deg] bg-secondary shadow-[0_0_24px_rgba(0,0,0,0.25)]" />
      <span className="absolute inset-y-0 left-[88px] w-2.5 -skew-x-[11deg] bg-white" />

      {/* play badge (over the image) */}
      {current?.type === "video" && (
        <button
          onClick={() => setModal({ type: "video", url: current.url })}
          aria-label="Play video"
          className="group absolute inset-y-0 left-[170px] right-0 flex items-center justify-center"
        >
          <span className="relative flex h-32 w-32 items-center justify-center">
            <span aria-hidden className="absolute inset-1 rounded-full bg-black/30 backdrop-blur-[2px]" />
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]">
              <defs>
                <path id="hero-play-ring" d="M60,12 a48,48 0 1,1 0,96 a48,48 0 1,1 0,-96" />
              </defs>
              <text style={{ fontSize: 11, letterSpacing: 3, fill: "#fff", fontWeight: 600 }}>
                <textPath href="#hero-play-ring">PLAY INTRO VIDEO · PLAY INTRO VIDEO · </textPath>
              </text>
            </svg>
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-xl transition-transform group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
              <Play className="relative h-6 w-6 translate-x-0.5 fill-primary" />
            </span>
          </span>
        </button>
      )}

      {/* image lightbox trigger */}
      {current?.type === "image" && (
        <button onClick={() => setModal({ type: "image", url: current.url })} aria-label="View image" className="absolute inset-y-0 left-[170px] right-0" />
      )}

      {/* modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setModal(null)}>
          <button className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close"><X className="h-7 w-7" /></button>
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
