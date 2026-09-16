interface AccountField{
    label:string;
    value:string;
    copyable:boolean;
}

export interface BankDetails{
    bankName:string;
    bankAddress:string;
    swiftBic?:string;
    swiftBicCopyable?:boolean;
}

interface CurrencyAccount{
    currency: "USD" | "EUR" | "GBP"
    title:string;
    subtitle:string;
    accountFields:AccountField[];
    bankDetails:BankDetails;
}

export const accountDetailsData: Record<"USD" | "EUR" | "GBP", CurrencyAccount>={
    USD:{
        currency:"USD",
        title:"US Dollar Account",
        subtitle:"Use these details to receive USD payments via ACH or Wire",
        accountFields:[
            {
                label:"Account Holder",
                value:"SARAH",
                copyable:false,
            },
            {
                label:"Account Number",
                value: "8310006321",
                copyable:true,
            },
            {
                label: "Routing Number (ACH)",
                value:"026073150",
                copyable:true,
            },
            {
                label:"Account Type",
                value:"Checking",
                copyable:false,
            }
        ],
        bankDetails:{
            bankName: "Community Federal Savings Bank",
            bankAddress: "89-16 Jamaica Ave, Woodhaven, NY 11421, USA",
            swiftBic: "CMFGUS33",
            swiftBicCopyable: false,
        },
    },
    EUR:{
        currency:"EUR",
        title: "Euro Account",
        subtitle: "Use these details to receive EUR payments via SEPA",
        accountFields: [
            { label: "Account Holder", value: "sheraz", copyable: false },
            { label: "IBAN", value: "BE68 5390 0754 7034", copyable: true },
            { label: "BIC/SWIFT", value: "TRWIBEB1XXX", copyable: true },
        ],
        bankDetails: {
            bankName: "Wise Europe SA",
            bankAddress: "Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium",
        },
    },
    GBP:{
        currency:"GBP",
        title: "British Pound Account",
        subtitle: "Use these details to receive GBP payments via Faster Payments or BACS",
        accountFields: [
            { label: "Account Holder", value: "sheraz", copyable: false },
            { label: "Account Number", value: "73152489", copyable: true },
            { label: "Sort Code", value: "23-14-70", copyable: true },
            { label: "IBAN", value: "GB33 BUKB 2314 7073 1524 89", copyable: true },
        ],
        bankDetails: {
            bankName: "Wise Payments Limited",
            bankAddress: "56 Shoreditch High Street, London, E1 6JJ, UK",
            swiftBic: "TRWIGB22",
            swiftBicCopyable: true,
        },
    },
    
};