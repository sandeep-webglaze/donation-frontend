"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/api/upload";

interface Props {
  onUploaded: (url: string, type: "image" | "video") => void;
  accept?: string;
  label?: string;
  /** Allow selecting & uploading several files at once (onUploaded fires per file). */
  multiple?: boolean;
}

/** Reusable "upload from your computer" button → returns public URL(s). */
export function FileUpload({
  onUploaded,
  accept = "image/*,video/*",
  label = "Upload file",
  multiple = false,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setLoading(true);
    let ok = 0;
    for (const file of files) {
      try {
        const r = await uploadFile(file);
        onUploaded(r.url, r.type);
        ok++;
      } catch {
        /* keep going */
      }
    }
    setLoading(false);
    if (ref.current) ref.current.value = "";
    if (ok > 0) toast.success(`Uploaded ${ok} file${ok > 1 ? "s" : ""}`);
    else toast.error("Upload failed — make sure you're signed in as admin.");
  };

  return (
    <>
      <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden" onChange={handle} />
      <Button
        type="button"
        variant="outline"
        onClick={() => ref.current?.click()}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Upload className="mr-2 h-4 w-4" />
        )}
        {label}
      </Button>
    </>
  );
}
