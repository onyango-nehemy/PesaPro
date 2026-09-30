import { X } from "lucide-react";
import type { ParsedBatch } from "@/lib/parseBatchCsv";

interface BatchPreviewModalProps {
  fileName: string;
  batch: ParsedBatch;
  onCancel: () => void;
  onConfirm: () => void;
}

const PREVIEW_ROW_LIMIT = 50;

export default function BatchPreviewModal({
  fileName,
  batch,
  onCancel,
  onConfirm,
}: BatchPreviewModalProps) {
  const visibleRows = batch.rows.slice(0, PREVIEW_ROW_LIMIT);
  const hiddenCount = batch.rows.length - visibleRows.length;

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: batch.currency,
  }).format(batch.totalAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Review Batch
            </h2>
            <p className="mt-1 text-sm text-gray-500">{fileName}</p>
          </div>
          <button
            onClick={onCancel}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 text-sm">
          <div>
            <p className="text-gray-400">Recipients</p>
            <p className="mt-0.5 font-medium text-gray-900">
              {batch.rows.length}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Total Amount</p>
            <p className="mt-0.5 font-medium text-gray-900">
              {formattedTotal}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Currency</p>
            <p className="mt-0.5 font-medium text-gray-900">
              {batch.currency}
            </p>
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleRows.map((row, index) => (
                <tr key={`${row.email}-${index}`}>
                  <td className="px-4 py-2 text-gray-900">{row.name}</td>
                  <td className="px-4 py-2 text-gray-500">{row.email}</td>
                  <td className="px-4 py-2 text-right text-gray-900">
                    {row.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {hiddenCount > 0 && (
            <p className="border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
              ...and {hiddenCount} more recipient{hiddenCount === 1 ? "" : "s"}
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-green-500 py-2.5 text-sm font-medium text-white hover:bg-green-600"
          >
            Confirm & Process
          </button>
        </div>
      </div>
    </div>
  );
}