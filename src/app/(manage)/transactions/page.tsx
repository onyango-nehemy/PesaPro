"use client";

import { useState } from "react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import { transactionsData } from "@/data/transactions";
import TransactionRow from "@/components/transactions/TransactionRow";
import SearchBar from "@/components/transactions/SearchBar";
import StatusFilter, { type StatusFilterValue } from "@/components/transactions/StatusFilter";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("All");

  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="px-6 py-8">
        <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-pesa-slate mb-4"
        ><ArrowLeft size={16} />Back to dashboard</Link>
      
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <p className="mt-1 text-sm text-gray-500">View and manage all your money transfers</p>

      {/* Transactions card */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white">
        <div className="px-4 pt-4">
          <h2 className="text-base font-semibold text-gray-900">All Transactions</h2>
          <p className="mt-1 text-sm text-gray-500">Your complete transaction history</p>

          <div className="mt-4 flex items-center gap-3">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <StatusFilter statusFilter={statusFilter} onStatusChange={setStatusFilter} />
          </div>
        </div>

        <div className="mt-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="px-4 py-8 text-center text-sm text-gray-400">
              No transactions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}