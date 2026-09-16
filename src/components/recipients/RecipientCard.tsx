"use client"

import { useState } from "react"
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import type { Recipient } from "@/data/recipients";
import RecipientMenu from "@/components/recipients/RecipientMenu";

interface RecipientCardProps{
    recipient:Recipient;
    onView:(recipient:Recipient)=>void;
    onEdit:(recipient:Recipient)=>void;
    onDelete:(recipient:Recipient)=>void;
};

const getInitials=(name:string):string=>
    name
        .split(" ")
        .map((word)=>word[0])
        .join("")
        .toUpperCase()
;

export default function RecipientCard({recipient,onView,onEdit,onDelete}:RecipientCardProps){
    const [isMenuOpen,setIsMenuOpen]=useState(false);

    return(
        <div className="relative rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900 text-sm font-semibold text-white">
                    {getInitials(recipient.name)}
                </div>
                <button
                    onClick={()=>setIsMenuOpen((open)=>!open)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label="Recipient options"
                >
                    <MoreVertical size={18} />
                </button>
                {isMenuOpen &&(
                    <RecipientMenu
                        onView={()=>{
                            setIsMenuOpen(false)
                            onView(recipient)
                        }}
                        onEdit={()=>{
                            setIsMenuOpen(false)
                            onEdit(recipient)
                        }}
                        onDelete={()=>{
                            setIsMenuOpen(false)
                            onDelete(recipient)
                        }}
                        onClose={()=>setIsMenuOpen(false)}
                    />
                )}
            </div>

            <div className="mt-3">
                <p className="text-sm font-semibold text-gray-900">{recipient.name}</p>
                <p className="text-sm text-gray-500">{recipient.country}</p>
            </div>

            <div className="mt-3 space-y-1 text-sm text-gray-500">
                <p>{recipient.email}</p>
                <p>{recipient.account}</p>
            </div>
            <Link
                href="/send-money"
                className="mt-4 block rounded-lg cursor-pointer border border-gray-200 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
            >
                Send Money
            </Link>
        </div>
    );
}
