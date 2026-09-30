"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timeoutId);
  }, [message, onDismiss]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-lg">
      <CheckCircle2 size={16} className="text-green-600" />
      {message}
    </div>
  );
}