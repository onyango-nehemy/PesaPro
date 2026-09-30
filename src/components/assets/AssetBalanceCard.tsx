import { ArrowUpRight } from "lucide-react";
import type { Asset, AssetCurrency } from "@/data/assets";

interface AssetBalanceCardProps {
  asset: Asset;
  onWithdraw: (asset: Asset) => void;
}

function formatMoney(
  amount: number,
  currency: AssetCurrency,
  showCents: boolean
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function AssetBalanceCard({
  asset,
  onWithdraw,
}: AssetBalanceCardProps) {
  const yearlyReturn = (asset.balance * asset.apy) / 100;
  const monthlyReturn = yearlyReturn / 12;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {asset.currency}
        </span>
        <span className="rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
          {asset.apy.toFixed(2)}% APY
        </span>
      </div>

      <p className="mt-4 text-3xl font-semibold text-gray-900">
        {formatMoney(asset.balance, asset.currency, false)}
      </p>
      <p className="mt-1 text-sm text-gray-500">Current balance in Assets</p>

      <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Interest earned</span>
          <span className="font-medium text-green-600">
            +{formatMoney(asset.interestEarned, asset.currency, true)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Est. monthly return</span>
          <span className="font-medium text-gray-900">
            {formatMoney(monthlyReturn, asset.currency, true)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Est. yearly return</span>
          <span className="font-medium text-gray-900">
            {formatMoney(yearlyReturn, asset.currency, true)}
          </span>
        </div>
      </div>

      <button
        onClick={() => onWithdraw(asset)}
        className="mt-5 flex w-full items-center cursor-pointer justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-green-900 hover:text-white"
      >
        <ArrowUpRight size={14} /> Withdraw
      </button>
    </div>
  );
}