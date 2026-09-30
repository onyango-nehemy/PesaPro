"use client";

import { MapPin } from "lucide-react";
import { COUNTRIES, type AddressDetails } from "@/data/kyc";
import { validateAddressDetails } from "@/lib/validateKyc";
import FileUploadField from "@/components/kyc/FileUploadField";

interface AddressStepProps {
  data: AddressDetails;
  onChange: <K extends keyof AddressDetails>(
    field: K,
    value: AddressDetails[K]
  ) => void;
  onFileUploaded: (fileName: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function AddressStep({
  data,
  onChange,
  onFileUploaded,
  onBack,
  onContinue,
}: AddressStepProps) {
  const errors = validateAddressDetails(data);
  const isValid = errors.length === 0;

  function handleProofSelected(file: File) {
    onChange("proofFile", file);
    onFileUploaded(file.name);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
          <MapPin size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Address Verification
          </p>
          <p className="text-xs text-gray-500">
            Confirm your residential address
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm text-gray-700">Street Address</label>
        <input
          type="text"
          value={data.street}
          onChange={(e) => onChange("street", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Postal Code</label>
          <input
            type="text"
            value={data.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-700">Country</label>
        <select
          value={data.country}
          onChange={(e) => onChange("country", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
        >
          <option value="">Select a country</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="text-xs text-gray-500">
          Upload a recent utility bill, bank statement, or government
          document (last 3 months)
        </label>
        <div className="mt-1">
          <FileUploadField
            label="Proof of Address"
            file={data.proofFile}
            onFileSelected={handleProofSelected}
          />
        </div>
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
          className="flex-1 rounded-lg bg-green-900 cursor-pointer py-2.5 text-sm font-medium text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}