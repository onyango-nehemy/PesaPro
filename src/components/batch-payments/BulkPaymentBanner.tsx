import { FileText } from "lucide-react";

export default function BulkPaymentBanner() {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
      <div className="flex items-start gap-3">
        <FileText size={16} className="mt-0.5 shrink-0 text-green-700" />
        <div>
          <p className="text-sm font-medium text-gray-900">
            Bulk Payment Solutions for Business
          </p>
          <p className="mt-1 text-sm text-green-800">
            Pay up to 1,000 recipients in one go. Perfect for payroll, supplier
            payments, or freelancer payouts. CSV upload makes it easy to process
            large batches with real-time tracking and automatic reconciliation.
          </p>
        </div>
      </div>
    </div>
  );
}