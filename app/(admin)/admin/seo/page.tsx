import type { Metadata } from "next";
import { SeoManager } from "@/components/admin/SeoManager";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "SEO Manager",
};

export default function SeoPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="SEO Manager"
        description="Per-page meta title, description, keywords, Open Graph & canonical for coded pages (Home, About, Contact)."
      />
      <SeoManager />
    </div>
  );
}
