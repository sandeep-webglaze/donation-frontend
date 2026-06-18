import type { Metadata } from "next";
import { SiteSettingsForm } from "@/components/admin/forms/SiteSettingsForm";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Website Settings"
        description="Brand, contact details, social links and default SEO — reflected on the public site."
      />
      <SiteSettingsForm />
    </div>
  );
}
