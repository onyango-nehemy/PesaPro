"use client";

import { useState } from "react";
import {ShieldCheck, MoreVertical } from "lucide-react";
import type { Jar } from "@/data/jars";
import JarMenu from "@/components/jars/JarMenu";

interface JarCardProps {
  jar: Jar;
  onView: (jar: Jar) => void;
  onEdit: (jar: Jar) => void;
  onDelete: (jar: Jar) => void;
  onAddMoney: (jar: Jar) => void;
}

export default function JarCard({
  jar,
  onView,
  onEdit,
  onDelete,
  onAddMoney,
}: JarCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const progress = jar.goal > 0 ? (jar.saved / jar.goal) * 100 : 0;
  const remaining = jar.goal - jar.saved;

  const formattedSaved = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: jar.currency,
  }).format(jar.saved);

  const formattedGoal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: jar.currency,
  }).format(jar.goal);

  const formattedRemaining = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: jar.currency,
  }).format(Math.max(remaining, 0));

  return (
    <div
      className="relative rounded-xl border-t-4 border-gray-200 bg-white p-5"
      style={{ borderTopColor: jar.color }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${jar.color}20` }}
          >
            <ShieldCheck size={20} style={{ color: jar.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{jar.name}</p>
            <p className="text-sm text-gray-500">
              {formattedSaved} / {formattedGoal}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Jar options"
        >
          <MoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <JarMenu
            onView={() => {
              setIsMenuOpen(false);
              onView(jar);
            }}
            onEdit={() => {
              setIsMenuOpen(false);
              onEdit(jar);
            }}
            onDelete={() => {
              setIsMenuOpen(false);
              onDelete(jar);
            }}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-900"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-400">
          {remaining > 0 ? `${formattedRemaining} left to reach your goal` : "Goal reached!"}
        </p>
      </div>

      <button
        onClick={() => onAddMoney(jar)}
        className="mt-4 w-full rounded-lg py-2 text-sm cursor-pointer font-medium text-white"
        style={{ backgroundColor: jar.color }}
      >
        + Add Money
      </button>
    </div>
  );
}