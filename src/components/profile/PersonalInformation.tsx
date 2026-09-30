"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { personalInfoData, type PersonalInfo } from "@/data/profile";

export default function PersonalInfoForm() {
  const [savedInfo, setSavedInfo] = useState<PersonalInfo>(personalInfoData);
  const [formData, setFormData] = useState<PersonalInfo>(personalInfoData);
  const [showSaved, setShowSaved] = useState(false);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(savedInfo);

  function handleChange<K extends keyof PersonalInfo>(
    field: K,
    value: PersonalInfo[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    setSavedInfo(formData);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm text-gray-500">Update your personal details</p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm text-gray-700">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges}
            className="rounded-lg bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Changes
          </button>

          {showSaved && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check size={14} /> Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}