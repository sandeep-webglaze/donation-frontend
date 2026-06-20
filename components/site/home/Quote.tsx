import { Quote as QuoteIcon } from "lucide-react";
import { getGallery } from "@/lib/api/gallery-items";
import { getPageContent } from "@/lib/api/content";

export async function Quote() {
  const [content, media] = await Promise.all([
    getPageContent("home"),
    getGallery("home", "quote"),
  ]);
  const c = content.quote;
  const authorImg = media.find((m) => m.type === "image")?.url || null;

  const text =
    c?.body ||
    "When the traditions of a people are preserved, they continue to inspire the nation — invigorating our self-reliance, self-respect and integrity.";
  const author = c?.subtitle || "Inspired by the values of the House of Mewar";

  return (
    <section className="border-y bg-muted/30">
      <div className="container py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <QuoteIcon className="mx-auto h-10 w-10 text-amber-500/70" />

          <blockquote className="mt-6 font-serif text-2xl font-medium leading-relaxed tracking-tight md:text-3xl">
            “{text}”
          </blockquote>

          {/* Author — optional photo + name */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {authorImg && (
              <span className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-amber-400/60 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={authorImg} alt={author} className="h-full w-full object-cover" />
              </span>
            )}
            <p className="text-base font-semibold text-foreground">
              {author}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
