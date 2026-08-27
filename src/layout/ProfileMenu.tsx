"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    console.log("Logging out...");
    // later: clear the auth session/token, then redirect to /login
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-pesa-cream transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-pesa-gold flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
          SN
        </div>
        <ChevronDown size={16} className="text-pesa-slate" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-pesa-slate/15 rounded-lg shadow-lg py-1 z-50">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-pesa-charcoal hover:bg-pesa-cream text-left">
            <User size={16} />
            View Profile
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-pesa-charcoal hover:bg-pesa-cream text-left">
            <Settings size={16} />
            Settings
          </button>
          <div className="my-1 border-t border-pesa-slate/15" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 text-left"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}