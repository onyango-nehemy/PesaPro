import { X } from "lucide-react";
import type { ScheduledTransfer } from "@/data/scheduled-transfers";

interface ViewTransferModalProps {
  transfer: ScheduledTransfer;
  onClose: () => void;
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ViewTransferModal({
  transfer,
  onClose,
}: ViewTransferModalProps) {
  const isActive = transfer.status === "Active";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: transfer.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(transfer.amount);

  const details = [
    { label: "Amount", value: `${formattedAmount} ${transfer.currency}` },
    { label: "Frequency", value: transfer.frequency },
    { label: "Next transfer", value: formatDate(transfer.nextDate) },
    { label: "Started", value: formatDate(transfer.startDate) },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            Transfer Details
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900">{transfer.name}</p>
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              isActive
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {transfer.status}
          </span>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          {details.map((item) => (
            <div key={item.label}>
              <p className="text-gray-400">{item.label}</p>
              <p className="text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}