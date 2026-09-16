export interface Transaction{
    id:string;
    name:string;
    date:string;
    amount:number;
    currency:"USD" | "EUR" | "GBP";
    direction:"incoming" | "outgoing";
    status:"Completed" | "Pending" | "Failed";
}

export const transactionsData: Transaction[] = [
  { id: "1", name: "Bank Deposit", date: "May 3, 2026", amount: 25, currency: "USD", direction: "incoming", status: "Completed" },
  { id: "2", name: "New Recipient", date: "May 3, 2026", amount: 1000, currency: "USD", direction: "outgoing", status: "Pending" },
  { id: "3", name: "Sarah Johnson", date: "Oct 1, 2025", amount: 500, currency: "USD", direction: "outgoing", status: "Completed" },
  { id: "4", name: "Michael Chen", date: "Sep 28, 2025", amount: 1200, currency: "EUR", direction: "incoming", status: "Completed" },
  { id: "5", name: "Emma Wilson", date: "Sep 25, 2025", amount: 750, currency: "USD", direction: "outgoing", status: "Pending" },
  { id: "6", name: "David Brown", date: "Sep 22, 2022", amount: 2000, currency: "GBP", direction: "outgoing", status: "Completed" },
  { id: "7", name: "Lisa Anderson", date: "Sep 20, 2025", amount: 450, currency: "USD", direction: "incoming", status: "Completed" },
  { id: "8", name: "James Miller", date: "Sep 18, 2025", amount: 300, currency: "EUR", direction: "outgoing", status: "Failed" },
  { id: "9", name: "Sophie Taylor", date: "Sep 15, 2019", amount: 890, currency: "USD", direction: "outgoing", status: "Completed" },
  { id: "10", name: "Robert Garcia", date: "Sep 12, 2025", amount: 1500, currency: "GBP", direction: "incoming", status: "Completed" },
];