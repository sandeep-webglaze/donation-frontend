import { serverFetch } from "./server";

/** Website settings as returned by the backend Settings API. */
export interface SiteSettings {
  id: string;
  siteName: string;
  logo: string | null;
  favicon: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  copyrightText: string | null;
}

/** Brand logo — used as a hard fallback if Settings API has no logo yet. */
export const FOM_LOGO =
  "https://images.squarespace-cdn.com/content/v1/68c03eefbb6dde4f22ccb573/a506a2c2-ad45-4e6a-a663-9b9748d01329/THE+FOM+Logo+2025.png?format=1500w";

/** Sensible fallbacks so the UI never renders blank if the API is unreachable. */
export const SETTINGS_FALLBACK: SiteSettings = {
  id: "",
  siteName: "The Friends of Mewar",
  logo: FOM_LOGO,
  favicon: FOM_LOGO,
  email: "info@thefriendsofmewar.org",
  phone: null,
  whatsapp: null,
  address: "Udaipur, Rajasthan, India",
  facebook: "https://www.facebook.com/FriendsofMewar/",
  instagram: "https://www.instagram.com/thefriendsofmewar",
  linkedin: "https://www.linkedin.com/company/friends-of-mewar/",
  twitter: null,
  metaTitle: "The Friends of Mewar | Join Us in Making a Difference",
  metaDescription:
    "Born from the values of the House of Mewar, we advance healthcare, women's empowerment & education, and cultural preservation. Join us in making a difference.",
  metaKeywords: "ngo, donation, mewar, udaipur, healthcare, education, heritage, 80g",
  ogImage: FOM_LOGO,
  canonicalUrl: null,
  copyrightText: `© ${new Date().getFullYear()} The Friends of Mewar. All Rights Reserved.`,
};

/** Fetch website settings (server-side). Falls back to defaults on failure. */
export async function getSettings(): Promise<SiteSettings> {
  const data = await serverFetch<SiteSettings>("/settings", { revalidate: 60 });
  return data ?? SETTINGS_FALLBACK;
}
