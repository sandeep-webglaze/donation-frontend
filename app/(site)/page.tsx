import { getSettings } from "@/lib/api/settings";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/site/home/Hero";
import { Stats } from "@/components/site/home/Stats";
import { Causes } from "@/components/site/home/Causes";
import { FeaturedCampaign } from "@/components/site/home/FeaturedCampaign";
import { Mission } from "@/components/site/home/Mission";
import { WaysToGive } from "@/components/site/home/WaysToGive";
import { DonateBanner } from "@/components/site/home/DonateBanner";
import { Testimonials } from "@/components/site/home/Testimonials";
import { Quote } from "@/components/site/home/Quote";
import { Gallery } from "@/components/site/home/Gallery";
import { Newsletter } from "@/components/site/home/Newsletter";

// SEO is admin-managed via the SEO Manager (pageKey "home"), with global fallback.
export const generateMetadata = () => buildMetadata({ pageKey: "home", path: "/" });

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <Hero settings={settings} />
      <Stats />
      <Causes />
      <FeaturedCampaign />
      <Mission settings={settings} />
      <WaysToGive />
      <DonateBanner siteName={settings.siteName} />
      <Testimonials />
      <Quote />
      <Gallery />
      <Newsletter />
    </>
  );
}
