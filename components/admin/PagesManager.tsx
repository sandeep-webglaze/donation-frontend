"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, FileStack } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_PAGES } from "@/config/pages";
import { useContentList } from "@/lib/hooks/useAdmin";
import { SectionEditor } from "@/components/admin/SectionEditor";

export function PagesManager() {
  const [pageKey, setPageKey] = useState(SITE_PAGES[0].key);
  const { data: blocks = [] } = useContentList();
  const page = SITE_PAGES.find((p) => p.key === pageKey)!;
  const blockFor = (sk: string) =>
    blocks.find((b) => b.pageKey === pageKey && b.sectionKey === sk);

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      {/* Page list */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileStack className="h-4 w-4" /> Pages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {SITE_PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => setPageKey(p.key)}
              className={cn(
                "flex w-full flex-col items-start rounded-md px-3 py-2 text-left text-sm transition-colors",
                pageKey === p.key ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <span className="font-medium">{p.label}</span>
              <span className="font-mono text-xs opacity-70">{p.path}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Selected page */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
            <div>
              <CardTitle>{page.label}</CardTitle>
              <CardDescription>Edit each section&apos;s content &amp; media. Changes go live on save.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/seo"><Search className="mr-1.5 h-4 w-4" /> SEO</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={page.path} target="_blank"><ExternalLink className="mr-1.5 h-4 w-4" /> View</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {page.sections.map((s) => (
          <SectionEditor key={s.key} pageKey={pageKey} section={s} block={blockFor(s.key)} />
        ))}
      </div>
    </div>
  );
}
