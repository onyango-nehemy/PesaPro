"use client";

import { Menu } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="w-full h-16 border-b border-pesa-slate/15 bg-white flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="-ml-1 p-1 text-pesa-charcoal md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="w-8 h-8 rounded-lg bg-pesa-green flex items-center justify-center text-white font-bold text-sm">
          P
        </div>
        <span className="font-semibold text-pesa-charcoal">PesaPro</span>
      </div>

      <ProfileMenu />
    </header>
  );
}