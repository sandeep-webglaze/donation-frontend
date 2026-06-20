import type { Metadata } from "next";
import { ContactSection } from "@/components/site/ContactSection";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageKey: "contact", title: "Contact Us", path: "/contact" });
}

export default function ContactPage() {
  return <ContactSection />;
}
