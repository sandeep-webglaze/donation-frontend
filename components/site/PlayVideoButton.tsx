"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

/** Circular "Play Intro Video" button → opens a video modal. */
export function PlayVideoButton({ url }: { url?: string | null }) {
  const [open, setOpen] = useState(false);
  const yt = url ? youtubeId(url) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Play intro video"
        className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-xl"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
        <Play className="relative h-7 w-7 translate-x-0.5 fill-primary" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {url && yt ? (
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${yt}?autoplay=1`}
                  title="Intro video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : url ? (
              <video src={url} controls autoPlay className="w-full rounded-xl bg-black" />
            ) : (
              <div className="rounded-xl bg-card p-12 text-center text-muted-foreground">
                Intro video coming soon. Add one from the admin gallery.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
