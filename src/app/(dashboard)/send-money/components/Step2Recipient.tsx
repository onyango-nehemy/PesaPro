import type { SendMoneyData } from "../page";

export default function Step2Recipient({
  data,
  updateData,
  onContinue,
}: {
  data: SendMoneyData;
  updateData: (fields: Partial<SendMoneyData>) => void;
  onContinue: () => void;
}) {
  const isValid = data.recipientName.trim() !== "" && data.accountNumber.trim() !== "";

  return (
    <div>
      <h2 className="font-semibold text-pesa-charcoal">Who are you sending money to?</h2>
      <p className="text-sm text-pesa-slate mb-4">Enter recipient&apos;s bank details</p>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-pesa-charcoal mb-1">Recipient&apos;s name</label>
          <input
            type="text"
            value={data.recipientName}
            onChange={(e) => updateData({ recipientName: e.target.value })}
            placeholder="John Doe"
            className="w-full rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pesa-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pesa-charcoal mb-1">Email address (optional)</label>
          <input
            type="email"
            value={data.recipientEmail}
            onChange={(e) => updateData({ recipientEmail: e.target.value })}
            placeholder="john@example.com"
            className="w-full rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pesa-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pesa-charcoal mb-1">Account number / IBAN</label>
          <input
            type="text"
            value={data.accountNumber}
            onChange={(e) => updateData({ accountNumber: e.target.value })}
            placeholder="DE89 3704 0044 0532 0130 00"
            className="w-full rounded-lg border border-pesa-slate/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pesa-green"
          />
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!isValid}
        className="w-full bg-pesa-green text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-900 transition-colors"
      >
        Continue →
      </button>
    </div>
  );
}