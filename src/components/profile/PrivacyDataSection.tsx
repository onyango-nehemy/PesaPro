import { Download, Globe, Laptop } from "lucide-react";

const items = [
  {
    icon: Download,
    title: "Download Your Data",
    description: "Export all your account data",
    buttonLabel: "Download",
  },
  {
    icon: Globe,
    title: "Language & Region",
    description: "English (US)",
    buttonLabel: "Change",
  },
  {
    icon: Laptop,
    title: "Connected Devices",
    description: "3 devices active",
    buttonLabel: "Manage",
  },
];

export default function PrivacyDataSection() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">Privacy & Data</h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage your data and privacy preferences
      </p>

      <div className="mt-4 divide-y divide-gray-100">
        {items.map(({ icon: Icon, title, description, buttonLabel }) => (
          <div
            key={title}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>

            {/* wire up real behavior for each of these actions */}
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              {buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}