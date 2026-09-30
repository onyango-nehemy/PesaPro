import { Calendar } from "lucide-react";

export default function FlexibleSchedulingBanner() {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
      <div className="flex items-start gap-3">
        <Calendar size={16} className="mt-0.5 shrink-0 text-green-700" />
        <div>
          <p className="text-sm font-medium text-gray-900">
            Flexible Scheduling
          </p>
          <p className="mt-1 text-sm text-green-800">
            Schedule one-time transfers for the future or set up recurring
            payments that happen automatically. You can pause, resume, or cancel
            anytime with no fees.
          </p>
        </div>
      </div>
    </div>
  );
}