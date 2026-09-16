"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Recipient } from "@/data/recipients";

interface RecipientModalProps {
  mode: "add" | "edit";
  recipient: Recipient | null; 
  onClose: () => void;
  onSubmit: (data: Omit<Recipient, "id">) => void;
}

export default function RecipientModal({
  mode,
  recipient,
  onClose,
  onSubmit,
}: RecipientModalProps) {
  const [formData, setFormData] = useState({
    name: recipient?.name ?? "",
    email: recipient?.email ?? "",
    account: recipient?.account ?? "",
    country: recipient?.country ?? "",
  });

  function handleChange(field: keyof typeof formData, value: string) {
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
              {mode === "add" ? "Add New Recipient" : "Edit Recipient"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {mode === "add"
                ? "Add a new recipient to send money to"
                : "Update this recipient's details"}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Account Number / IBAN</label>
            <input
              type="text"
              required
              value={formData.account}
              onChange={(e) => handleChange("account", e.target.value)}
              placeholder="DE89 3704 0044 0532 0130 00"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Country</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Germany"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer"
          >
            {mode === "add" ? "Add Recipient" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}