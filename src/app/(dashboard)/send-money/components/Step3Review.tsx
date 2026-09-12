import { formatCurrency } from "@/lib/format";
import type { SendMoneyData } from "../page";

export default function Step3Review({
  data,
  recipientGets,
  totalAmount,
  fee,
  onConfirm,
}: {
  data: SendMoneyData;
  recipientGets: number;
  totalAmount: number;
  fee: number;
  onConfirm: () => void;
}) {
  const numericAmount = parseFloat(data.sendAmount) || 0;

  return (
    <div>
      <h2 className="font-semibold text-pesa-charcoal">Review your transfer</h2>
      <p className="text-sm text-pesa-slate mb-4">Please check all details before confirming</p>

      <div className="bg-pesa-cream rounded-xl p-4 text-sm space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-pesa-slate">You send</span>
          <span className="font-medium text-pesa-charcoal">
            {formatCurrency(numericAmount, data.sendCurrency)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-pesa-slate">Transfer fee</span>
          <span className="font-medium text-pesa-charcoal">
            {formatCurrency(fee, data.sendCurrency)}
          </span>
        </div>
        <div className="flex justify-between border-t border-pesa-slate/15 pt-2">
          <span className="text-pesa-slate">Total to be deducted</span>
          <span className="font-medium text-pesa-charcoal">
            {formatCurrency(totalAmount, data.sendCurrency)}
          </span>
        </div>
      </div>

      <div className="bg-pesa-green/10 rounded-xl p-4 flex justify-between items-center mb-4">
        <span className="text-sm text-pesa-charcoal">Recipient gets exactly</span>
        <span className="font-semibold text-pesa-green">
          {formatCurrency(recipientGets, data.recipientCurrency)}
        </span>
      </div>

      <div className="text-sm space-y-1 mb-4">
        <p className="font-medium text-pesa-charcoal mb-1">Recipient details</p>
        <div className="flex justify-between">
          <span className="text-pesa-slate">Name</span>
          <span className="text-pesa-charcoal">{data.recipientName}</span>
        </div>
        {data.recipientEmail && (
          <div className="flex justify-between">
            <span className="text-pesa-slate">Email</span>
            <span className="text-pesa-charcoal">{data.recipientEmail}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-pesa-slate">Account</span>
          <span className="text-pesa-charcoal">{data.accountNumber}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-pesa-green text-white rounded-lg py-2.5 text-sm font-medium hover:bg-pesa-green-dark transition-colors"
      >
        ✓ Confirm and Send
      </button>
    </div>
  );
}