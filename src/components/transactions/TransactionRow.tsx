import { ArrowDownLeft,ArrowUpRight} from "lucide-react";
import { Transaction } from "@/data/transactions";

interface TransactionRowProps{
    transaction:Transaction;
}

const statusStyles: Record<Transaction["status"],string>={
    Completed: "text-green-600 bg-green-50",
    Pending: "text-amber-600 bg-amber-50",
    Failed: "text-red-600 bg-red-50",
};

export default function TransactionRow({transaction}:TransactionRowProps){
    const isIncoming=transaction.direction ==="incoming";

    const formattedAmount=new Intl.NumberFormat("en-us",{
        style:"currency",
        currency:transaction.currency
    }).format(transaction.amount);

    return(
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 last:border-b-0">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        isIncoming ? "bg-green-50" : "bg-red-50"
                    }`}
                >
                    {isIncoming ? (
                        <ArrowDownLeft size={16} className="text-green-600" />
                    ):(
                        <ArrowUpRight size={16} className="text-red-600" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{transaction.name}</span>
                    <span className="text-xs text-gray-400">{transaction.date}</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span
                    className={`text-sm font-medium ${
                        isIncoming ? "text-green-600" : "text-gray-900"
                    }`}
                >
                    {isIncoming ? "+" : "-"}
                    {formattedAmount}
                </span>
                <span className={`mt-0.5 rounded-full px-2 py-0.5 text-xs ${
                    statusStyles[transaction.status]
                }`}>
                    {transaction.status}
                </span>
            </div>
        </div>
    )
}