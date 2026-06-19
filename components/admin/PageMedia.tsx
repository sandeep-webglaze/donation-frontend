"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Film,
  Image as ImageIcon,
  Plus,
  ChevronUp,
  ChevronDown,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/admin/FileUpload";
import {
  useSectionMedia,
  useAddGalleryItem,
  useUpdateGalleryItem,
  useDeleteGalleryItem,
} from "@/lib/hooks/useAdmin";
import type { GalleryItem } from "@/lib/api/gallery-items";
import type { PageDef } from "@/config/pages";

export function PageMedia({ page }: { page: PageDef }) {
  const mediaSections = page.sections.filter((s) => s.media);
  const { data: items = [], isLoading } = useSectionMedia(page.key, "");
  const add = useAddGalleryItem();
  const update = useUpdateGalleryItem();
  const remove = useDeleteGalleryItem();

  const [section, setSection] = useState(mediaSections[0]?.key ?? "gallery");
  const [type, setType] = useState<"image" | "video">("image");
  const [url, setUrl] = useState("");

  if (mediaSections.length === 0) {
    return <p className="text-sm text-muted-foreground">This page has no media sections.</p>;
  }

  const addOne = (u: string, t: "image" | "video") =>
    add.mutate({ pageKey: page.key, section, type: t, url: u });

  /** Persist a new order for one section by writing sortOrder = index. */
  const persistOrder = (ordered: GalleryItem[]) => {
    ordered.forEach((it, i) => {
      if (it.sortOrder !== i) update.mutate({ id: it.id, data: { sortOrder: i } });
    });
  };

  const move = (group: GalleryItem[], index: number, dir: -1 | 1) => {
    const next = [...group];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    persistOrder(next);
  };

  return (
    <div className="space-y-5">
      {/* Add */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <p className="flex items-center gap-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Add images / videos</p>

          <div className="space-y-1.5">
            <Label>Add to section</Label>
            <div className="flex flex-wrap gap-2">
              {mediaSections.map((s) => (
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

          <div className="flex gap-2">
            {(["image", "video"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "flex h-9 items-center gap-1.5 rounded-lg border px-4 text-sm capitalize",
                  type === t ? "border-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                {t === "image" ? <ImageIcon className="h-4 w-4" /> : <Film className="h-4 w-4" />} {t}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste image/video URL (e.g. YouTube) — or upload →" className="h-10" />
            <FileUpload
              multiple
              accept={type === "video" ? "video/*" : "image/*"}
              label="Upload (multiple)"
              onUploaded={(u, t) => addOne(u, t)}
            />
            <Button className="h-10" onClick={() => { if (url) { addOne(url, type); setUrl(""); } }} disabled={!url}>Add URL</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: &quot;Upload (multiple)&quot; se ek saath kai images/videos chuno — sab is section me add ho jaayenge.
          </p>
        </CardContent>
      </Card>

      {/* Existing media grouped by section */}
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No media yet — add some above.</p>
      ) : (
        mediaSections.map((sec) => {
          const group = items.filter((i) => i.section === sec.key);
          if (group.length === 0) return null;
          return (
            <Card key={sec.key}>
              <CardContent className="pt-6">
                <p className="mb-3 text-sm font-semibold">{sec.label} <span className="text-muted-foreground">({group.length})</span></p>
                <div className="space-y-2">
                  {group.map((it, i) => (
                    <MediaRow
                      key={it.id}
                      item={it}
                      isFirst={i === 0}
                      isLast={i === group.length - 1}
                      onUp={() => move(group, i, -1)}
                      onDown={() => move(group, i, 1)}
                      onSaveCaption={(caption) => update.mutate({ id: it.id, data: { caption } })}
                      onDelete={() => remove.mutate(it.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

function MediaRow({
  item,
  isFirst,
  isLast,
  onUp,
  onDown,
  onSaveCaption,
  onDelete,
}: {
  item: GalleryItem;
  isFirst: boolean;
  isLast: boolean;
  onUp: () => void;
  onDown: () => void;
  onSaveCaption: (caption: string) => void;
  onDelete: () => void;
}) {
  const [caption, setCaption] = useState(item.caption ?? "");
  useEffect(() => setCaption(item.caption ?? ""), [item.caption]);
  const dirty = caption !== (item.caption ?? "");

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-2">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border bg-muted">
        {item.type === "video" ? (
          <div className="flex h-full items-center justify-center"><Film className="h-5 w-5 text-muted-foreground" /></div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="flex flex-1 items-center gap-2">
        <Input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="h-9"
        />
        {dirty && (
          <Button size="icon" variant="outline" className="h-9 w-9 shrink-0" onClick={() => onSaveCaption(caption)} title="Save caption">
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button size="icon" variant="ghost" className="h-8 w-8" disabled={isFirst} onClick={onUp} title="Move up">
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8" disabled={isLast} onClick={onDown} title="Move down">
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={onDelete} title="Delete">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
