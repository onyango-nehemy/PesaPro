"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "./components/ProgressBar";
import Step1Amount from "./components/Step1Amount";
import Step2Recipient from "./components/Step2Recipient";
import Step3Review from "./components/Step3Review";

export type SendMoneyData = {
  sendAmount: string;
  sendCurrency: string;
  recipientCurrency: string;
  recipientName: string;
  recipientEmail: string;
  accountNumber: string;
};

const EXCHANGE_RATE = 0.92; // USD -> EUR// i will modify later
const TRANSFER_FEE = 4.5;

export default function SendMoneyPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SendMoneyData>({
    sendAmount: "",
    sendCurrency: "USD",
    recipientCurrency: "EUR",
    recipientName: "",
    recipientEmail: "",
    accountNumber: "",
  });

  function updateData(fields: Partial<SendMoneyData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function goNext() {
    setStep((prev) => Math.min(prev + 1, 3));
  }

  function goBack() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function handleConfirm() {
    console.log("Sending money:", data);
    
  }

  const numericAmount = parseFloat(data.sendAmount) || 0;
  const recipientGets = numericAmount * EXCHANGE_RATE;
  const totalAmount = numericAmount + TRANSFER_FEE;

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={step === 1 ? undefined : goBack}
        className="flex items-center gap-2 text-sm text-pesa-slate mb-4"
      >
        {step === 1 ? (
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        ) : (
          <>
            <ArrowLeft size={16} /> Back
          </>
        )}
      </button>

      <h1 className="text-xl font-semibold text-pesa-charcoal">Send Money</h1>
      <p className="text-sm text-pesa-slate mb-4">Step {step} of 3</p>

      <ProgressBar currentStep={step} />

      <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6 mt-6">
        {step === 1 && (
          <Step1Amount
            data={data}
            updateData={updateData}
            recipientGets={recipientGets}
            totalAmount={totalAmount}
            exchangeRate={EXCHANGE_RATE}
            fee={TRANSFER_FEE}
            onContinue={goNext}
          />
        )}

        {step === 2 && (
          <Step2Recipient data={data} updateData={updateData} onContinue={goNext} />
        )}

        {step === 3 && (
          <Step3Review
            data={data}
            recipientGets={recipientGets}
            totalAmount={totalAmount}
            fee={TRANSFER_FEE}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
}