"use client";

import { X } from "lucide-react";
import type { Recipient } from "@/data/recipients";

interface ViewRecipientModalProps {
  recipient: Recipient;
  onClose: () => void;
}

export default function ViewRecipientModal({
  recipient,
  onClose,
}: ViewRecipientModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-base font-semibold text-gray-900">Recipient Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-400">Full Name</p>
            <p className="text-gray-900">{recipient.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Country</p>
            <p className="text-gray-900">{recipient.country}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-gray-900">{recipient.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Account Number / IBAN</p>
            <p className="text-gray-900">{recipient.account}</p>
          </div>
        </div>
      </div>
    </div>
  );
}