"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type {
  ScheduledTransfer,
  TransferCurrency,
  TransferFrequency,
} from "@/data/scheduled-transfers";

export type TransferFormData = Pick<ScheduledTransfer, "name" | "amount" | "currency" | "frequency" | "startDate">;

interface FormState {
  name: string;
  amount: string;
  currency: TransferCurrency;
  frequency: TransferFrequency;
  startDate: string;
}

interface TransferModalProps {
  mode: "schedule" | "edit";
  transfer: ScheduledTransfer | null; 
  onClose: () => void;
  onSubmit: (data: TransferFormData) => void;
}

function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function TransferModal({
  mode,
  transfer,
  onClose,
  onSubmit,
}: TransferModalProps) {
  const [formData, setFormData] = useState<FormState>({
    name: transfer?.name ?? "",
    amount: transfer ? String(transfer.amount) : "",
    currency: transfer?.currency ?? "USD",
    frequency: transfer?.frequency ?? "Monthly",
    startDate: transfer?.startDate ?? "",
  });

  const isEdit = mode === "edit";

  function handleChange<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = formData.name.trim();
    const amount = Number(formData.amount);
    if (!name || amount <= 0) return;

    onSubmit({
      name,
      amount,
      currency: formData.currency,
      frequency: formData.frequency,
      startDate: formData.startDate,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {isEdit ? "Edit Transfer" : "Schedule a Transfer"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isEdit
                ? "Update this transfer's details"
                : "Set up a one-time or recurring payment"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Recipient Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Rent Payment, John Doe"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Amount</label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="100"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  handleChange("currency", e.target.value as TransferCurrency)
                }
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) =>
                handleChange("frequency", e.target.value as TransferFrequency)
              }
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700">Start Date</label>
            <input
              type="date"
              required
              min={isEdit ? undefined : getTodayISO()}
              disabled={isEdit}
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="mt-1 w-full cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
            />
            {isEdit && (
              <p className="mt-1 text-xs text-gray-400">
                The start date can&apos;t be changed.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg cursor-pointer border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 cursor-pointer rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
            >
              {isEdit ? "Save Changes" : "Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}