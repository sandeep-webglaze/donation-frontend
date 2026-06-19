"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useUpsertContent, useDeleteContent } from "@/lib/hooks/useAdmin";
import type { SectionDef } from "@/config/pages";
import type { ContentBlock } from "@/lib/api/content";

/** Edit one section's text content (title/subtitle/body). Media lives in the Media tab. */
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
  const del = useDeleteContent();
  const [form, setForm] = useState({ title: "", subtitle: "", body: "" });

  useEffect(() => {
    setForm({
      title: block?.title ?? "",
      subtitle: block?.subtitle ?? "",
      body: block?.body ?? "",
    });
  }, [block]);

  if (section.fields.length === 0) return null;

  const save = () => upsert.mutate({ pageKey, sectionKey: section.key, data: form });
  const clear = () => {
    if (!confirm(`Clear all content for "${section.label}"? Section will fall back to default text.`)) return;
    del.mutate({ pageKey, sectionKey: section.key });
    setForm({ title: "", subtitle: "", body: "" });
  };

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
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={save} loading={upsert.isPending}>Save content</Button>
          {block && (
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={clear} loading={del.isPending}>
              <Trash2 className="mr-1.5 h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
