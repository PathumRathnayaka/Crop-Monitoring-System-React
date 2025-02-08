import React from "react";
import { Search, User, Settings } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-[#16a34a] px-6 py-4 shadow">

            <div className="flex items-center space-x-4">
                <Search className="h-6 w-6 text-white" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-green-600 focus:ring-green-600"
                />
            </div>


            <div className="flex items-center space-x-6">

                <div className="flex items-center space-x-2">
                    <User className="h-6 w-6 text-white" />
                    <span className="text-sm font-medium text-white">Pathum</span>
                </div>

                <button>
                    <Settings className="h-6 w-6 text-white hover:text-green-600" />
                </button>
            </div>
        </header>
    );
}
