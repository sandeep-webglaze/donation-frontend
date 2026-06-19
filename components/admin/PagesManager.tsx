"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, FileStack, FileText, Search, Images } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_PAGES } from "@/config/pages";
import { useContentList } from "@/lib/hooks/useAdmin";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { PageSeoForm } from "@/components/admin/PageSeoForm";
import { PageMedia } from "@/components/admin/PageMedia";

type Tab = "content" | "seo" | "gallery";

const TABS: { key: Tab; label: string; icon: typeof FileText }[] = [
  { key: "content", label: "Content", icon: FileText },
  { key: "seo", label: "SEO", icon: Search },
  { key: "gallery", label: "Gallery", icon: Images },
];

export function PagesManager() {
  const [pageKey, setPageKey] = useState(SITE_PAGES[0].key);
  const [tab, setTab] = useState<Tab>("content");
  const { data: blocks = [] } = useContentList();

  const page = SITE_PAGES.find((p) => p.key === pageKey)!;
  const editableSections = page.sections.filter((s) => s.fields.length > 0);
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
            <CardTitle>{page.label}</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={page.path} target="_blank"><ExternalLink className="mr-1.5 h-4 w-4" /> View page</Link>
            </Button>
          </CardHeader>

          {/* Tabs */}
          <CardContent>
            <div className="flex gap-1 rounded-lg border bg-muted/40 p-1">
              {TABS.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" /> {t.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content tab */}
        {tab === "content" && (
          <div className="space-y-4">
            {editableSections.map((s) => (
              <SectionEditor key={s.key} pageKey={pageKey} section={s} block={blockFor(s.key)} />
            ))}
          </div>
        )}

        {/* SEO tab */}
        {tab === "seo" && <PageSeoForm page={page} />}

        {/* Gallery tab */}
        {tab === "gallery" && <PageMedia page={page} />}
      </div>
    </div>
  );
}
