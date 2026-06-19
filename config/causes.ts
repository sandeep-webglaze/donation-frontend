import { HeartPulse, GraduationCap, Landmark, type LucideIcon } from "lucide-react";

/**
 * The 3 core causes. Single source for: home cards, header dropdown, and the
 * modern cause detail pages (/causes/<slug>). Content & images are admin-editable
 * via Pages → (each cause) → Content / Gallery (pageKey = slug).
 */
export interface CauseDef {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  tint: string; // gradient tint class
}

export const CAUSES: CauseDef[] = [
  {
    slug: "provide-preventive-healthcare",
    title: "Provide Preventive Healthcare",
    blurb:
      "Support our mission to bring preventive healthcare, screenings and awareness to underserved communities across Mewar.",
    icon: HeartPulse,
    tint: "from-rose-500/15",
  },
  {
    slug: "promote-womens-empowerment-and-education",
    title: "Promote Women's Empowerment & Education",
    blurb:
      "Open doors to world-class education and skills for women and students from low-income families in Udaipur and beyond.",
    icon: GraduationCap,
    tint: "from-violet-500/15",
  },
  {
    slug: "preserve-cultural-heritage",
    title: "Preserve Cultural Heritage",
    blurb:
      "Help carry forward a living legacy of art, architecture and traditions that date back to 734 AD.",
    icon: Landmark,
    tint: "from-amber-500/15",
  },
];

export const getCause = (slug: string) => CAUSES.find((c) => c.slug === slug);
