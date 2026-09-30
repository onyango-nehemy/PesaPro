import type { ScheduledTransfer } from "@/data/scheduled-transfers";

interface CancelTransferDialogProps {
  transfer: ScheduledTransfer;
  onKeep: () => void;
  onConfirm: () => void;
}

export default function CancelTransferDialog({
  transfer,
  onKeep,
  onConfirm,
}: CancelTransferDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 className="text-base font-semibold text-gray-900">
          Cancel Transfer
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to cancel{" "}
          <span className="font-medium text-gray-700">{transfer.name}</span>?
          It will stop running and can&apos;t be restored.
        </p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onKeep}
            className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Keep transfer
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Cancel transfer
          </button>
        </div>
      </div>
    </div>
  );
}