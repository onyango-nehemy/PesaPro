"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { COUNTRIES, type PersonalDetails } from "@/data/kyc";
import { validatePersonalDetails } from "@/lib/validateKyc";

interface PersonalDetailsStepProps {
  data: PersonalDetails;
  onChange: <K extends keyof PersonalDetails>(
    field: K,
    value: PersonalDetails[K]
  ) => void;
  onContinue: () => void;
}

export default function PersonalDetailsStep({
  data,
  onChange,
  onContinue,
}: PersonalDetailsStepProps) {
  const [touched, setTouched] = useState(false);

  const errors = validatePersonalDetails(data);
  const isValid = errors.length === 0;

  function handleFieldChange<K extends keyof PersonalDetails>(
    field: K,
    value: PersonalDetails[K]
  ) {
    setTouched(true);
    onChange(field, value);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
          <User size={16} className="text-green-900" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Personal Information
          </p>
          <p className="text-xs text-gray-500">Tell us about yourself</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Last Name</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-700">Nationality</label>
        <select
          value={data.nationality}
          onChange={(e) => handleFieldChange("nationality", e.target.value)}
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
        <label className="text-sm text-gray-700">Phone Number</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => handleFieldChange("phone", e.target.value)}
          placeholder="+1 (555) 000-0000"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
        />
      </div>

      {touched && errors.length > 0 && (
        <ul className="mt-4 space-y-0.5 rounded-lg bg-gray-50 p-3">
          {errors.map((err) => (
            <li key={err} className="text-xs text-gray-500">
              • {err}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={!isValid}
        className="mt-5 w-full rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}