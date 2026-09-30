"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  scheduledTransfersData,
  type ScheduledTransfer,
  type TransferStatus,
} from "@/data/scheduled-transfers";
import TransfersSummary from "@/components/scheduled-transfers/TransfersSummary";
import TransferRow from "@/components/scheduled-transfers/TransferRow";
import FlexibleSchedulingBanner from "@/components/scheduled-transfers/FlexibleSchedulingBanner";
import TransferModal, {
  type TransferFormData,
} from "@/components/scheduled-transfers/TransferModal";
import ViewTransferModal from "@/components/scheduled-transfers/ViewTransferModal";
import CancelTransferDialog from "@/components/scheduled-transfers/CancelTransferDialog";

type ModalState =
  | { type: "closed" }
  | { type: "schedule" }
  | { type: "edit"; transfer: ScheduledTransfer }
  | { type: "view"; transfer: ScheduledTransfer }
  | { type: "cancel"; transfer: ScheduledTransfer };

export default function ScheduledTransfersPage() {
  const [transfers, setTransfers] =
    useState<ScheduledTransfer[]>(scheduledTransfersData);
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });

  function handleScheduleSubmit(data: TransferFormData) {
    const newTransfer: ScheduledTransfer = {
      id: crypto.randomUUID(),
      status: "Active",
      nextDate: data.startDate,
      ...data,
    };
    setTransfers((prev) => [...prev, newTransfer]);
    setModalState({ type: "closed" });
  }

  function handleEditSubmit(data: TransferFormData) {
    if (modalState.type !== "edit") return;
    const targetId = modalState.transfer.id;

    setTransfers((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? {
              ...t,
              name: data.name,
              amount: data.amount,
              currency: data.currency,
              frequency: data.frequency,
            }
          : t
      )
    );
    setModalState({ type: "closed" });
  }

  function handleTogglePause(transfer: ScheduledTransfer) {
    const nextStatus: TransferStatus =
      transfer.status === "Active" ? "Paused" : "Active";

    setTransfers((prev) =>
      prev.map((t) => (t.id === transfer.id ? { ...t, status: nextStatus } : t))
    );
  }

  function handleCancelConfirm() {
    if (modalState.type !== "cancel") return;
    const idToRemove = modalState.transfer.id;

    setTransfers((prev) => prev.filter((t) => t.id !== idToRemove));
    setModalState({ type: "closed" });
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Scheduled Transfers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Set up recurring and future-dated payments
          </p>
        </div>
        <button
          onClick={() => setModalState({ type: "schedule" })}
          className="flex items-center gap-2 rounded-lg bg-green-900 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-blue-900"
        >
          <Plus size={16} /> Schedule Transfer
        </button>
      </div>

      <div className="mt-6">
        <TransfersSummary transfers={transfers} />
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-900">
          Your Scheduled Transfers
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your recurring and future payments
        </p>

        <div className="mt-4 space-y-3">
          {transfers.length > 0 ? (
            transfers.map((transfer) => (
              <TransferRow
                key={transfer.id}
                transfer={transfer}
                onTogglePause={handleTogglePause}
                onView={(t) => setModalState({ type: "view", transfer: t })}
                onEdit={(t) => setModalState({ type: "edit", transfer: t })}
                onCancelTransfer={(t) =>
                  setModalState({ type: "cancel", transfer: t })
                }
              />
            ))
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">
              No scheduled transfers yet.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <FlexibleSchedulingBanner />
      </div>

      {modalState.type === "schedule" && (
        <TransferModal
          mode="schedule"
          transfer={null}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleScheduleSubmit}
        />
      )}

      {modalState.type === "edit" && (
        <TransferModal
          key={modalState.transfer.id}
          mode="edit"
          transfer={modalState.transfer}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleEditSubmit}
        />
      )}

      {modalState.type === "view" && (
        <ViewTransferModal
          transfer={modalState.transfer}
          onClose={() => setModalState({ type: "closed" })}
        />
      )}

      {modalState.type === "cancel" && (
        <CancelTransferDialog
          transfer={modalState.transfer}
          onKeep={() => setModalState({ type: "closed" })}
          onConfirm={handleCancelConfirm}
        />
      )}
    </div>
  );
}