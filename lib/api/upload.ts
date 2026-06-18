import { getToken } from "./auth";

export interface UploadResult {
  url: string;
  filename: string;
  type: "image" | "video";
  size: number;
}

/** Upload a file to the backend → returns a public URL. Admin auth required. */
export async function uploadFile(file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);
  const base = process.env.NEXT_PUBLIC_API_URL || "/api";
  const token = getToken();

  const res = await fetch(`${base}/media/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  return json.data as UploadResult;
}
