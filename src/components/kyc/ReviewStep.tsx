import { CheckCircle2 } from "lucide-react";
import type {
  PersonalDetails,
  IdentityDetails,
  AddressDetails,
} from "@/data/kyc";

interface ReviewStepProps {
  personalDetails: PersonalDetails;
  identityDetails: IdentityDetails;
  addressDetails: AddressDetails;
  onBack: () => void;
  onSubmit: () => void;
}

export default function ReviewStep({
  personalDetails,
  identityDetails,
  addressDetails,
  onBack,
  onSubmit,
}: ReviewStepProps) {
  const fullName = `${personalDetails.firstName} ${personalDetails.lastName}`.trim();
  const documentsUploaded = Boolean(
    identityDetails.frontFile && identityDetails.backFile
  );

  const personalRows = [
    { label: "Name", value: fullName },
    { label: "Date of Birth", value: personalDetails.dateOfBirth },
    { label: "Nationality", value: personalDetails.nationality },
  ];

  const identityRows = [
    { label: "Document Type", value: identityDetails.documentType },
    { label: "Document Number", value: identityDetails.documentNumber },
  ];

  const addressRows = [
    { label: "Street", value: addressDetails.street },
    { label: "City", value: addressDetails.city },
    { label: "Country", value: addressDetails.country },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Review Your Information
          </p>
          <p className="text-xs text-gray-500">
            Please verify all details before submitting
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Personal Details
        </p>
        <div className="mt-2 space-y-2">
          {personalRows.map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{row.label}:</span>
              <span className="text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Identity Document
        </p>
        <div className="mt-2 space-y-2">
          {identityRows.map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{row.label}:</span>
              <span className="text-gray-900">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Documents:</span>
            {documentsUploaded ? (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 size={14} /> Uploaded
              </span>
            ) : (
              <span className="text-gray-400">Missing</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Address
        </p>
        <div className="mt-2 space-y-2">
          {addressRows.map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{row.label}:</span>
              <span className="text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 cursor-pointer rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 rounded-lg bg-green-900 cursor-pointer py-2.5 text-sm font-medium text-white hover:bg-blue-900"
        >
          Submit Verification
        </button>
      </div>
    </div>
  );
}