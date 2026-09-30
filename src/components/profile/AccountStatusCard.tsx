import { CalendarDays, CreditCard, ShieldCheck } from "lucide-react";
import type { AccountStatus } from "@/data/profile";

interface AccountStatusCardProps {
  accountStatus: AccountStatus;
}

export default function AccountStatusCard({
  accountStatus,
}: AccountStatusCardProps) {
  const verificationLabel = accountStatus.isVerified
    ? "Verified"
    : "Unverified";
  const verificationClass = accountStatus.isVerified
    ? "text-green-600"
    : "text-amber-600";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">Account Status</h2>

      <div className="mt-4 divide-y divide-gray-100">
        <div className="flex items-center gap-3 py-3 first:pt-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
            <CalendarDays size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Member since</p>
            <p className="text-sm font-medium text-gray-900">
              {accountStatus.memberSince}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
            <ShieldCheck size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Verification Status</p>
            <p className={`text-sm font-medium ${verificationClass}`}>
              {verificationLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-3 last:pb-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
            <CreditCard size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Payment Methods</p>
            <p className="text-sm font-medium text-gray-900">
              {accountStatus.paymentMethodsCount} cards added
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}