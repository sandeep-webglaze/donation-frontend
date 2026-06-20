/** Media helpers — YouTube id parsing + best-effort video thumbnails. */

export function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

/** A poster image for a media item (image → itself; video → admin thumbnail,
 *  else derived from YouTube or Cloudinary). null if none can be determined. */
export function posterFor(item: {
  type: "image" | "video";
  url: string;
  thumbnail?: string | null;
}): string | null {
  if (item.type === "image") return item.url;
  if (item.thumbnail) return item.thumbnail;

  const yt = youtubeId(item.url);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;

  // Cloudinary uploaded video → swap the extension for a generated .jpg frame.
  if (/res\.cloudinary\.com\/.+\/video\/upload\//.test(item.url)) {
    return item.url.replace(/\.(mp4|mov|webm|ogg|m4v|avi)$/i, ".jpg");
  }
  return null;
}
