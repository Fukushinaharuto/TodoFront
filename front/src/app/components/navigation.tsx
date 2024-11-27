"use client"
import Logout from "@/app/components/Auth/Logout";
import UserName from "@/app/components/Auth/UserName";
import Link from "next/link"
import { useState } from "react";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    }
    return (
        <div className="relative max-w-5xl">
            <nav className="p-2">
                <div className="relative">
                    <button
                        onClick={handleToggle}
                        className="text-gray-700 font-medium"
                    >
                        <UserName />
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-28 bg-blue-500 border border-gray-200 shadow-md rounded-md">
                            <Logout />
                            <Link
                                prefetch
                                href="/profile"
                                className="block text-center rounded-md text-white bg-blue-500 hover:bg-blue-600 p-2 w-full"
                            >
                                Profile
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
    
}
export default Navigation;