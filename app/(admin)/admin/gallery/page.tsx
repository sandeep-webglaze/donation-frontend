import type { Metadata } from "next";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryAdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Gallery & Media"
        description="Upload images and videos (or paste URLs). They appear on the website gallery instantly."
      />
      <GalleryManager />
    </div>
  );
}
