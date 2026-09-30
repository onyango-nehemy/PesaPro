export type BatchCurrency = "USD" | "EUR" | "GBP";
export type BatchStatus = "Processing" | "Completed";

export interface Batch {
  id: string;
  fileName: string;
  recipients: number;  
  processed: number;   
  totalAmount: number; 
  currency: BatchCurrency;
  date: string;        
}

export function getBatchStatus(batch: Batch): BatchStatus {
  return batch.processed >= batch.recipients ? "Completed" : "Processing";
}

export const batchesData: Batch[] = [
  {
    id: "1",
    fileName: "freelancers_oct_2025.csv",
    recipients: 45,
    processed: 45,
    totalAmount: 28500,
    currency: "USD",
    date: "2025-10-01",
  },
  {
    id: "2",
    fileName: "suppliers_payment.csv",
    recipients: 12,
    processed: 8,
    totalAmount: 15200,
    currency: "EUR",
    date: "2025-10-03",
  },
];