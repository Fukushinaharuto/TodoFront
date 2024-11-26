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
    return(
        <div className="relative">
            <nav className='flex justify-end space-x-10 p-2 max-w-5xl mx-auto'>
                
                <button
                onClick={handleToggle}
                className="text-gray-700 font-medium"
                >
                    <UserName/>
                </button>
                {isOpen && (
                    <div className="absolute top-full right-0 w-28 bg-white border border-gray-200 shadow-md rounded-md">
                        <Logout/>
                        <Link href="/profile" className="block text-center text-blue-500 hover:bg-blue-100 p-2 w-full">
                            profile
                        </Link>
                    </div>
                    
                )}
                
                    
            </nav>
        </div>
    )
}
export default Navigation;