"use client";

import type { Recipient } from "@/data/recipients";

interface DeleteRecipientDialogProps {
  recipient: Recipient;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteRecipientDialog({
  recipient,
  onCancel,
  onConfirm,
}: DeleteRecipientDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 className="text-base font-semibold text-gray-900">Delete Recipient</h2>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete <span className="font-medium text-gray-700">{recipient.name}</span>? This can&apos;t be undone.
        </p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}