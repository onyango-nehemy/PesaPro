// src/data/recipients.ts

export interface Recipient {
  id: string;
  name: string;
  country: string;
  email: string;
  account: string; 
}

export const recipientsData: Recipient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    country: "United Kingdom",
    email: "sarah.j@email.com",
    account: "GB29 NWBK 6016 1331 9268 19",
  },
  {
    id: "2",
    name: "Michael Chen",
    country: "Germany",
    email: "m.chen@email.com",
    account: "DE89 3704 0044 0532 0130 00",
  },
  {
    id: "3",
    name: "Emma Wilson",
    country: "France",
    email: "emma.w@email.com",
    account: "FR14 2004 1010 0505 0001 3M02 606",
  },
];