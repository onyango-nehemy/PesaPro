import { ChevronDown } from "lucide-react";
import type { Transaction } from "@/data/transactions";

export type StatusFilterValue="All" | Transaction["status"]

interface StatusFilterProps{
    statusFilter:StatusFilterValue;
    onStatusChange:(value:StatusFilterValue)=>void;
}

const options:StatusFilterValue[]=["All","Completed","Failed","Pending"];

export default function StatusFilter({statusFilter,onStatusChange}:StatusFilterProps){
    return(
        <div className="relative">
            <select
                value={statusFilter}
                onChange={(e)=>onStatusChange(e.target.value as StatusFilterValue)}
                className="appearance-none  rounded-lg border border-gray-200 bg-white py-2  pl-3 pr-8 text-sm"
            >
                {options.map((option)=>(
                    <option key={option} value={option}>
                        {option === "All" ? "All Status" :option}
                    </option>
                ))}
            </select>
            <ChevronDown size={16} className="pointer-event-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
    )
}