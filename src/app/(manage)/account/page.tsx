"use client";

import { useState } from "react";
import { Globe,ArrowLeft } from "lucide-react";
import Link from "next/link";
import { accountDetailsData } from "@/data/accountDetails";
import CurrencyTabs from "@/components/account-details/CurrencyTabs";
import AccountField from "@/components/account-details/AccountField";
import BankDetailsPanel from "@/components/account-details/BankDetailsPanel";

export default function AccountDetailsPage() {
  const [activeCurrency, setActiveCurrency] = useState<"USD" | "EUR" | "GBP">("USD");

  const data = accountDetailsData[activeCurrency];

  return (
    <div className="px-6 py-8">
      {/* Page header */}
        <Link
            href="/dashboard"
            className="flex items-center  gap-2 text-sm text-pesa-slate mb-4"
      
            ><ArrowLeft size={16}/> Back to dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900">Account Details</h1>
      <p className="mt-1 text-sm text-gray-500">
        Get paid from around the world with local bank details
      </p>

      {/* Currency switcher */}
      <div className="mt-6">
        <CurrencyTabs activeCurrency={activeCurrency} onChange={setActiveCurrency} />
      </div>

      {/* Account card */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-semibold text-gray-900">{data.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{data.subtitle}</p>

        <div className="mt-6 space-y-3">
          {data.accountFields.map((field) => (
            <AccountField
              key={field.label}
              label={field.label}
              value={field.value}
              copyable={field.copyable}
            />
          ))}
        </div>

        <BankDetailsPanel bankDetails={data.bankDetails} />
      </div>

      {/* Info banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
          <Globe size={18} className="text-green-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            Local bank details in 40+ countries
          </p>
          <p className="mt-0.5 text-sm text-gray-600">
            Get paid like a local in USD, EUR, GBP, AUD, CAD, and more. Share your account
            details with employers and clients to receive money faster and cheaper.
          </p>
        </div>
      </div>
    </div>
  );
}