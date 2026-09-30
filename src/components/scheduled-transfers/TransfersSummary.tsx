import type {
  ScheduledTransfer,
  TransferFrequency,
} from "@/data/scheduled-transfers";

interface TransfersSummaryProps {
  transfers: ScheduledTransfer[];
}


const PAYMENTS_PER_MONTH: Record<TransferFrequency, number> = {
  Weekly: 52 / 12,
  Monthly: 1,
};

export default function TransfersSummary({ transfers }: TransfersSummaryProps) {
  const activeTransfers = transfers.filter((t) => t.status === "Active");
  const pausedCount = transfers.filter((t) => t.status === "Paused").length;

  
  const monthlyTotal = activeTransfers.reduce(
    (sum, t) => sum + t.amount * PAYMENTS_PER_MONTH[t.frequency],
    0
  );

  const formattedMonthlyTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(monthlyTotal);

  const cards = [
    {
      label: "Active Transfers",
      value: String(activeTransfers.length),
      caption: "Currently scheduled",
    },
    {
      label: "Monthly Total",
      value: formattedMonthlyTotal,
      caption: "Recurring monthly payments",
    },
    {
      label: "Paused",
      value: String(pausedCount),
      caption: "Temporarily paused",
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
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {card.value}
          </p>
          <p className="mt-6 text-xs text-gray-400">{card.caption}</p>
        </div>
      ))}
    </div>
  );
}