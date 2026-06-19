"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/admin/FileUpload";
import { Trash2 } from "lucide-react";
import { useSeoList, useUpsertSeo, useDeleteSeo } from "@/lib/hooks/useAdmin";
import type { PageSeo } from "@/lib/api/seo-meta";
import type { PageDef } from "@/config/pages";

const empty = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
  noIndex: false,
};

/** Per-page SEO editor (meta + Open Graph). */
export function PageSeoForm({ page }: { page: PageDef }) {
  const { data: list = [] } = useSeoList();
  const upsert = useUpsertSeo();
  const del = useDeleteSeo();
  const existing = list.find((s) => s.pageKey === page.key);

  const [form, setForm] = useState({ ...empty });

  useEffect(() => {
    if (existing) {
      setForm({
        metaTitle: existing.metaTitle ?? "",
        metaDescription: existing.metaDescription ?? "",
        metaKeywords: existing.metaKeywords ?? "",
        ogTitle: existing.ogTitle ?? "",
        ogDescription: existing.ogDescription ?? "",
        ogImage: existing.ogImage ?? "",
        canonicalUrl: existing.canonicalUrl ?? "",
        noIndex: existing.noIndex ?? false,
      });
    } else {
      setForm({ ...empty });
    }
  }, [existing]);

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = () =>
    upsert.mutate({ key: page.key, data: { label: page.label, ...form } as Partial<PageSeo> });
  const reset = () => {
    if (!confirm(`Reset SEO for "${page.label}"? It will fall back to site defaults.`)) return;
    del.mutate(page.key);
    setForm({ ...empty });
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-1.5">
          <Label>Meta title</Label>
          <Input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={`${page.label} — The Friends of Mewar`} />
          <p className="text-xs text-muted-foreground">{form.metaTitle.length}/60 chars (ideal ≤ 60)</p>
        </div>

        <div className="space-y-1.5">
          <Label>Meta description</Label>
          <Textarea rows={3} value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
          <p className="text-xs text-muted-foreground">{form.metaDescription.length}/160 chars (ideal ≤ 160)</p>
        </div>

        <div className="space-y-1.5">
          <Label>Keywords</Label>
          <Input value={form.metaKeywords} onChange={(e) => set("metaKeywords", e.target.value)} placeholder="comma, separated, keywords" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>OG title</Label>
            <Input value={form.ogTitle} onChange={(e) => set("ogTitle", e.target.value)} placeholder="Falls back to meta title" />
          </div>
          <div className="space-y-1.5">
            <Label>Canonical URL</Label>
            <Input value={form.canonicalUrl} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder={`https://thefriendsofmewar.org${page.path}`} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>OG description</Label>
          <Textarea rows={2} value={form.ogDescription} onChange={(e) => set("ogDescription", e.target.value)} placeholder="Falls back to meta description" />
        </div>

        <div className="space-y-1.5">
          <Label>Share image (OG image)</Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="Image URL shown when shared on social" />
            <FileUpload accept="image/*" label="Upload" onUploaded={(u) => set("ogImage", u)} />
          </div>
          {form.ogImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.ogImage} alt="" className="mt-2 h-24 rounded-lg border object-cover" />
          )}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.noIndex} onChange={(e) => set("noIndex", e.target.checked)} className="h-4 w-4" />
          Hide this page from search engines (noindex)
        </label>

        <div className="flex items-center gap-2">
          <Button onClick={save} loading={upsert.isPending}>Save SEO</Button>
          {existing && (
            <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={reset} loading={del.isPending}>
              <Trash2 className="mr-1.5 h-4 w-4" /> Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
