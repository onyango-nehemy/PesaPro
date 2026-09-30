"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Asset, AssetCurrency } from "@/data/assets";

interface AddToAssetsModalProps {
  assets: Asset[];
  availableBalances: Record<AssetCurrency, number>;
  onClose: () => void;
  onSubmit: (currency: AssetCurrency, amount: number) => void;
}

function formatMoney(amount: number, currency: AssetCurrency): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export default function AddToAssetsModal({
  assets,
  availableBalances,
  onClose,
  onSubmit,
}: AddToAssetsModalProps) {
  const [currency, setCurrency] = useState<AssetCurrency>(
    assets[0]?.currency ?? "USD"
  );
  const [amount, setAmount] = useState(0);

  const selectedAsset = assets.find((a) => a.currency === currency);
  const apy = selectedAsset?.apy ?? 0;
  const available = availableBalances[currency];
  const estimatedYearly = (amount * apy) / 100;
  const exceedsAvailable = amount > available;
  const isValid = amount > 0 && !exceedsAvailable;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(currency, amount);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Add Money to Assets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Start earning interest on your balance
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
            <label className="text-sm text-gray-700">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as AssetCurrency)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
            >
              {assets.map((a) => (
                <option key={a.currency} value={a.currency}>
                  {a.currency} - Available:{" "}
                  {formatMoney(availableBalances[a.currency], a.currency)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700">Amount</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="1000"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
            />
            {exceedsAvailable && (
              <p className="mt-1 text-xs text-red-600">
                Amount exceeds your available balance
              </p>
            )}
          </div>

          <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Current APY</span>
              <span className="font-medium text-green-600">
                {apy.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Estimated yearly return</span>
              <span className="font-medium text-gray-900">
                {formatMoney(estimatedYearly, currency)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="flex-1 rounded-lg bg-green-900 py-2.5 text-sm font-medium text-white hover:bg-green-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to Assets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}