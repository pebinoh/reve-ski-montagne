"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

export default function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/admin/content/upload",
      });
      setUrl(blob.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Échec du téléversement.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-[#ddd] bg-[#f5f5f5]">
          <Image src={url} alt={label} fill className="object-cover" />
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            className="text-sm text-[#555] file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:uppercase file:tracking-wider disabled:opacity-50"
          />
          {uploading && (
            <p className="mt-1 text-xs text-[#999]">Téléversement...</p>
          )}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
