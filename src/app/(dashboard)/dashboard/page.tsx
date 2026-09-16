import{
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Plus,
  ArrowDownToLine,
  UserPlus,
  Currency,
  Users
}from "lucide-react";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";

const balances=[
  {currency:"USD",symbol:"$",amount:15840.50},
  {currency:"EUR",symbol:"€",amount:8250.75},
  {currency:"GBP",symbol:"£",amount:5420.0},
];
const stats=[
  {label:"Money Sent",amount:12450,change:"+12% from last month",type:"sent" as const},
  {label:"Money Received",amount:8230,change:"+8% from last month",type:"received" as const},
 
];
const transactions = [
  { id: 1, name: "Sarah Johnson", date: "Oct 1, 2025", amount: -500, currency: "USD", status: "Completed" },
  { id: 2, name: "Michael Chen", date: "Sep 28, 2025", amount: 1200, currency: "EUR", status: "Completed" },
  { id: 3, name: "Joe Doe", date: "Jan 30, 2025", amount: 4300, currency: "GBP", status: "Completed" },
];
const recipientCount = 12;
const newRecipientsThisMonth = 3;


export default function Dashboard() {
  return(
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-pesa-charcoal">Welcome back,Sarah!</h1>
        <p className="text-sm text-pesa-slate">Here&apos;s what&apos;s happening with your account today.</p>
      </div>
      {/* Balances card grid and contents */}
      <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6">
        <h2 className="font-semibold text-pesa-charcoal">Your Balances</h2>
        <p className="font-semibold">Total value : $31,799.73 USD</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {balances.map((balance)=>(
            <div key={balance.currency}
              className="flex items-center justify-between border border-pesa-slate/15 rounded-xl p-4"
            >
              <div>
                <p className="text-xs text-pesa-slate">{balance.currency}</p>
                <p>{formatCurrency(balance.amount,balance.currency)}</p>
              </div>
              <Wallet className="text-pesa-green" size={20} />
            </div>
          ))

          }
        </div>
      </div>
      {/* money stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat)=>{
          const isSent=stat.type === 'sent';
          const Icon=isSent ? ArrowUpRight: ArrowDownLeft;

          return(
            <div key={stat.label} className="bg-white rounded-2xl border border-pesa-slate/15 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-pesa-slate">{stat.label}</p>
                <Icon size={16} className={isSent ? "text-red-500":"text-pesa-green"} />
              </div>
              <p className="text-xl font-semibold text-pesa-charcoal">{formatCurrency(stat.amount,"USD")}</p>
              <p className="text-xs text-pesa-slate mt-1">{stat.change}</p>

            </div>

          );
        })}
        <div className="bg-white rounded-2xl border border-pesa-slate/15 p-4">
          <div className="flex items-center justify-between  mb-2">
            <p className="text-sm text-pesa-slate">Recipients</p>
            <Users size={16} className="text-pesa-green" />
          </div>
          <p className="text-xl font-semibold text-pesa-charcoal">{recipientCount}</p>
          <p className="text-xs text-pesa-slate mt-1">{newRecipientsThisMonth} new this month</p>
        </div>
      </div>
      {/**Quick Actions Section */}
      <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6">
        <h2 className="font-semibold text-pesa-charcoal">Quick Actions</h2>
        <p className="text-sm text-pesa-slate mb-4">Manage your money easily</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/send-money" className="flex items-center justify-center gap-2 bg-pesa-green text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-900 transition-colors cursor-pointer">
            <Send size={16} />
            Send money
          </Link>
          <button className="flex items-center justify-center gap-2 border border-pesa-slate/20 text-pesa-charcoal rounded-lg py-2.5 text-sm font-medium hover:bg-pesa-green hover:text-white transition-colors cursor-pointer">
            <Plus size={16} />
            Add money
          </button>
          <button className="flex items-center justify-center gap-2 border border-pesa-slate/20 texts-pesa-charcoal rounded-lg py-2.5 text-sm font-medium hover:bg-pesa-green hover:text-white cursor-pointer transition-colors">
            <ArrowDownLeft />
            Request Money
          </button>
          <button  className="flex items-center justify-center gap-2 border border-pesa-slate/20 text-pesa-charcoal rounded-lg py-2.5 text-sm font-medium hover:bg-pesa-green hover:text-white transition-colors cursor-pointer">
            <UserPlus size={16} />
            Add Recipient
          </button>
        </div>

      </div>
      
      {/* Recent Transactions Module */}
      <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6">
        <h2 className="font-semibold text-pesa-charcoal">Recent Transactions</h2>
        <p className="text-sm text-pesa-slate mb-4">Your latest money transfers</p>

        <div className="divide-y divide-pesa-slate/10">
          {transactions.map((tx)=>{
            const isPositive=tx.amount>0;
            const Icon=isPositive ? ArrowDownLeft : ArrowUpRight;

            return(
              <div key={tx.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      isPositive
                      ? "bg-pesa-green/10 text-pesa-green" : "bg-red-50 text-red-500"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-pesa-charcoal">{tx.name}</p>
                    <p className="text-xs text-pesa-slate">{tx.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      isPositive ? "text-pesa-green" :"text-pesa-charcoal"
                    }`}
                  >
                  {isPositive ? "+" : ""}
                  {formatCurrency(tx.amount, tx.currency)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
     
    </div>
  )
}