interface CurrencyTabsProps{
    activeCurrency:"USD" | "EUR" | "GBP";
    onChange:(currency:"USD" | "EUR" | "GBP")=> void;
}

const currencies:("USD" | "EUR" | "GBP")[]=["USD","EUR","GBP"];

export default function CurrencyTabs({activeCurrency,onChange}:CurrencyTabsProps){
    return(
        <div
            className="inline-flex rounded-lg bg-gray-100 p-1"
        >
            {currencies.map((currency)=>(
                <button
                    key={currency}
                    onClick={()=>onChange(currency)}
                    className={`px-6 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors ${
                        activeCurrency === currency
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500  hover:text-gray-700"
                    }`}
                >
                    {currency}
                </button>
            ))}
        </div>
    )

}