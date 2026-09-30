import type { Asset } from "@/data/assets";

interface AssetsSummaryProps {
  assets: Asset[];
}

export default function AssetsSummary({ assets }: AssetsSummaryProps) {
  const totalBalance = assets.reduce((sum, a) => sum + a.balance, 0);
  const totalEarned = assets.reduce((sum, a) => sum + a.interestEarned, 0);
  const weightedTotal = assets.reduce((sum, a) => sum + a.balance * a.apy, 0);
  const averageApy = totalBalance > 0 ? weightedTotal / totalBalance : 0;

  
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(totalBalance);

  const formattedEarned = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalEarned);

  const cards = [
    {
      label: "Total in Assets",
      value: formattedTotal,
      caption: "Across all currencies",
      valueClass: "text-gray-900",
    },
    {
      label: "Total Earned",
      value: formattedEarned,
      caption: "All-time interest earned",
      valueClass: "text-green-600",
    },
    {
      label: "Average APY",
      value: `${averageApy.toFixed(2)}%`,
      caption: "Weighted average",
      valueClass: "text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-200 bg-white p-6"
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className={`mt-2 text-3xl font-semibold ${card.valueClass}`}>
            {card.value}
          </p>
          <p className="mt-6 text-xs text-gray-400">{card.caption}</p>
        </div>
      ))}
    </div>
  );
}