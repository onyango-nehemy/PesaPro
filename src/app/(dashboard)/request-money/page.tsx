"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft,Mail} from "lucide-react";

//send request data
export type RequestMoneyData={
    amount:string;
    currency:string;
    note ?:string;
    requestDetail:"email" | "link";
    recipientEmail:string
}
const MIN_AMOUNT="0.00"
const MAX_AMOUNT="50000"

export default function RequestMoneyPage(){
    const [data, setData]=useState<RequestMoneyData>({
        amount:"",
        currency:"USD",
        note:"",
        requestDetail:"email",
        recipientEmail:""
    });

    const [isSubmitting, setIsSubmitting]=useState(false);

    const handleSendRequest=async()=>{
        setIsSubmitting(true);
        try{
            await new Promise((resolve)=>setTimeout(resolve,1500))
            console.log("submitted");

        }catch(error){
            console.error(error);

        }finally{
            setIsSubmitting(false);
        }
    }

    const handleGenerateLink=async()=>{
        try{
            console.log("link generate")
        }catch(error){
            console.error(error)
        }finally{
            console.log("generate link")
        }
    }

    const updateData=(field: Partial<RequestMoneyData>)=>{
        setData((prev)=>({...prev,...field}))
    }

    return(
        <div className="max-w-lg mx-auto ml-22">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-pesa-slate mb-4"
            ><ArrowLeft size={16} />Back to Dashboard</Link>
            <h2 className="text-xl font-semibold text-pesa-charcoal ">Request Money</h2>
            <p className="text-sm text-pesa-slate mb-6">Request payment from anyone via email or shareable link</p>
            <div>
                
                {/* Amount Section */}
                <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6 ">
                    <h2 className="text-sm text-pesa-charcoal font-semibold">Request Details</h2>
                    <p className="text-xs text-pesa-slate mb-3">Enter the amount you want to request</p>

                    <label className="block text-sm text-pesa-slate mb-1 font-semibold">Amount</label>
                    <input 
                        type="number"
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        inputMode="decimal"
                        value={data.amount}
                        placeholder="0.00"
                        onChange={(e)=>updateData({amount: e.target.value})}
                        className="w-full border border-pesa-slate/20 rounded-lg px-2 py-3 text-sm outline-none focus:border-pesa-charcoal"

                    />
                    <label className="block text-sm text-pesa-slate font-semibold mt-4 mb-1">Currency</label>
                    <select 
                        value={data.currency}
                        onChange={(e)=>updateData({currency:e.target.value})}
                        className="w-full rounded-lg border border-pesa-slate/20 px-2 py-3 focus:border:pesa-charcoal text-sm outline-none mb-4">
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="KES">KES - Kenyan Shilling</option>
                    </select>
                    <label className="block text-sm text-pesa-slate font-semibold">Note (Optional)</label>
                    <input 
                        type="text"
                        value={data.note}
                        onChange={(e)=>updateData({note:e.target.value})}
                        className="w-full rounded border border-pesa-slate/20 px-2 py-3 text-pesa-slate bg-gray-100 text-sm outline-none focus:border-pesa-charcoal"
                        placeholder="What is this payment for?"
                    />
                
                </div>

                {/** send request section */}
                <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6 mt-4" >
                    <h2 className="text-pesa-charcoal font-semibold text-sm">Send Request</h2>
                    <p className="text-pesa-slate text-xs font-semibold mb-4">Choose how to send your payment request</p>
                    <label className="block text-sm text-pesa-slate font-semibold mb-1">Request Email</label>
                    <input 
                        className="border border-pesa-slate/20 w-full mb-1 rounded-lg px-2 py-3 bg-gray-100 outline-none focus:border-pesa-charcoal" 
                        placeholder="🖂 recipient@example.com"
                        value={data.recipientEmail}
                        onChange={(e)=>updateData({recipientEmail: e.target.value})}
                    />
                    <div className="relative flex items-center mb-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">
                            OR
                        </span>
                        <div className="flex-grow border-t border-gray-300"></div>

                    </div>
                    <div className="bg-white rounded-lg shadow  border border-white">
                        <h2 className="text-pesa-charcoal mb-4 text-sm font-semibold">Shareable Link</h2>
                        <div className="flex items-center justify-center">
                            <button 
                                type="button" 
                                onClick={handleGenerateLink}
                                className="text-pesa-slate text-xs font-semibold mb-2 cursor-pointer"
                                >
                                Generate Payment Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Actions section */}
            <div className="flex gap-3 pt-2 items-center w-full mt-4">
                <Link
                    href="/dashboard"
                    className="flex-1 text-center border border-pesa-slate/20 rounded-lg py-2 text-sm text-pesa-charcoal hover:bg-gray-100"
                >Cancel</Link>
                <button
                    type="button"
                    onClick={handleSendRequest}
                    disabled={isSubmitting} 
                    className="flex-1 flex justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2 rounded-lg bg-pesa-green py-2 text-sm font-medium text-white"
                ><Mail size={16} />{isSubmitting ? "Processing":"Send Request"}</button>
            </div>

        </div>
    )
}
