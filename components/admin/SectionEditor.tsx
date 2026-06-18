"use client";

import { useEffect, useState } from "react";
import { Trash2, Film, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/admin/FileUpload";
import {
  useUpsertContent,
  useSectionMedia,
  useAddGalleryItem,
  useDeleteGalleryItem,
} from "@/lib/hooks/useAdmin";
import type { SectionDef } from "@/config/pages";
import type { ContentBlock } from "@/lib/api/content";

export function SectionEditor({
  pageKey,
  section,
  block,
}: {
  pageKey: string;
  section: SectionDef;
  block?: ContentBlock;
}) {
  const upsert = useUpsertContent();
  const [form, setForm] = useState({ title: "", subtitle: "", body: "" });

  useEffect(() => {
    setForm({
      title: block?.title ?? "",
      subtitle: block?.subtitle ?? "",
      body: block?.body ?? "",
    });
  }, [block]);

  const save = () =>
    upsert.mutate({ pageKey, sectionKey: section.key, data: form });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{section.label}</CardTitle>
        {section.hint && <CardDescription>{section.hint}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {section.fields.includes("title") && (
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
        )}
        {section.fields.includes("subtitle") && (
          <div className="space-y-1.5">
            <Label>Subtitle</Label>
            <Input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
          </div>
        )}
        {section.fields.includes("body") && (
          <div className="space-y-1.5">
            <Label>Text</Label>
            <Textarea rows={4} value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} />
          </div>
        )}
        {section.fields.length > 0 && (
          <Button size="sm" onClick={save} loading={upsert.isPending}>Save content</Button>
        )}

        {section.media && (
          <SectionMedia pageKey={pageKey} sectionKey={section.key} allowVideo={section.media === "media" || section.media === "video"} />
        )}
      </CardContent>
    </Card>
  );
}

function SectionMedia({
  pageKey,
  sectionKey,
  allowVideo,
}: {
  pageKey: string;
  sectionKey: string;
  allowVideo: boolean;
}) {
  const { data: items = [], isLoading } = useSectionMedia(pageKey, sectionKey);
  const add = useAddGalleryItem();
  const remove = useDeleteGalleryItem();
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"image" | "video">("image");

  const onAdd = () => {
    if (!url) return;
    add.mutate(
      { pageKey, section: sectionKey, type, url },
      { onSuccess: () => setUrl("") }
    );
  };

  return (
    <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
      <p className="text-sm font-medium">Media for this section</p>

      {allowVideo && (
        <div className="flex gap-2">
          {(["image", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs capitalize",
                type === t ? "border-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              {t === "image" ? <ImageIcon className="h-3.5 w-3.5" /> : <Film className="h-3.5 w-3.5" />} {t}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image/video URL or upload →" className="h-9" />
        <FileUpload accept={type === "video" ? "video/*" : "image/*"} label="Upload" onUploaded={(u, t) => { setUrl(u); setType(t); }} />
        <Button size="sm" className="h-9" onClick={onAdd} loading={add.isPending} disabled={!url}>Add</Button>
      </div>

      {isLoading ? (
        <p className="text-xs text-muted-foreground">Loading…</p>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {items.map((it) => (
            <div key={it.id} className="group relative aspect-square overflow-hidden rounded-md border bg-muted">
              {it.type === "video" ? (
                <div className="flex h-full items-center justify-center"><Film className="h-5 w-5 text-muted-foreground" /></div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.url} alt="" className="h-full w-full object-cover" />
              )}
              <button
                onClick={() => remove.mutate(it.id)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No media yet.</p>
      )}
    </div>
  );
}
