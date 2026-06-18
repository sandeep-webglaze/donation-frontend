import type { Metadata } from "next";
import { PagesManager } from "@/components/admin/PagesManager";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Pages",
};

export default function PagesAdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Pages"
        description="Edit content + media for each page section, and manage per-page SEO."
      />
      <PagesManager />
    </div>
  );
}
