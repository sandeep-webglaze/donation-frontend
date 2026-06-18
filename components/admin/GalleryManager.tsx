"use client";

import { useState } from "react";
import { Trash2, Image as ImageIcon, Film, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/admin/FileUpload";
import {
  useGalleryList,
  useAddGalleryItem,
  useDeleteGalleryItem,
} from "@/lib/hooks/useAdmin";

export function GalleryManager() {
  const { data: items = [], isLoading, isError } = useGalleryList();
  const add = useAddGalleryItem();
  const remove = useDeleteGalleryItem();

  const [type, setType] = useState<"image" | "video">("image");
  const [section, setSection] = useState<"hero" | "about" | "gallery" | "media">("gallery");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const onAdd = () => {
    if (!url) return;
    add.mutate(
      { type, section, url, caption },
      { onSuccess: () => { setUrl(""); setCaption(""); } }
    );
  };

  const SECTIONS = [
    { key: "hero", label: "Hero (home top)" },
    { key: "about", label: "About page" },
    { key: "gallery", label: "Gallery" },
    { key: "media", label: "Media / News" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Add new */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Add to gallery</CardTitle>
          <CardDescription>Upload an image/video from your computer, or paste a URL (e.g. a YouTube link for video).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["image", "video"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "flex h-9 items-center gap-2 rounded-lg border px-4 text-sm capitalize transition-colors",
                  type === t ? "border-primary bg-primary/10 text-foreground" : "text-muted-foreground hover:border-foreground/40"
                )}
              >
                {t === "image" ? <ImageIcon className="h-4 w-4" /> : <Film className="h-4 w-4" />}
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label>Where should this show?</Label>
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSection(s.key)}
                  className={cn(
                    "h-9 rounded-lg border px-4 text-sm transition-colors",
                    section === s.key ? "border-primary bg-primary/10 text-foreground" : "text-muted-foreground hover:border-foreground/40"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-1.5">
              <Label>URL</Label>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… or upload →" />
            </div>
            <FileUpload
              accept={type === "video" ? "video/*" : "image/*"}
              label="Upload from PC"
              onUploaded={(u, t) => { setUrl(u); setType(t); }}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Caption (optional)</Label>
            <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Health camp, Udaipur" />
          </div>

          <Button onClick={onAdd} loading={add.isPending} disabled={!url}>Add to gallery</Button>
        </CardContent>
      </Card>

      {/* Items grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gallery items ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="aspect-square w-full rounded-xl" />)}
            </div>
          ) : isError ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Couldn&apos;t load gallery. Sign in as admin.</p>
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No items yet — add your first image or video above.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.map((it) => (
                <div key={it.id} className="group relative overflow-hidden rounded-xl border bg-muted">
                  {it.type === "video" ? (
                    <div className="flex aspect-square items-center justify-center bg-foreground/5">
                      <Film className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.url} alt={it.caption || ""} className="aspect-square w-full object-cover" />
                  )}
                  {it.caption && (
                    <span className="absolute bottom-0 left-0 right-0 truncate bg-gradient-to-t from-black/70 to-transparent p-2 text-xs text-white">
                      {it.caption}
                    </span>
                  )}
                  <button
                    onClick={() => { if (confirm("Remove this item?")) remove.mutate(it.id); }}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
