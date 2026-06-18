/**
 * Registry of the site's pages + their editable sections.
 * Drives the admin "Pages" manager: each page lists its sections, and each
 * section exposes editable content fields + (optional) media + SEO.
 */

export type ContentField = "title" | "subtitle" | "body";
export type MediaKind = "single-image" | "images" | "video" | "media" | null;

export interface SectionDef {
  key: string;
  label: string;
  fields: ContentField[];
  media?: MediaKind;
  hint?: string;
}

export interface PageDef {
  key: string; // pageKey (matches SEO Manager + content + gallery)
  label: string;
  path: string;
  sections: SectionDef[];
}

export const SITE_PAGES: PageDef[] = [
  {
    key: "home",
    label: "Home",
    path: "/",
    sections: [
      { key: "hero", label: "Hero", fields: ["title", "subtitle", "body"], media: "media", hint: "Big top banner. Add 1 image + 1 video." },
      { key: "about", label: "About preview", fields: ["title", "body"], media: "images", hint: "About section under Causes." },
      { key: "donate", label: "Donate banner", fields: ["title", "subtitle"] },
      { key: "newsletter", label: "Newsletter", fields: ["title", "subtitle"] },
    ],
  },
  {
    key: "about",
    label: "About Us",
    path: "/about-us",
    sections: [
      { key: "intro", label: "Intro", fields: ["title", "body"] },
      { key: "mission", label: "Our Mission", fields: ["title", "body"] },
      { key: "vision", label: "Our Vision", fields: ["title", "body"] },
      { key: "founder", label: "Founder", fields: ["title", "body"], media: "single-image" },
      { key: "gallery", label: "Gallery", fields: [], media: "images", hint: "Photos shown on the About page." },
    ],
  },
];

export const getPageDef = (key: string) => SITE_PAGES.find((p) => p.key === key);
