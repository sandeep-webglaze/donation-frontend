import { getSettings } from "@/lib/api/settings";
import { getPublishedPages } from "@/lib/api/cms";
import { TopBar } from "@/components/site/TopBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileDonateBar } from "@/components/site/MobileDonateBar";

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
      <TopBar settings={settings} />
      <SiteHeader settings={settings} pages={pages} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <SiteFooter settings={settings} pages={pages} />
      <MobileDonateBar settings={settings} />
    </div>
  );
}
