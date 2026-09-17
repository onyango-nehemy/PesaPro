"use client";

import { X } from "lucide-react";
import type { Jar } from "@/data/jars";

interface ViewJarModalProps {
  jar: Jar;
  onClose: () => void;
}

export default function ViewJarModal({ jar, onClose }: ViewJarModalProps) {
  const progress = jar.goal > 0 ? (jar.saved / jar.goal) * 100 : 0;

  const formattedSaved = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: jar.currency,
  }).format(jar.saved);

  const formattedGoal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: jar.currency,
  }).format(jar.goal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-base font-semibold text-gray-900">Jar Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: jar.color }}
            />
            <p className="text-gray-900">{jar.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Saved</p>
            <p className="text-gray-900">{formattedSaved}</p>
          </div>
          <div>
            <p className="text-gray-400">Goal</p>
            <p className="text-gray-900">{formattedGoal}</p>
          </div>
          <div>
            <p className="text-gray-400">Progress</p>
            <p className="text-gray-900">{progress.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-400">Currency</p>
            <p className="text-gray-900">{jar.currency}</p>
          </div>
        </div>
      </div>
    </div>
  );
}