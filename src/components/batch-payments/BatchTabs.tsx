export type BatchTab = "upload" | "history";

interface BatchTabsProps {
  activeTab: BatchTab;
  onChange: (tab: BatchTab) => void;
}

const tabs: { id: BatchTab; label: string }[] = [
  { id: "upload", label: "Upload Batch" },
  { id: "history", label: "History" },
];

export default function BatchTabs({ activeTab, onChange }: BatchTabsProps) {
  return (
    <div className="inline-flex cursor-pointer rounded-lg bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-2 rounded-md cursor-pointer  text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}