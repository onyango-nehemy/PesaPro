"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Jar } from "@/data/jars";

interface AddMoneyModalProps {
  jar: Jar;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export default function AddMoneyModal({ jar, onClose, onSubmit }: AddMoneyModalProps) {
  const [amount, setAmount] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (amount <= 0) return;
    onSubmit(amount);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Add Money</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add funds to <span className="font-medium text-gray-700">{jar.name}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Amount ({jar.currency})</label>
            <input
              type="number"
              required
              min="1"
              step="0.01"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="100"
              autoFocus
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={amount <= 0}
            className="w-full rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-green-600 disabled:cursor-not-allowed cursor-pointer"
          >
            Add Money
          </button>
        </form>
      </div>
    </div>
  );
}