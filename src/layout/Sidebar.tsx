"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import{
    LayoutDashboard,
    Send,
    Plus,
    ArrowDownToLine,
    ArrowLeftRight,
    CreditCard,
    User,
    Receipt,
    Users,
    Wallet,
    TrendingUp,
    CalendarClock,
    Layers,
    Settings,

}from "lucide-react"

const mainLinks=[
    {href:"/dashboard",label:"Dashboard",icon:LayoutDashboard},
    {href:"/send-money", label:"Send Money",icon:Send},
    {href:"/add-money",label:"Add Money",icon:Plus},
    {href:"/request-money",label:"Request Money", icon:ArrowDownToLine}
];

const manageLinks=[
    {href:"/convert", label:"Convert", icon:ArrowLeftRight},
    {href:"/cards", label:"Cards",icon:CreditCard},
    {href:"/account", label:"Account Details",icon:User},
    {href:"/transactions", label:"Transactions", icon:Receipt},
    {href:"/recipients", label:"Recipients",icon:Users}

];

const advancedLinks=[
    {href:"/jars", label:"Jars",icon:Wallet},
    {href:"/assets",label:"Assets",icon:TrendingUp},
    {href:"/schedule-transfers",label:"Schedule Transfers",icon:CalendarClock},
    {href:"/batch-payments",label:"Batch Payments",icon:Layers},
    
]

function NavSection({
    title,
    links,
    pathname
}:{
    title?:string;
    links:typeof mainLinks;
    pathname:string
}){
    return(
        <div className="mb-6">
            {title &&(
                <p className="text-xs font-semibold text-pesa-slate uppercase tracking-wide px-3 mb-2">{title}</p>
            )}
            <nav className="space-y-1">
                {links.map(({href,label,icon:Icon})=> {
                    const isActive= pathname ===href;
                    return(
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                ? "bg-pesa-green text-white"
                                : "text-pesa-charcoal hover:bg-pesa-cream"
                            }`}
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}

export default function Sidebar(){
    const pathname = usePathname();

    return(
        <aside className="w-64 h-screen border-r border-pesa-slate/15 bg-white flex flex-col justify-between  p-4">
            <div>
                <NavSection links={mainLinks} pathname={pathname}/>
                <NavSection title="Manage" links={manageLinks} pathname={pathname} />
                <NavSection title="Advanced" links={advancedLinks} pathname={pathname} />
            </div>
            <NavSection
                links={[{href:"/settings",label:"Profile & Settings",icon:Settings}]}
                pathname={pathname}
             />
        </aside>
    );
}