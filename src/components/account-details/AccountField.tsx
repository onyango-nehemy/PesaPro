"use client"
import { useState } from "react";
import {Copy,Check} from "lucide-react";

interface AccountsFieldProps{
    label:string;
    value:string;
    copyable:boolean;
}

export default function AccountField({label,value,copyable}:AccountsFieldProps){
    const [copied,setCopied]=useState(false);

    const handleCopy=async()=>{
        try{
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(()=>setCopied(false),2000);
        }catch(error){
            console.error("Failed to copy: ",error);
        }
    };

    return(
        <div
            className="flex items-center justify-between  rounded-lg  border border-gray-200 px-4 py-3"
        >
            <div
                className="flex flex-col"
            >
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-sm font-medium text-gray-900">{value}</span>
            </div>
            {
                copyable &&(
                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        aria-label={`Copy ${label}`}
                    >
                        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                )
            }
        </div>
    )
}