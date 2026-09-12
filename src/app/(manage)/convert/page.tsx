"use client";
import { useState } from "react";
import { ArrowLeft, ArrowUpDown, Lock,TrendingUp ,AlertCircle} from "lucide-react";
import Link from "next/link";
//currency data type
export type ConvertCurrencyData={
    sendAmount:string;
    sendCurrency:string;
    recipientCurrency:string;
    autoConvertEnabled:boolean;
    targetRate:string;
    rateAlertsEnabled:boolean
};

const EXCHANGE_RATE=0.92;
const FEE_PERCENTAGE=0.004;

export default function ConvertCurrencyPage(){
    const [data,setData]=useState<ConvertCurrencyData>({
        sendAmount:"",
        sendCurrency:"USD",
        recipientCurrency:"EUR",
        autoConvertEnabled:false,
        targetRate:"0.9200",
        rateAlertsEnabled:false
    });

    const [isConverting,setIsConverting]=useState(false);

    const handleConvert=async()=>{
        setIsConverting(true);
        try{
            await new Promise((resolve)=>setTimeout(resolve,1500));
            console.log("success",{
                sendAmountNumber,
                sendCurrency: data.sendCurrency,
                recipientAmount,
                recipientCurrency: data.recipientCurrency,
                fee,
                total,
            });
            updateData({sendAmount:""});
        }catch(error){
            console.error(error)
        }finally{
            setIsConverting(false);
        }
    }

    const updateData=(field: Partial<ConvertCurrencyData>)=>{
        setData((prev)=>({...prev,...field}));

    };

    const handleSwapCurrency=()=>{
        updateData({
            sendCurrency:data.recipientCurrency,
            recipientCurrency:data.sendCurrency
        });
    };

    //caclculated values , never stored
    const sendAmountNumber=Number(data.sendAmount) || 0;
    const recipientAmount=sendAmountNumber * EXCHANGE_RATE;
    const fee=sendAmountNumber * FEE_PERCENTAGE;
    const total=sendAmountNumber + fee;

    return(
        <div className="max-w-6xl mx-auto ml-8">
            <Link 
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-pesa-slate mb-4"
            ><ArrowLeft size={16} />Back to dashboard</Link>
            <h2 className="text-xl font-semibold text-pesa-charcoal">Convert Currency</h2>
            <p className="text-sm text-pesa-slate mb-6">Exchange between currencies at the mid-market rate with transparent fees</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/**left side column */}
                <div className="lg:col-span-2 space-y-4">
                    {/**currency converter section card */}
                    <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6">
                        <h2 className="text-sm text-pesa-charcoal font-semibold">Currency Converter</h2>
                        <p className="text-xs text-pesa-slate mb-4">Real mid-market exchange rate · Low transparent fees</p>

                        <label className="block text-sm  text-pesa-slate font-semibold mb-1">You send</label>
                        <div className="flex gap-2">
                            <input 
                                type="number"
                                value={data.sendAmount}
                                onChange={(e)=>updateData({sendAmount:e.target.value})}
                                placeholder="0.00"
                                className="flex-1 border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 text-sm outline-none focus:border-pesa-charcoal"
                            />
                            <select
                                value={data.sendCurrency}
                                onChange={(e)=>updateData({sendCurrency:e.target.value})}
                                className="rounded-lg cursor-pointer border border-pesa-slate/20 px-2 py-3 text-sm outline-none bg-gray-100"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="KES">KES</option>
                            </select>
                        </div>
                        <p className="text-xs text-pesa-slate mt-1">Available $14,861.5 USD</p>

                        {/**Swap button section */}
                        <div className="flex justify-center my-3">
                            <button
                                type="button"
                                onClick={handleSwapCurrency}
                                className="rounded-full border cursor-pointer border-pesa-slate/20 p-2 hover:bg-gray-100 bg-white"
                            >
                                <ArrowUpDown size={16} className="text-pesa-slate"/>
                            </button>
                        </div>

                        {/**Recipient section */}
                        <label className="text-sm block text-pesa-slate font-semibold mb-1">Recipient gets</label>
                        <div className="flex gap-2 mb-4">
                            <input 
                                type="number"
                                value={recipientAmount.toFixed(2)}
                                placeholder="0.00"
                                readOnly
                                className="flex-1 border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 text-sm outline-none"
                            />
                            <select className="rounded-lg border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 outline-none cursor-pointer"
                                value={data.recipientCurrency}
                                onChange={(e)=>updateData({recipientCurrency:e.target.value})}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="KES">KES</option>
                            </select>
                        </div>
                        {/**Exchange rate summary card */}
                        <div className="bg-gray-100 rounded-lg p-4 mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span
                                    className="flex items-center gap-1 text-pesa-charcoal font-medium"
                                ><TrendingUp size={16}  />Exchange Rate <span className="text-pesa-slate font-normal">Locked</span></span>
                                <span className="text-pesa-charcoal font-medium">1 USD = 0.9200 EUR</span>
                            </div>
                            <div className="flex justify-between text-sm text-pesa-slate">
                                <span>Fee (0.4%)</span>
                                <span>{fee.toFixed(2)} {data.sendCurrency}</span>
                            </div>
                            <div className="flex mb-2 justify-between text-sm font-semibold text-pesa-charcoal border-t border-pesa-slate/15 pt-2">
                                <span>Total cost</span>
                                <span>{total.toFixed(2)} {data.sendCurrency}</span>
                            </div>
                        </div>
                        {/**Actions card section */}
                        <div className="flex gap-3 items-center">
                            <button
                                type="button"
                                onClick={handleConvert}
                                disabled={isConverting || sendAmountNumber <=0}
                                className="flex-1 rounded-lg bg-pesa-green py-2 text-sm font-medium text-white cursor-pointer disabled:cursor-not-allowed hover:bg-blue-900"
                            >{isConverting ? "Converting..." : "Convert Now"}</button>
                            <button
                                type="button"
                                className="flex items-center gap-1 border border-pesa-slate/20 rounded-lg px-3 py-2 text-sm text-pesa-charcoal cursor-pointer hover:bg-gray-500 hover:text-black"
                            ><Lock size={14}/> Unlock Rate</button>
                        </div>
                    </div>
                    {/**Rate History Card section */}
                    <div className="bg-white rounded-2xl border/15 p-6">
                        <h2 className="text-sm text-pesa-charcoal font-semibold">Rate History</h2>
                        <p className="text-xs text-pesa-slate mb-4">USD to EUR over the last 30 days</p>
                        <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-sm text-pesa-slate">
                            Rate trend chart (coming soon)
                        </div>
                    </div>
                </div>
                {/**Right side column */}
                <div className="space-y-4">
                    {/**Auto card section */}
                    <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6">
                        <h2 className="text-sm text-pesa-charcoal font-semibold">Auto-Convert</h2>
                        <p className="text-xs text-pesa-slate mb-4">Automatically convert when rate hits your target</p>
                        <label className="block text-sm text-pesa-slate font-semibold mb-1">Target Rate</label>
                        <input
                            type="text"
                            placeholder="0.9200"
                            className="w-full border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 text-sm outline-none mb-4"
                        />
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-pesa-slate">Enable Auto-Convert</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={data.autoConvertEnabled}
                                onClick={()=>updateData({autoConvertEnabled: !data.autoConvertEnabled})}
                                className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors ${
                                    data.autoConvertEnabled ? "bg-pesa-green" :"bg-gray-300"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        data.autoConvertEnabled ? "translate-x-6" : "translate-x-1"
                                    }`}
                                ></span>
                            </button>
                        </div>
                    </div>
                    {/**Rates Card */}
                    <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6">
                        <h2 className="text-sm font-semibold text-pesa-slate">Rates Alerts</h2>
                        <p className="text-xs text-pesa-slate mb-4">Get notified of favorable rate changes</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-pesa-slate">Enable Alerts</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={data.rateAlertsEnabled}
                                onClick={()=>updateData({rateAlertsEnabled: !data.rateAlertsEnabled})}
                                className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors ${
                                    data.rateAlertsEnabled ? "bg-pesa-green" :"bg-gray-300"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        data.rateAlertsEnabled ? "translate-x-6" : "translate-x-1"
                                    }`}
                                ></span>
                            </button>
                            
                            
                        </div>
                    </div>
                    {/**Midmarket Card */}
                    <div className="bg-green-900 text-white rounded-2xl p-6">
                        <h2 className=" flex items-center  gap-2 text-sm font-semibold"><AlertCircle size={16}/>Mid-Market Rate</h2>
                        <p className="text-xs  text-green-100">We use the real exchange rate — the one you see on Google. No hidden markups.</p>
                    </div>
                    {/**Fee Calculator */}
                    <div className="bg-white rounded-2xl boder border-pesa-slate/15 p-6">
                        <h2 className="text-sm text-pesa-charcoal font-semibold mb-4">Fee Calculator</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-pesa-slate">
                                <span>Amount to convert</span><span>{sendAmountNumber} {data.sendCurrency}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-pesa-slate">Our fee</span>
                                <span className="text-pesa-green font-medium">{fee.toFixed(2)} {data.sendCurrency}</span>
                            </div>
                            <div className="flex justify-between text-pesa-slate">
                                <span>Exchange Rate</span><span>{EXCHANGE_RATE.toFixed(4)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-pesa-charcoal border-t border-pesa-slate/15 pt-2">
                                <span>You&apos;ll receive</span><span>{recipientAmount.toFixed(2)} {data.recipientCurrency}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}