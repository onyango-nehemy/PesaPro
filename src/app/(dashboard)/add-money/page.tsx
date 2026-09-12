"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Landmark, Smartphone } from "lucide-react";

//now lets describe how the data in state should look like.
export type AddMoneyData={
    amount:string;
    currency:string;
    paymentMethod:"card" | "bank" | "wallet" | ""
};

//payment method option should only exists in this add-money file.
type PaymentMethodOption={
    id:AddMoneyData["paymentMethod"];
    label:string;
    description:string;
    icon:typeof CreditCard;
    feePercent:number;
};

//lets declare our payment methods
const PAYMENT_METHODS: PaymentMethodOption[]=[
    {
        id: "card",
        label: "Debit/Credit Card",
        description: "Instant transfer",
        icon:CreditCard,
        feePercent:2.5
    },
    {
        id: "bank",
        label: "Bank Transfer",
        description: "1-3 Business days",
        icon: Landmark,
        feePercent:0
    },
    {
        id: "wallet",
        label: "Mobile Wallet",
        description: "Apple Pay, Google Pay",
        icon: Smartphone,
        feePercent: 1.5
    }
]

//values for validation
const MIN_AMOUNT=1;
const MAX_AMOUNT=50000;

//now the main page of addMoney begins below
export default function AddMoneyPage(){
    const [data, setData]=useState<AddMoneyData>({amount:"",currency:"USD",paymentMethod:"bank"});
    const [isSubmitting, setIsSubmitting]=useState(false);

    const updateData=(fields:Partial<AddMoneyData>)=>{
        setData((prev)=>({...prev,...fields}));

    }
    const numericAmount=parseFloat(data.amount)|0;
    const selectedMethod=PAYMENT_METHODS.find((m)=>m.id ===data.paymentMethod);
    const fee=selectedMethod ? (numericAmount *selectedMethod.feePercent)/100 : 0;
    const total=numericAmount + fee;

    const isValid=
        numericAmount >=MIN_AMOUNT && numericAmount <=MAX_AMOUNT && data.paymentMethod !=="";
    
    const handleContinue=()=>{
        if(isValid) return;
        setIsSubmitting(true);
    }

    return(
        <div className="max-w-lg mx-auto ml-22">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-pesa-slate mb-4 "
            > <ArrowLeft size={16}/>Back to Dashboard</Link>
            <h1 className="text-xl font-semibold text-pesa-charcoal">Add Money</h1>
            <p className="text-sm text-pesa-slate mb-6">Top up your PesaPro balance instantly</p>

            <div >
                {/*amount*/}
                <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6 space-y-6">
                    <h2 className="text-sm text-pesa-charcoal mb-1 font-medium">Amount</h2>
                    <p className="text-xs text-pesa-slate mb-3">Enter the amount you want to add</p>
                    <label className="block text-xs text-pesa-slate mb-1">Amount</label>
                    <input
                        type="number"
                        inputMode="decimal"
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        value={data.amount}
                        onChange={(e) => updateData({ amount: e.target.value })}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-pesa-slate/20 px-3 py-2 text-sm outline-none focus:border-pesa-charcoal"
                     />
                    <label className="block text-xs text-pesa-slate mb-1 mt-4">Currency</label>
                    <select
                        value={data.currency}
                        onChange={(e) => updateData({ currency: e.target.value })}
                        className="w-full rounded-lg border border-pesa-slate/20 px-3 py-2 text-sm outline-none focus:border-pesa-charcoal"
                    >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="KES">KES - Kenyan Shilling</option>
                    </select>
                </div>
                {/*Payment section*/}
                <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6 mt-4">
                    <h2 className="text-sm font-medium text-pesa-charcoal mb-1"> Payment Method</h2>
                    <p className="text-sm text-pesa-slate mb-3">Choose how you want to add money</p>

                    <div className="space-y-3">
                        {PAYMENT_METHODS.map((method)=>{
                            const Icon=method.icon;
                            const selected=data.paymentMethod === method.id;
                            return(
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => updateData({ paymentMethod: method.id })}
                                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                                        selected
                                        ? "border-pesa-green bg-pesa-green/5"
                                        :" border-pesa-slate/20 hover:border-pesa-slate/40"
                                    }`}
                                >
                                    <Icon size={16} className="text-pesa-charcoal shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-pesa-charcoal">{method.label}</p>
                                        <p className="text-xs text-pesa-slate">{method.description}</p>
                                    </div>
                                    {selected && (
                                        <span className="ml-auto w-2.5 h-2.5 rounded-full bg-pesa-green"></span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
                {/* Summary section */}
                <div className="bg-white rounded-2xl border border-t border-pesa-slate/15 p-4 mt-4">
                    <h2 className="text-sm font-medium text-pesa-charcoal mb-3">Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-pesa-slate">
                            <span>Amount</span>
                            <span>{numericAmount.toFixed(2)} {data.currency}</span>
                        </div>
                        <div className="flex justify-between text-pesa-slate">
                            <span>Fee</span>
                            <span className={fee === 0 ? "text-pesa-green" : ""}>
                               {fee === 0 ? "FREE" : `${fee.toFixed(2)} ${data.currency}`}
                            </span>
                        </div>
                        <div className="flex justify-between font-medium text-pesa-charcoal border-t border-pesa-slate/15 pt-2">
                            <span>Total</span>
                            <span>{total.toFixed(2)} {data.currency}</span>
                        </div>
                    </div>
                </div>
                {/*Actions*/}
                <div className="flex gap-3 pt-2  mt-4">
                        <Link
                            href="/dashboard"
                            className="flex-1 text-center rounded-lg border border-pesa-slate/20 py-2 text-sm text-pesa-charcoal"
                        >Cancel</Link>
                        <button
                            type="button"
                            onClick={handleContinue}
                            disabled={!isValid || isSubmitting}
                            className="flex-1 rounded-lg bg-pesa-green py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >{isSubmitting ? "Processing..." : "Continue"}</button>
                </div>
            </div>
        </div>
    )
}

