"use client";

import { useRef } from "react";
import { CheckCircle2, Upload } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  file: File | null;
  onFileSelected: (file: File) => void;
}

export default function FileUploadField({
  label,
  file,
  onFileSelected,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFile = file !== null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) onFileSelected(selected);
    e.target.value = ""; 
  }

  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`mt-1 flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
          hasFile
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        {hasFile ? (
          <>
            <CheckCircle2 size={14} /> {file.name}
          </>
        ) : (
          <>
            <Upload size={14} /> {label}
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}