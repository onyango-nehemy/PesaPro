import { CheckCircle2, FileSpreadsheet, Loader2 } from "lucide-react";
import { getBatchStatus, type Batch } from "@/data/batch-payments";

interface BatchHistoryRowProps {
  batch: Batch;
}


function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BatchHistoryRow({ batch }: BatchHistoryRowProps) {
  const status = getBatchStatus(batch);
  const isCompleted = status === "Completed";
  const progress =
    batch.recipients > 0 ? (batch.processed / batch.recipients) * 100 : 0;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: batch.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(batch.totalAmount);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-900">
            <FileSpreadsheet size={16} className="text-white" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-gray-900">
                {batch.fileName}
              </p>

              {isCompleted ? (
                <span className="flex items-center gap-1 rounded-md bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                  <CheckCircle2 size={10} /> Completed
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                  <Loader2 size={10} className="animate-spin" /> Processing
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {batch.recipients} recipients • {formattedAmount}{" "}
              {batch.currency} • {formatDate(batch.date)}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">
            {batch.processed}/{batch.recipients}
          </p>
          <p className="text-xs text-gray-400">successful</p>
        </div>
      </div>

      {!isCompleted && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Processing... {batch.processed} of {batch.recipients}
          </p>
        </div>
      )}
    </div>
  );
}