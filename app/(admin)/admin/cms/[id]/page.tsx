import type { Metadata } from "next";
import { CmsPageForm } from "@/components/admin/forms/CmsPageForm";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Edit Page",
};

export default function CmsEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={isNew ? "New Page" : "Edit Page"}
        description="Title, slug, rich-text content, cover image and per-page SEO."
      />
      <CmsPageForm id={params.id} />
    </div>
  );
}
