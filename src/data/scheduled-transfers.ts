export type TransferCurrency = "USD" | "EUR" | "GBP";
export type TransferFrequency = "Weekly" | "Monthly";
export type TransferStatus = "Active" | "Paused";

export interface ScheduledTransfer {
  id: string;
  name: string;
  amount: number;
  currency: TransferCurrency;
  frequency: TransferFrequency;
  status: TransferStatus;
  startDate: string; 
  nextDate: string;  
}

export const scheduledTransfersData: ScheduledTransfer[] = [
  {
    id: "1",
    name: "Rent Payment",
    amount: 1500,
    currency: "USD",
    frequency: "Monthly",
    status: "Active",
    startDate: "2025-01-01",
    nextDate: "2025-11-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    amount: 200,
    currency: "USD",
    frequency: "Weekly",
    status: "Active",
    startDate: "2025-09-01",
    nextDate: "2025-10-10",
  },
  {
    id: "3",
    name: "Mom - Monthly Support",
    amount: 500,
    currency: "EUR",
    frequency: "Monthly",
    status: "Paused",
    startDate: "2025-05-01",
    nextDate: "2025-10-15",
  },
];