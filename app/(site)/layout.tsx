import { getSettings } from "@/lib/api/settings";
import { getPublishedPages } from "@/lib/api/cms";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/**
 * Public site shell — fetches website settings + published pages server-side
 * and renders the dynamic header/footer around every public page.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, pages] = await Promise.all([
    getSettings(),
    getPublishedPages(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader settings={settings} pages={pages} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} pages={pages} />
    </div>
  );
}
