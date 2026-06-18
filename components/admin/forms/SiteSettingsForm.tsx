"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUpload } from "@/components/admin/FileUpload";
import { useSiteSettings, useUpdateSiteSettings } from "@/lib/hooks/useAdmin";
import type { SiteSettings } from "@/lib/api/settings";

type FormState = Partial<SiteSettings>;

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {textarea ? (
        <Textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

export function SiteSettingsForm() {
  const { data, isLoading, isError } = useSiteSettings();
  const update = useUpdateSiteSettings();
  const [form, setForm] = useState<FormState>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (key: keyof SiteSettings) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));
  const g = (key: keyof SiteSettings) => (form[key] as string) ?? "";

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }
  if (isError) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Couldn&apos;t load settings. Make sure the API is running and you&apos;re signed in.
        </CardContent>
      </Card>
    );
  }

  const onSave = () => update.mutate(form);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="seo">SEO Defaults</TabsTrigger>
          <TabsTrigger value="contact">Contact &amp; Social</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Brand</CardTitle>
              <CardDescription>Site name, logo and footer copyright.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Website Name" value={g("siteName")} onChange={set("siteName")} placeholder="The Friends of Mewar" />
              <div className="space-y-1.5">
                <Label className="text-sm">Logo</Label>
                <div className="flex gap-2">
                  <Input value={g("logo")} onChange={(e) => set("logo")(e.target.value)} placeholder="https://…/logo.png or upload →" />
                  <FileUpload accept="image/*" label="Upload" onUploaded={(url) => set("logo")(url)} />
                </div>
                {g("logo") && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g("logo")} alt="logo preview" className="mt-2 h-12 w-auto rounded border bg-muted p-1" />
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Favicon</Label>
                <div className="flex gap-2">
                  <Input value={g("favicon")} onChange={(e) => set("favicon")(e.target.value)} placeholder="https://…/favicon.ico or upload →" />
                  <FileUpload accept="image/*" label="Upload" onUploaded={(url) => set("favicon")(url)} />
                </div>
              </div>
              <Field label="Copyright Text" value={g("copyrightText")} onChange={set("copyrightText")} placeholder="© 2026 The Friends of Mewar" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Default SEO</CardTitle>
              <CardDescription>Used as fallback when a page has no specific SEO.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Meta Title" value={g("metaTitle")} onChange={set("metaTitle")} />
              <Field label="Meta Description" value={g("metaDescription")} onChange={set("metaDescription")} textarea />
              <Field label="Meta Keywords (comma separated)" value={g("metaKeywords")} onChange={set("metaKeywords")} placeholder="ngo, donation, 80g" />
              <Field label="OG Image URL" value={g("ogImage")} onChange={set("ogImage")} placeholder="https://…/og.jpg" />
              <Field label="Canonical URL" value={g("canonicalUrl")} onChange={set("canonicalUrl")} placeholder="https://yourdomain.com" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>Shown in the site header/footer.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" value={g("email")} onChange={set("email")} placeholder="hello@example.org" />
              <Field label="Phone" value={g("phone")} onChange={set("phone")} placeholder="+91 …" />
              <Field label="WhatsApp" value={g("whatsapp")} onChange={set("whatsapp")} placeholder="+91 …" />
              <Field label="Address" value={g("address")} onChange={set("address")} placeholder="Udaipur, Rajasthan" />
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Leave blank to hide an icon.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Facebook" value={g("facebook")} onChange={set("facebook")} placeholder="https://facebook.com/…" />
              <Field label="Instagram" value={g("instagram")} onChange={set("instagram")} placeholder="https://instagram.com/…" />
              <Field label="Twitter / X" value={g("twitter")} onChange={set("twitter")} placeholder="https://twitter.com/…" />
              <Field label="LinkedIn" value={g("linkedin")} onChange={set("linkedin")} placeholder="https://linkedin.com/…" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={onSave} loading={update.isPending}>Save Settings</Button>
      </div>
    </div>
  );
}
