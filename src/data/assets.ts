export type AssetCurrency = "USD" | "GBP" | "EUR";

export interface Asset {
  currency: AssetCurrency;
  balance: number;        
  apy: number;             
  interestEarned: number; 
}

export const assetsData: Asset[] = [
  { currency: "USD", balance: 5000, apy: 4.87, interestEarned: 243.5 },
  { currency: "GBP", balance: 3000, apy: 4.55, interestEarned: 136.5 },
  { currency: "EUR", balance: 2000, apy: 3.25, interestEarned: 65 },
];

// Money available in the wallet
export const availableBalancesData: Record<AssetCurrency, number> = {
  USD: 14861.58,
  GBP: 8200.0,
  EUR: 6500.0,
};