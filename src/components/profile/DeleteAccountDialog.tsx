"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";

interface DeleteAccountDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountDialog({
  onCancel,
  onConfirm,
}: DeleteAccountDialogProps) {
  const [confirmationText, setConfirmationText] = useState("");
  const isConfirmed = confirmationText === "DELETE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
            <TriangleAlert size={18} className="text-red-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-900">
            Delete Account
          </h2>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          This will permanently delete your account and all associated data.
          This action cannot be undone.
        </p>

        <label className="mt-4 block text-sm text-gray-700">
          Type <span className="font-semibold text-red-600">DELETE</span> to
          confirm
        </label>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder="DELETE"
          autoFocus
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-red-300"
        />

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg cursor-pointer border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!isConfirmed}
            className="flex-1 rounded-lg cursor-pointer bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}