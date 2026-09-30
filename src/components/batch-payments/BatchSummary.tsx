import type { Batch } from "@/data/batch-payments";

interface BatchSummaryProps {
  batches: Batch[];
}

export default function BatchSummary({ batches }: BatchSummaryProps) {
  const totalBatches = batches.length;
  const recipientsPaid = batches.reduce((sum, b) => sum + b.processed, 0);

  const totalAmount = batches.reduce((sum, b) => sum + b.totalAmount, 0);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(totalAmount);

  const cards = [
    {
      label: "Total Batches",
      value: String(totalBatches),
      caption: "All-time processed",
    },
    {
      label: "Recipients Paid",
      value: String(recipientsPaid),
      caption: "Total payments sent",
    },
    {
      label: "Total Amount",
      value: formattedTotal,
      caption: "Across all batches",
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