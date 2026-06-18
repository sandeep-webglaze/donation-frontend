import type { Metadata } from "next";
import { CmsPagesTable } from "@/components/admin/CmsPagesTable";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "CMS — Pages & Policies",
};

export default function CmsListPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="CMS — Pages & Policies"
        description="Manage About, Privacy, Terms, Refund and other content pages. Changes reflect on the website after saving."
      />
      <CmsPagesTable />
    </div>
  );
}
