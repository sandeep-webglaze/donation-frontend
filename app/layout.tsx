import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BrandProvider } from "@/components/providers/BrandProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { getSettings } from "@/lib/api/settings";
import { SITE_URL } from "@/lib/api/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700", "800"],
});

/** Site-wide default metadata, driven by the Settings API. */
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const name = s.siteName || "Our Foundation";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: s.metaTitle || name,
      template: `%s | ${name}`,
    },
    description:
      s.metaDescription || `${name} — support our mission and make an impact.`,
    keywords: s.metaKeywords
      ? s.metaKeywords.split(",").map((k) => k.trim())
      : undefined,
    icons: s.favicon ? { icon: s.favicon } : undefined,
    openGraph: {
      siteName: name,
      images: s.ogImage ? [{ url: s.ogImage }] : undefined,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          themes={["light", "dark"]}
          disableTransitionOnChange
        >
          <BrandProvider>
            <QueryProvider>
              {children}
              <Toaster richColors position="top-right" />
            </QueryProvider>
          </BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
