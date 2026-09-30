"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import { CSV_TEMPLATE } from "@/lib/parseBatchCsv";

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
}

function downloadTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "batch_payment_template.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function UploadDropzone({ onFileSelected }: UploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelected(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    e.target.value = ""; 
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          isDragging
            ? "border-green-400 bg-green-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900">
          <Upload size={18} className="text-white" />
        </div>

        <p className="mt-4 text-sm font-medium text-gray-900">
          Upload CSV File
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Drag and drop or click to browse
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload size={12} /> Choose File
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              downloadTemplate();
            }}
            className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download size={12} /> Download Template
          </button>
        </div>
      </div>
    </div>
  );
}