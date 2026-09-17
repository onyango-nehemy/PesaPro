export interface Jar{
    id:string;
    name:string;
    saved:number;
    goal:number;
    currency: "USD" | "EUR" | "GBP";
    color:string;
};

export const jarsData: Jar[]=[
    {
        id: "1",
        name: "Emergency Fund",
        saved:6000,
        goal:10000,
        currency: "USD",
        color:"#1e3a8a",
    },

    {
        id: "2",
        name: "Vacation 2026",
        saved:2300,
        goal:5000,
        currency: "EUR",
        color:"#831843",
    },

    {
        id: "3",
        name: "New Car",
        saved: 8750,
        goal:15000,
        currency: "USD",
        color:"#14532d",
    },
]