"use client";

import { FileText } from "lucide-react";
import { type IdentityDetails, type DocumentType } from "@/data/kyc";
import { validateIdentityDetails } from "@/lib/validateKyc";
import FileUploadField from "@/components/kyc/FileUploadField";

interface IdentityStepProps {
  data: IdentityDetails;
  onChange: <K extends keyof IdentityDetails>(
    field: K,
    value: IdentityDetails[K]
  ) => void;
  onFileUploaded: (fileName: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const DOCUMENT_TYPES: DocumentType[] = [
  "Passport",
  "National ID",
  "Driver's License",
];

export default function IdentityStep({
  data,
  onChange,
  onFileUploaded,
  onBack,
  onContinue,
}: IdentityStepProps) {
  const errors = validateIdentityDetails(data);
  const isValid = errors.length === 0;

  function handleFrontSelected(file: File) {
    onChange("frontFile", file);
    onFileUploaded(file.name);
  }

  function handleBackSelected(file: File) {
    onChange("backFile", file);
    onFileUploaded(file.name);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
          <FileText size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Identity Verification
          </p>
          <p className="text-xs text-gray-500">
            Upload your government-issued ID
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm text-gray-700">Document Type</label>
        <select
          value={data.documentType}
          onChange={(e) =>
            onChange("documentType", e.target.value as DocumentType)
          }
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
        >
          {DOCUMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">Document Number</label>
          <input
            type="text"
            value={data.documentNumber}
            onChange={(e) => onChange("documentNumber", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Expiry Date</label>
          <input
            type="date"
            value={data.expiryDate}
            onChange={(e) => onChange("expiryDate", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
      </div>

      <div className="mt-4">
        <FileUploadField
          label="Front of Document"
          file={data.frontFile}
          onFileSelected={handleFrontSelected}
        />
      </div>

      <div className="mt-4">
        <FileUploadField
          label="Back of Document"
          file={data.backFile}
          onFileSelected={handleBackSelected}
        />
      </div>

      {errors.length > 0 && (
        <ul className="mt-4 space-y-0.5 rounded-lg bg-gray-50 p-3">
          {errors.map((err) => (
            <li key={err} className="text-xs text-gray-500">
              • {err}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border cursor-pointer border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!isValid}
          className="flex-1 rounded-lg cursor-pointer bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}