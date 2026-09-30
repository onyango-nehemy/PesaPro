"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  assetsData,
  availableBalancesData,
  type Asset,
  type AssetCurrency,
} from "@/data/assets";
import AssetsSummary from "@/components/assets/AssetsSummary";
import RiskBanner from "@/components/assets/RiskBanner";
import AssetBalanceCard from "@/components/assets/AssetBalanceCard";
import HowAssetsWorks from "@/components/assets/HowAssetsWork";
import AddToAssetsModal from "@/components/assets/AddToAssetsModal";
import WithdrawModal from "@/components/assets/WithdrawModal";

type ModalState =
  | { type: "closed" }
  | { type: "add" }
  | { type: "withdraw"; asset: Asset };

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(assetsData);
  const [availableBalances, setAvailableBalances] =
    useState<Record<AssetCurrency, number>>(availableBalancesData);
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });

  function handleAddSubmit(currency: AssetCurrency, amount: number) {
    setAssets((prev) =>
      prev.map((a) =>
        a.currency === currency
          ? { ...a, balance: round2(a.balance + amount) }
          : a
      )
    );
    setAvailableBalances((prev) => ({
      ...prev,
      [currency]: round2(prev[currency] - amount),
    }));
    setModalState({ type: "closed" });
  }

  function handleWithdrawSubmit(amount: number) {
    if (modalState.type !== "withdraw") return;
    const currency = modalState.asset.currency;

    setAssets((prev) =>
      prev.map((a) =>
        a.currency === currency
          ? { ...a, balance: round2(a.balance - amount) }
          : a
      )
    );
    setAvailableBalances((prev) => ({
      ...prev,
      [currency]: round2(prev[currency] + amount),
    }));
    setModalState({ type: "closed" });
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="mt-1 text-sm text-gray-500">
            Earn interest on your balances with Wise Assets
          </p>
        </div>
        <button
          onClick={() => setModalState({ type: "add" })}
          className="flex items-center gap-2 rounded-lg bg-green-900 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          <TrendingUp size={16} /> Add to Assets
        </button>
      </div>

      <div className="mt-6">
        <AssetsSummary assets={assets} />
      </div>

      <div className="mt-6">
        <RiskBanner />
      </div>

      <h2 className="mt-6 text-sm font-medium text-gray-900">
        Your Asset Balances
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <AssetBalanceCard
            key={asset.currency}
            asset={asset}
            onWithdraw={(a) => setModalState({ type: "withdraw", asset: a })}
          />
        ))}
      </div>

      <div className="mt-6">
        <HowAssetsWorks />
      </div>

      {modalState.type === "add" && (
        <AddToAssetsModal
          assets={assets}
          availableBalances={availableBalances}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleAddSubmit}
        />
      )}

      {modalState.type === "withdraw" && (
        <WithdrawModal
          asset={modalState.asset}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleWithdrawSubmit}
        />
      )}
    </div>
  );
}