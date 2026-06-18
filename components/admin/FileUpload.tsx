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
}

/** Reusable "upload from your computer" button → returns a public URL. */
export function FileUpload({
  onUploaded,
  accept = "image/*,video/*",
  label = "Upload file",
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const r = await uploadFile(file);
      onUploaded(r.url, r.type);
      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed — make sure you're signed in as admin.");
    } finally {
      setLoading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handle} />
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
