"use client";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Wallet,
    Lock,
    CreditCard,
    Copy,
    Bell,
    X,
} from "lucide-react";


//digital card data types defination

export type DigitalCardData={
    cardNumber:string;
    cvv:string;
    cardHolder:string;
    expiry:string;
};

//physical card data details
export type PhysicalCardData={
    id:string;
    lastFour:string;
    expiry:string;
    status:"active" | "frozen"
};

//order card form data type
export type OrderFormData={
    streetAddress:string;
    city:string;
    postalCode:string;
    country:string;

};

export default function CardPage(){
    const[digitalCard]=useState<DigitalCardData>({
        cardNumber: "5234875634214532",
        cvv: "123",
        cardHolder: "SARAH",
        expiry: "12/27",
    });

    const [showDetails,setShowDetails]=useState(false);
    const [copiedField,setCopiedField]=useState<"cardNumber" | "cvv" |null>(null)
    const [isSubmittingOrder,setIsSubmittingOrder]=useState(false);

    const formatCardNumber=(raw: string)=>{
       return  raw.replace(/(.{4})/g,"$1 ").trim();
    };

    const handleCopy=async(value:string, field:"cardNumber" | "cvv")=>{
        try{
            await navigator.clipboard.writeText(value);
            setCopiedField(field);
            setTimeout(()=>setCopiedField(null),2000);
        }catch(error){
            console.error("failed to copy", error);
        }
    };
    
    const handleToggleFreeze=(id:string)=>{
        setPhysicalCards((prev)=>
            prev.map((card)=>
                card.id === id
                    ? {...card,status:card.status === "active" ? "frozen" : "active"}
                    :card
            )
        );
    };

    const handleOrderCard = async () => {
        setIsSubmittingOrder(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const newCard: PhysicalCardData = {
                id: `card-${physicalCards.length + 1}`,
                lastFour: String(Math.floor(1000 + Math.random() * 9000)),
                expiry: "12/29",
                status: "active",
            };

            setPhysicalCards((prev) => [...prev, newCard]);
            setIsOrderModalOpen(false);
            setIsOrderForm({ streetAddress: "", city: "", postalCode: "", country: "United States" });
        } catch (error) {
            console.error("Failed to order card:", error);
        } finally {
            setIsSubmittingOrder(false);
        }
    };
    const formattedCardNumber=formatCardNumber(digitalCard.cardNumber);
    const maskedNumber=`•••• •••• •••• ${digitalCard.cardNumber.slice(-4)}`;
    const displayedCardNumber= showDetails ? formattedCardNumber : maskedNumber;

    //physical cards should be an array
    const [physicalCards,setPhysicalCards]=useState<PhysicalCardData[]>([
        {
            id: "card-1",
            lastFour: "4532",
            expiry: "12/27",
            status: "active",
        },
    ]);

    //ordermodal states
    const [isOrderModalOpen,setIsOrderModalOpen]=useState(false);
    const [orderForm,setIsOrderForm]=useState<OrderFormData>({
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "United States",
    });
    const isOrderFormValid =
        orderForm.streetAddress.trim() !== "" &&
        orderForm.city.trim() !== "" &&
        orderForm.postalCode.trim() !== "";


    return(
        <div className="px-6 py-8">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-pesa-slate mb-4"

            ><ArrowLeft size={16}/> Back to dashboard</Link>
            <h2 className="text-2xl font-semibold text-pesa-charcoal">Cards</h2>
            <p className="text-xs text-pesa-slate mb-6">Manage your WisePro debit cards</p>

            <div className="space-y-4 mb-3">
                {/**Digital Card Section */}
                <div className="bg-white border-y border-r border-pesa-slate/20 p-6 rounded-2xl">
                    <h2 className="text-sm text-pesa-charcoal font-semibold">Digital Card</h2>
                    <p className="text-xs text-pesa-slate mb-6">Use online or add to your mobile wallet</p>

                    {/**Card building itself */}
                    <div className="flex justify-center mb-6">
                        <div className="w-80 h-48 rounded-2xl  bg-gradient-to-br from-pesa-green to-green-600 p-5 flex flex-col justify-between text-white shadow-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-semibold">PesaPro</p>
                                    <p className="text-xs text-green-100">Debit Card</p>
                                </div>
                                <div className="flex gap-0.5 opacity-90">
                                    <div className="w-4 h-4 rounded-full border-4 border-white"/>
                                    <div className="w-4 h-4 rounded-full border-4 border-white -ml-1.5"/>
                                </div>
                            </div>
                            <p className="text-lg tracking-widest font-medium ">{displayedCardNumber}</p>
                            <div className="flex justify-between items-end  text-xs">
                                <div>
                                    <p className="text-green-100">Card Holder</p>
                                    <p className="font-medium">{digitalCard.cardHolder}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-100">Expires</p>
                                    <p className="font-medium">{digitalCard.expiry}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**SHOW/HIDE toggle button */}
                    <div className="flex justify-center mb-4">
                        <button
                            type="button"
                            onClick={()=>setShowDetails(!showDetails)}
                            className="flex cursor-pointer items-center gap-2 text-xs text-pesa-slate border border-pesa-slate/20 rounded-lg px-3 py-1.5 hover:bg-gray-100"
                        >
                            {showDetails ? <EyeOff size={14} /> :<Eye size={14} />}
                            {showDetails ? "Hide Details " : "Show Details"}
                        </button>
                    </div>
                    {/**Show details / hide truthy condition */}
                    {showDetails && (
                        <div className="bg-gray-50  rounded-lg p-4 mb-4 flex justify-between text-sm">
                            <div>
                                <p className="text-xs text-pesa-slate mb-1">Card Number</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-pesa-charcoal font-medium">{formattedCardNumber}</span>
                                    <button
                                        type="button"
                                        onClick={()=>handleCopy(digitalCard.cardNumber,"cardNumber")}
                                        className="text-pesa-slate cursor-pointer hover:text-pesa-charcoal"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    {copiedField === "cardNumber" &&(
                                        <span className="text-xs text-pesa-green">Copied!</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-pesa-slate mb-1">CVV</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-pesa-charcoal font-medium">{digitalCard.cvv}</span>
                                    <button
                                        type="button"
                                        onClick={()=>handleCopy(digitalCard.cvv,"cvv")}
                                        className="text-pesa-slate cursor-pointer hover:text-pesa-charcoal"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    {copiedField === "cvv" &&(
                                        <span className="text-xs text-pesa-green">Copied!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/**Button actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex-1 flex items-center cursor-pointer justify-center gap-2 border border-pesa-slate/20 rounded-lg text-pesa-charcoal hover:bg-gray-100"
                        >
                            <Wallet size={16} /> Add to Wallet
                        </button>
                        <button
                            type="button"
                            className="flex-1 flex items-center cursor-pointer justify-center gap-2 border border-pesa-slate/20 rounded-lg text-pesa-charcoal hover:bg-gray-100"
                        >
                            <Lock size={16} />Card Settings
                        </button>
                    </div>
                </div>
            </div>

            {/**Physical Card sections */}
            <div className="bg-white border border-pesa-slate/15  p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-sm text-pesa-charcoal font-semibold">Physical Cards</h2>
                        <p className="text-xs text-pesa-slate">Order and manage your physical debit cards</p>
                    </div>
                    <button
                        type="button"
                        onClick={()=>setIsOrderModalOpen(true)}
                        className="flex cursor-pointer hover:bg-blue-900 items-center gap-2 bg-pesa-green text-white text-sm rounded-lg px-4 py-2"
                    >
                        <CreditCard size={14}/> Order Card
                    </button>
                </div>
                <div className="space-y-3">
                    {physicalCards.map((card)=>(
                        <div
                            key={card.id}
                            className="flex items-center justify-between border border-pesa-slate/15 rounded-lg p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-green-900 rounded-lg p-2">
                                    <CreditCard size={20} className="text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-pesa-charcoal font-medium">
                                            •••• {card.lastFour}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                                card.status === "active"
                                                ? "bg-green-700 text-white"
                                                : "bg-gray-100 text-pesa-slate"
                                            }`}
                                        >
                                            {card.status === "active" ? "Active" : "Frozen"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-pesa-slate">Expires {card.expiry}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={()=>handleToggleFreeze(card.id)}
                                className="text-sm font-semibold border cursor-pointer border-pesa-slate/20 rounded-lg px-4 py-1.5 text-pesa-charcoal hover:bg-gray-100"
                
                            >
                                {card.status === "active" ? "Freeze" : "Unfreeze"}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
            {/* Card Benefits section */}
            <div className="bg-white rounded-2xl border border-pesa-slate/15 p-6 mt-4">
                <h2 className="text-sm text-pesa-charcoal font-semibold">Card Benefits</h2>
                <p className="text-xs text-pesa-slate mb-4">What you get with your WisePro card</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-green-900 rounded-full p-2 shrink-0">
                            <Wallet size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-pesa-charcoal font-medium">No Foreign Transaction Fees</p>
                            <p className="text-xs text-pesa-slate">Spend abroad without hidden charges</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-green-900 rounded-full p-2 shrink-0">
                            <CreditCard size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-pesa-charcoal font-medium">Real Exchange Rates</p>
                            <p className="text-xs text-pesa-slate">Always get the mid-market rate</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-green-900 rounded-full p-2 shrink-0">
                            <Lock size={16} className="text-white" />
                        </div>
                    <div>
                        <p className="text-sm text-pesa-charcoal font-medium">Contactless Payments</p>
                        <p className="text-xs text-pesa-slate">Fast and secure transactions</p>
                    </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-green-900 rounded-full p-2 shrink-0">
                            <Bell size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-pesa-charcoal font-medium">Instant Notifications</p>
                            <p className="text-xs text-pesa-slate">Get notified for every transaction</p>
                        </div>
                    </div>
            </div>
        </div>
            {/**Order Card Modal */}
            {isOrderModalOpen &&(
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto w-full max-w-md">
                        <div className="flex justify-between  items-start mb-1">
                            <h2 className="text-lg font-semibold text-pesa-charcoal">Order Physical Card</h2>
                            <button
                                type="button"
                                onClick={()=>setIsOrderModalOpen(false)}
                                className="cursor-pointer text-pesa-slate hover:text-pesa-charcoal"
                            >
                                <X  size={18}/>
                            </button>
                        </div>
                        <p className="text-xs text-pesa-slate mb-1">Your card will be delivered in 5-7 business days.</p>
                        <p className="text-xs text-pesa-slate mb-5"> FREE shipping.</p>
                        {/** stress addresss */}
                        <label className="block text-sm text-pesa-slate font-semibold mb-1">Street Address</label>
                        <input
                            type="text"
                            placeholder="123 Main Street"
                            value={orderForm.streetAddress}
                            onChange={(e)=>setIsOrderForm((prev)=>({...prev,streetAddress:e.target.value}))}
                            className="w-full  border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 text-sm outline-none mb-4"
                        />
                        <div className="grid  grid-cols-2 gap-3  mb-4">
                            <div>
                                <label className="block text-sm text-pesa-slate font-semibold mb-1">City</label>
                                <input
                                    type="text"
                                    value={orderForm.city}
                                    onChange={(e)=>setIsOrderForm((prev)=>({...prev,city:e.target.value}))}
                                    placeholder="New York"
                                    className="w-full border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 text-sm outline-none mb-4"
                                />
                            </div>
                            <div>
                                <label className="block text-sm  text-pesa-slate font-semibold  mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    value={orderForm.postalCode}
                                    placeholder="10001"
                                    onChange={(e)=>setIsOrderForm((prev)=>({...prev,postalCode:e.target.value}))}
                                    className="w-full border border-pesa-slate/20 rounded-lg px-2 py-3 bg-gray-100 text-sm outline-none "
                                />
                            </div>
                        </div>
                        {/**country */}
                        <label className="block text-sm text-pesa-slate  font-semibold mb-1">Country</label>
                        <select 
                            value={orderForm.country}
                            onChange={(e)=>setIsOrderForm((prev)=>({...prev,country:e.target.value}))}
                            className="w-full border cursor-pointer  border-pesa-slate/20 rounded-lg  px-2 py-3 bg-gray-100 text-sm outline-none mb-4" 
                        >
                            <option value="United States">United States</option>
                            <option value="Kenya">Kenya</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                        <div className="bg-gray-100 rounded-lg  p-3  flex gap-1 flex-col items-center mb-5">
                            <Wallet className="text-pesa-green shrink-0 mt-0.5" size={16}/>
                            <h2 className="text-sm text-pesa-charcoal font-medium">Free Delivery</h2>
                            <p className="text-xs text-pesa-slate">Your card will arrive in 5-7 business days at no cost</p>
                        </div>
                        {/**Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOrderModalOpen(false)}
                                className="flex-1 border cursor-pointer border-pesa-slate/20 rounded-lg py-2 text-sm text-pesa-charcoal hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleOrderCard}
                                disabled={isSubmittingOrder || !isOrderFormValid}
                                className="flex-1 bg-pesa-green text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50 hover:bg-blue-900 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {isSubmittingOrder ? "Ordering..." : "Order Now"}
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )

}