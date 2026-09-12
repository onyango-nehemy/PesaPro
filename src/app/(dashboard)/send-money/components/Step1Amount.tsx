import { formatCurrency } from "@/lib/format";
import type { SendMoneyData } from "../page";

export default function Step1Amount({
  data,
  updateData,
  recipientGets,
  totalAmount,
  exchangeRate,
  fee,
  onContinue,
}: {
  data: SendMoneyData;
  updateData: (fields: Partial<SendMoneyData>) => void;
  recipientGets: number;
  totalAmount: number;
  exchangeRate: number;
  fee: number;
  onContinue: () => void;
}) {
  const isValid = parseFloat(data.sendAmount) > 0;

  return (
    <div>
      <h2 className="font-semibold text-pesa-charcoal">How much would you like to send?</h2>
      <p className="text-sm text-pesa-slate mb-4">Enter the amount you want to send</p>

      <label className="block text-sm font-medium text-pesa-charcoal mb-1">You send</label>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="0"
          step="0.01"
          value={data.sendAmount}
          onChange={(e) => updateData({ sendAmount: e.target.value })}
          placeholder="0.00"
          className="flex-1 rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pesa-green"
        />
        <select
          value={data.sendCurrency}
          onChange={(e) => updateData({ sendCurrency: e.target.value })}
          className="rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm"
        >
          <option value="USD">USD</option>
        </select>
      </div>

      <label className="block text-sm font-medium text-pesa-charcoal mb-1">Recipient gets</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          readOnly
          value={recipientGets.toFixed(2)}
          className="flex-1 rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm bg-pesa-cream text-pesa-slate"
        />
        <select
          value={data.recipientCurrency}
          onChange={(e) => updateData({ recipientCurrency: e.target.value })}
          className="rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm"
        >
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="text-sm space-y-1 text-pesa-slate border-t border-pesa-slate/10 pt-3 mb-4">
        <div className="flex justify-between">
          <span>Exchange rate</span>
          <span>
            1 {data.sendCurrency} = {exchangeRate} {data.recipientCurrency}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Transfer fee</span>
          <span>{formatCurrency(fee, data.sendCurrency)}</span>
        </div>
        <div className="flex justify-between font-medium text-pesa-charcoal">
          <span>Total amount</span>
          <span>{formatCurrency(totalAmount, data.sendCurrency)}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!isValid}
        className="w-full bg-pesa-green text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pesa-green-dark transition-colors"
      >
        Continue →
      </button>
    </div>
  );
}