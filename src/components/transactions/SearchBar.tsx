import { Search } from "lucide-react";

interface SearchBarProps{
    searchTerm:string;
    onSearchChange:(value:string)=>void;
}

export default function SearchBar({searchTerm,onSearchChange}:SearchBarProps){
    return(
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input 
                type="text"
                value={searchTerm}
                onChange={(e)=>onSearchChange(e.target.value)}
                placeholder="Search transactions..."
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-300"
            />
        </div>
    )
}