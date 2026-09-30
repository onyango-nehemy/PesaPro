"use client";

import { useState } from "react";
import { Clock, MoreVertical, Pause, Play, Repeat } from "lucide-react";
import type { ScheduledTransfer } from "@/data/scheduled-transfers";
import TransferMenu from "@/components/scheduled-transfers/TransferMenu";

interface TransferRowProps {
  transfer: ScheduledTransfer;
  onTogglePause: (transfer: ScheduledTransfer) => void;
  onView: (transfer: ScheduledTransfer) => void;
  onEdit: (transfer: ScheduledTransfer) => void;
  onCancelTransfer: (transfer: ScheduledTransfer) => void;
}


function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TransferRow({
  transfer,
  onTogglePause,
  onView,
  onEdit,
  onCancelTransfer,
}: TransferRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = transfer.status === "Active";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: transfer.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(transfer.amount);

  return (
    <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-900">
          <Repeat size={16} className="text-green-300" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{transfer.name}</p>

            {isActive ? (
              <span className="flex items-center gap-1 rounded-md bg-green-400 cursor-pointer px-2 py-0.5 text-xs font-medium text-white">
                <Play size={10} /> Active
              </span>
            ) : (
              <span className="flex items-center gap-1 cursor-pointer rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                <Pause size={10} /> Paused
              </span>
            )}

            <span className="rounded-md border border-gray-200 px-2 py-0.5 text-xs text-gray-600">
              {transfer.frequency}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={12} /> Next: {formatDate(transfer.nextDate)}
            </span>
            <span>•</span>
            <span>
              {formattedAmount} {transfer.currency}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Started: {formatDate(transfer.startDate)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onTogglePause(transfer)}
          className="rounded-md border cursor-pointer border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          {isActive ? "Pause" : "Resume"}
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Transfer options"
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <TransferMenu
              onView={() => {
                setIsMenuOpen(false);
                onView(transfer);
              }}
              onEdit={() => {
                setIsMenuOpen(false);
                onEdit(transfer);
              }}
              onCancelTransfer={() => {
                setIsMenuOpen(false);
                onCancelTransfer(transfer);
              }}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}