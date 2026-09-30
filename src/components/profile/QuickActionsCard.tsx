import { Bell, Headset, MapPin } from "lucide-react";

const actions = [
  { icon: Headset, label: "Contact Support" },
  { icon: Bell, label: "Manage Alerts" },
  { icon: MapPin, label: "Update Address" },
];

export default function QuickActionsCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>

      <div className="mt-4 space-y-2">
        {actions.map(({ icon: Icon, label }) => (
          // wire up real behavior for each quick action
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}