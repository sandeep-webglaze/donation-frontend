/**
 * Registry of the site's pages + their editable sections.
 * Drives the admin "Pages" manager: each page lists its sections, and each
 * section exposes editable content fields + (optional) media + SEO.
 */

import { CAUSES } from "./causes";

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
      { key: "causes", label: "Our Causes (cards)", fields: [], media: "images", hint: "Up to 3 images — one per cause card, in shown order." },
      { key: "campaign", label: "Featured Campaign", fields: ["title", "body"], media: "images", hint: "Add 2 images: 1st = left card, 2nd = right circular." },
      { key: "quote", label: "Quote", fields: ["subtitle", "body"], media: "single-image", hint: "Quote text (Body) + author name (Subtitle) + optional author photo." },
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
  // One editable page per cause (pageKey = slug). Drives /causes/<slug>.
  ...CAUSES.map((c): PageDef => ({
    key: c.slug,
    label: c.title,
    path: `/causes/${c.slug}`,
    sections: [
      { key: "hero", label: "Hero (banner + title)", fields: ["title", "subtitle"], media: "single-image", hint: "Banner image with title overlay." },
      { key: "intro", label: "Intro / Overview", fields: ["title", "body"], hint: "Opening paragraph for this cause." },
      { key: "projects", label: "Projects & Stories", fields: [], media: "media", hint: "Photos/videos. Add a caption to each as the story title." },
    ],
  })),
  {
    key: "contact",
    label: "Contact Us",
    path: "/contact",
    sections: [
      { key: "intro", label: "Heading & text", fields: ["title", "subtitle"], hint: "Title + short line for the contact section." },
      { key: "hero", label: "Side image / video", fields: [], media: "media", hint: "Background image + optional intro video (shown on the right)." },
    ],
  },
  {
    key: "gallery",
    label: "Gallery / Media",
    path: "/gallery",
    sections: [
      { key: "intro", label: "Intro (heading & text)", fields: ["title", "subtitle"], hint: "Top heading + description for the Media page." },
      { key: "health", label: "Health Camps", fields: [], media: "media", hint: "Photos & videos — Healthcare." },
      { key: "education", label: "Education", fields: [], media: "media", hint: "Photos & videos — Education." },
      { key: "women", label: "Women's Programs", fields: [], media: "media", hint: "Photos & videos — Women's empowerment." },
      { key: "heritage", label: "Heritage", fields: [], media: "media", hint: "Photos & videos — Cultural heritage." },
      { key: "culture", label: "Cultural Events", fields: [], media: "media", hint: "Photos & videos — Festivals & culture." },
      { key: "events", label: "Community Events", fields: [], media: "media", hint: "Photos & videos — Community events." },
    ],
  },
];

/** Category sections of the public Gallery/Media page (key → label), in display order. */
export const GALLERY_CATEGORIES: { key: string; label: string }[] = [
  { key: "health", label: "Health Camps" },
  { key: "education", label: "Education" },
  { key: "women", label: "Women's Programs" },
  { key: "heritage", label: "Heritage" },
  { key: "culture", label: "Cultural Events" },
  { key: "events", label: "Community Events" },
];

export const getPageDef = (key: string) => SITE_PAGES.find((p) => p.key === key);
