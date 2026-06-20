import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { getSettings } from "@/lib/api/settings";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";
import { posterFor } from "@/lib/media";
import { ContactForm } from "@/components/site/ContactForm";
import { PlayVideoButton } from "@/components/site/PlayVideoButton";

/** Reusable Contact panel (used on /contact and the home page). */
export async function ContactSection() {
  const [settings, media, content] = await Promise.all([
    getSettings(),
    getGallery("contact", "hero"),
    getPageContent("contact"),
  ]);
  const c = content.intro;
  const img = media.find((m) => m.type === "image")?.url || null;
  const videoItem = media.find((m) => m.type === "video") || null;
  const videoPoster = videoItem ? posterFor(videoItem) : null;
  const sideImg = img || videoPoster;

  const title = c?.title || "We’d love to hear from you";
  const subtitle =
    c?.subtitle ||
    "Questions, partnerships or volunteering — send us a message and our team will get back to you.";

  return (
    <section className="container py-16 md:py-20">
      <div className="on-dark relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#6d1f26_0%,#a32f37_55%,#d44b55_100%)] text-white shadow-2xl">
        {/* Right image with brand overlay */}
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          {sideImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sideImg} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_70%_40%,rgba(253,220,53,0.18),transparent_60%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#6d1f26_0%,rgba(109,31,38,0.7)_35%,transparent_100%)]" />
        </div>

        {/* Play button over the image */}
        {videoItem && (
          <div className="absolute right-[12%] top-1/2 z-10 hidden -translate-y-1/2 lg:block">
            <PlayVideoButton url={videoItem.url} />
          </div>
        )}

        <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:p-16">
          {/* Left — copy + form */}
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary">
              <Heart className="h-4 w-4 fill-secondary" /> Contact Us
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-4 max-w-md text-white/85">{subtitle}</p>

            <div className="mt-8">
              <ContactForm />
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-secondary" /> {settings.email}
                </a>
              )}
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-secondary" /> {settings.phone}
                </a>
              )}
              {settings.address && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" /> {settings.address}
                </span>
              )}
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
