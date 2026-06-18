"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  useCmsPage,
  useCreateCmsPage,
  useUpdateCmsPage,
} from "@/lib/hooks/useAdmin";
import type { CmsPage } from "@/lib/api/cms";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

type Form = Partial<CmsPage>;

export function CmsPageForm({ id }: { id: string }) {
  const isNew = id === "new";
  const router = useRouter();
  const { data, isLoading } = useCmsPage(id);
  const create = useCreateCmsPage();
  const update = useUpdateCmsPage();

  const [form, setForm] = useState<Form>({ status: "draft", content: "" });
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (k: keyof CmsPage, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const g = (k: keyof CmsPage) => (form[k] as string) ?? "";

  const onTitle = (v: string) => {
    setForm((f) => ({
      ...f,
      title: v,
      slug: isNew && !slugTouched ? slugify(v) : f.slug,
    }));
  };

  const onSave = () => {
    if (isNew) {
      create.mutate(form, { onSuccess: () => router.push("/admin/cms") });
    } else {
      update.mutate({ id, data: form });
    }
  };

  const saving = create.isPending || update.isPending;
  const published = form.status === "published";

  if (!isNew && isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/cms"><ArrowLeft className="mr-1.5 h-4 w-4" /> Back to pages</Link>
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={published}
              onCheckedChange={(v) => set("status", v ? "published" : "draft")}
            />
            <span className="text-sm text-muted-foreground">
              {published ? "Published" : "Draft"}
            </span>
          </div>
          <Button onClick={onSave} loading={saving}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Page Title</Label>
                  <Input value={g("title")} onChange={(e) => onTitle(e.target.value)} placeholder="Privacy Policy" />
                </div>
                <div className="space-y-1.5">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={g("slug")}
                    onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }}
                    placeholder="privacy-policy"
                  />
                  <p className="text-xs text-muted-foreground">Public URL: /{g("slug") || "…"}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Cover / Hero Image URL (optional)</Label>
                <Input value={g("coverImage")} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://…/cover.jpg" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={(form.content as string) || ""}
                onChange={(html) => setForm((f) => ({ ...f, content: html }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Page SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Meta Title</Label>
                <Input value={g("metaTitle")} onChange={(e) => set("metaTitle", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Meta Description</Label>
                <Textarea rows={3} value={g("metaDescription")} onChange={(e) => set("metaDescription", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Keywords (comma separated)</Label>
                <Input value={g("metaKeywords")} onChange={(e) => set("metaKeywords", e.target.value)} placeholder="privacy, policy, data" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
