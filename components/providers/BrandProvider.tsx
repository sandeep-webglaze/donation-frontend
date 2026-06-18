"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/lib/store/settings";

/**
 * Applies live website settings to the document:
 *  - syncs the brand color into the `--primary` / `--ring` CSS variables so
 *    changes from the admin panel are reflected instantly across the whole UI.
 * Mount once near the root (inside ThemeProvider).
 */
export function BrandProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = useSettingsStore((s) => s.primaryColor);

  useEffect(() => {
    const root = document.documentElement;
    if (primaryColor) {
      root.style.setProperty("--primary", primaryColor);
      root.style.setProperty("--ring", primaryColor);
    }
  }, [primaryColor]);

  return <>{children}</>;
}
