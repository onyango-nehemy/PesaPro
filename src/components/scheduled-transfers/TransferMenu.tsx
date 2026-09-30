"use client";

import { useEffect, useRef } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface TransferMenuProps {
  onView: () => void;
  onEdit: () => void;
  onCancelTransfer: () => void;
  onClose: () => void;
}

export default function TransferMenu({
  onView,
  onEdit,
  onCancelTransfer,
  onClose,
}: TransferMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 z-10 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
    >
      <button
        onClick={onView}
        className="flex w-full items-center cursor-pointer gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
      >
        <Eye size={14} /> View Details
      </button>
      <button
        onClick={onEdit}
        className="flex w-full items-center cursor-pointer gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
      >
        <Pencil size={14} /> Edit
      </button>
      <button
        onClick={onCancelTransfer}
        className="flex w-full items-center cursor-pointer gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        <Trash2 size={14} /> Cancel transfer
      </button>
    </div>
  );
}