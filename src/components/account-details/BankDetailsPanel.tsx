"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { BankDetails } from "@/data/accountDetails";

interface BankDetailsPanelProps {
  bankDetails: BankDetails;
}

export default function BankDetailsPanel({ bankDetails }: BankDetailsPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!bankDetails.swiftBic) return;

    try {
      await navigator.clipboard.writeText(bankDetails.swiftBic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="mb-2 text-sm font-medium text-gray-700">Bank Details</h3>

      <div className="space-y-4 rounded-lg bg-gray-50 px-4 py-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Bank Name</span>
          <span className="text-sm text-gray-900">{bankDetails.bankName}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Bank Address</span>
          <span className="text-sm text-gray-900">{bankDetails.bankAddress}</span>
        </div>

        {bankDetails.swiftBic && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">SWIFT/BIC</span>
              <span className="text-sm text-gray-900">{bankDetails.swiftBic}</span>
            </div>

            {bankDetails.swiftBicCopyable && (
              <button
                onClick={handleCopy}
                className="text-gray-400 transition-colors cursor-pointer hover:text-gray-600"
                aria-label="Copy SWIFT/BIC"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}