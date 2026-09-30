import { TriangleAlert } from "lucide-react";

export default function RiskBanner() {
  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
      <div className="flex items-start gap-3">
        <TriangleAlert size={16} className="mt-0.5 shrink-0 text-orange-600" />
        <div>
          <p className="text-sm font-medium text-orange-900">
            Important: Capital at risk
          </p>
          <p className="mt-1 text-sm text-orange-800">
            Returns are not guaranteed. The value of your investment can go down
            as well as up, and you may get back less than you invest. PesaPro Assets
            invests your money in low-risk financial instruments, but all
            investments carry some risk.
          </p>
        </div>
      </div>
    </div>
  );
}