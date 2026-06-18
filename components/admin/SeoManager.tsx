"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSeoList, useUpsertSeo } from "@/lib/hooks/useAdmin";
import type { PageSeo } from "@/lib/api/seo-meta";

/** Coded pages whose SEO is managed here. Add a new entry when you add a page. */
const KNOWN_PAGES = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
  { key: "donate", label: "Donate" },
];

type Draft = Partial<PageSeo>;

export function SeoManager() {
  const { data: entries = [], isLoading } = useSeoList();
  const upsert = useUpsertSeo();

  const pages = useMemo(() => {
    const extra = entries
      .filter((e) => !KNOWN_PAGES.some((k) => k.key === e.pageKey))
      .map((e) => ({ key: e.pageKey, label: e.label || e.pageKey }));
    return [...KNOWN_PAGES, ...extra];
  }, [entries]);

  const [selected, setSelected] = useState("home");
  const current = entries.find((e) => e.pageKey === selected);
  const [draft, setDraft] = useState<Draft>({});

  useEffect(() => {
    setDraft(current ?? {});
  }, [selected, current]);

  const set = (k: keyof PageSeo, v: string | boolean) =>
    setDraft((d) => ({ ...d, [k]: v }));
  const g = (k: keyof PageSeo) => (draft[k] as string) ?? "";

  const onSave = () =>
    upsert.mutate({ key: selected, data: { ...draft, label: draft.label || labelFor(selected) } });

  const labelFor = (key: string) =>
    pages.find((p) => p.key === key)?.label || key;

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      {/* Page list */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Pages</CardTitle>
          <CardDescription>Select a page to edit its SEO.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {pages.map((p) => {
            const configured = entries.some((e) => e.pageKey === p.key);
            return (
              <button
                key={p.key}
                onClick={() => setSelected(p.key)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  selected === p.key
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <span className="flex items-center gap-2">
                  <Search className="h-3.5 w-3.5" /> {p.label}
                </span>
                {configured && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            SEO — {labelFor(selected)}
            <Badge variant="outline" className="font-mono text-xs">{selected}</Badge>
          </CardTitle>
          <CardDescription>
            These values override the global defaults for this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label>Meta Title</Label>
                <Input value={g("metaTitle")} onChange={(e) => set("metaTitle", e.target.value)} placeholder="Page title for search engines" />
              </div>
              <div className="space-y-1.5">
                <Label>Meta Description</Label>
                <Textarea rows={3} value={g("metaDescription")} onChange={(e) => set("metaDescription", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Keywords (comma separated)</Label>
                <Input value={g("metaKeywords")} onChange={(e) => set("metaKeywords", e.target.value)} placeholder="ngo, donation, 80g" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>OG Title</Label>
                  <Input value={g("ogTitle")} onChange={(e) => set("ogTitle", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>OG Image URL</Label>
                  <Input value={g("ogImage")} onChange={(e) => set("ogImage", e.target.value)} placeholder="https://…/og.jpg" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>OG Description</Label>
                <Textarea rows={2} value={g("ogDescription")} onChange={(e) => set("ogDescription", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Canonical URL</Label>
                <Input value={g("canonicalUrl")} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder="https://yourdomain.com/about" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label className="font-medium">No-index this page</Label>
                  <p className="text-xs text-muted-foreground">Hide from search engines.</p>
                </div>
                <Switch checked={!!draft.noIndex} onCheckedChange={(v) => set("noIndex", v)} />
              </div>

              <div className="flex justify-end">
                <Button onClick={onSave} loading={upsert.isPending}>Save SEO</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
