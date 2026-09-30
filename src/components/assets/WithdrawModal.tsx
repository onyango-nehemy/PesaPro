"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Asset, AssetCurrency } from "@/data/assets";

interface WithdrawModalProps {
  asset: Asset;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

function formatMoney(amount: number, currency: AssetCurrency): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export default function WithdrawModal({
  asset,
  onClose,
  onSubmit,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState(0);

  const exceedsBalance = amount > asset.balance;
  const isValid = amount > 0 && !exceedsBalance;
  const balanceAfter = Math.max(asset.balance - amount, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(amount);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Withdraw from Assets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Move money from your {asset.currency} assets back to your wallet
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
            <label className="text-sm text-gray-700">Amount ({asset.currency})</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="500"
              autoFocus
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
            {exceedsBalance && (
              <p className="mt-1 text-xs text-red-600">
                Amount exceeds your balance in Assets
              </p>
            )}
          </div>

          <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Current balance in Assets</span>
              <span className="font-medium text-gray-900">
                {formatMoney(asset.balance, asset.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Balance after withdrawal</span>
              <span className="font-medium text-gray-900">
                {formatMoney(balanceAfter, asset.currency)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border cursor-pointer border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="flex-1 rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-green-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}