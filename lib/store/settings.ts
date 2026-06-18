import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Brand color presets (HSL triplets used by the --primary CSS variable) ───

export const COLOR_PRESETS = [
  { label: "Indigo", value: "235 89% 64%" },
  { label: "Blue", value: "221 83% 53%" },
  { label: "Emerald", value: "160 84% 39%" },
  { label: "Violet", value: "262 83% 58%" },
  { label: "Rose", value: "346 77% 49%" },
  { label: "Orange", value: "24 95% 53%" },
] as const;

// ─── Site settings shape ─────────────────────────────────────────────────────

export interface SiteSettings {
  // Identity
  siteName: string;
  tagline: string;
  description: string;
  // Appearance
  primaryColor: string; // HSL triplet, e.g. "235 89% 64%"
  defaultTheme: "light" | "dark";
  // Contact
  email: string;
  phone: string;
  address: string;
  // Social links
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  // Toggles
  maintenanceMode: boolean;
  showStats: boolean;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "NextStack",
  tagline: "Build faster, ship sooner",
  description:
    "A production-ready Next.js 14 boilerplate with Tailwind, Shadcn UI, Zustand and a reusable API layer — everything you need to ship beautiful apps fast.",
  primaryColor: "235 89% 64%",
  defaultTheme: "light",
  email: "hello@example.com",
  phone: "+91 00000 00000",
  address: "Udaipur, Rajasthan, India",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  maintenanceMode: false,
  showStats: true,
};

interface SettingsState extends SiteSettings {
  updateSettings: (patch: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

/**
 * Global, persisted website-settings store.
 * Edited from the admin panel (/admin/settings → Website tab) and read by
 * the public site (Navbar, Footer, Hero, BrandProvider).
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: (patch) => set((state) => ({ ...state, ...patch })),
      resetSettings: () => set({ ...DEFAULT_SETTINGS }),
    }),
    {
      name: "site-settings",
    }
  )
);
