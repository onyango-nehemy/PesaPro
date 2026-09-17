"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Jar } from "@/data/jars";

interface JarModalProps {
  mode: "add" | "edit";
  jar: Jar | null;
  onClose: () => void;
  onSubmit: (data: Omit<Jar, "id" | "color">) => void;
}

export default function JarModal({ mode, jar, onClose, onSubmit }: JarModalProps) {
  const [formData, setFormData] = useState({
    name: jar?.name ?? "",
    goal: jar?.goal ?? 0,
    currency: jar?.currency ?? "USD",
    saved: jar?.saved ?? 0,
  });

  function handleChange<K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {mode === "add" ? "Create New Jar" : "Edit Jar"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {mode === "add"
                ? "Set up a new savings goal or budget category"
                : "Update this jar's details"}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Jar Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Emergency Fund, Vacation"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Goal Amount</label>
            <input
              type="number"
              required
              min="0"
              value={formData.goal}
              onChange={(e) => handleChange("goal", Number(e.target.value))}
              placeholder="5000"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) =>
                handleChange("currency", e.target.value as Jar["currency"])
              }
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer"
          >
            {mode === "add" ? "Create Jar" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}