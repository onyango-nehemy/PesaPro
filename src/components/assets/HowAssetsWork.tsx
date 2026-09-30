import {
  DollarSign,
  Info,
  TrendingUp,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

interface InfoItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const items: InfoItem[] = [
  {
    icon: DollarSign,
    title: "Low-risk investments",
    description:
      "Your money is invested in government bonds and high-quality money market funds",
  },
  {
    icon: TrendingUp,
    title: "Daily interest",
    description:
      "Interest is calculated daily and paid into your account monthly",
  },
  {
    icon: Info,
    title: "Flexible access",
    description:
      "Withdraw your money anytime with no penalties or lock-in periods",
  },
  {
    icon: TriangleAlert,
    title: "Protected up to limits",
    description:
      "Protected by deposit insurance schemes up to regulatory limits",
  },
];

export default function HowAssetsWorks() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">
        How Wise Assets Works
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Understanding where your money is invested
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {items.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-900">
              <Icon size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}