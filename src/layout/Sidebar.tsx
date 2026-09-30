"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    LogOut,

}from "lucide-react"
import { clearUserName } from "@/lib/session";

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
    pathname,
    onLinkClick,
}:{
    title?:string;
    links:typeof mainLinks;
    pathname:string;
    onLinkClick?: () => void;
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
                            onClick={onLinkClick}
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

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps){
    const pathname = usePathname();
    const router = useRouter();

    function handleLogout() {
        clearUserName();
        onClose();
        router.push("/login");
    }

    return(
        <>
            {/* Backdrop: only rendered on mobile while the drawer is open */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-pesa-slate/15 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                    <NavSection links={mainLinks} pathname={pathname} onLinkClick={onClose} />
                    <NavSection title="Manage" links={manageLinks} pathname={pathname} onLinkClick={onClose} />
                    <NavSection title="Advanced" links={advancedLinks} pathname={pathname} onLinkClick={onClose} />
                </div>

                <div className="shrink-0 border-t border-pesa-slate/15 p-4">
                    <NavSection
                        links={[{href:"/settings",label:"Profile & Settings",icon:Settings}]}
                        pathname={pathname}
                        onLinkClick={onClose}
                    />

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}