"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Logout = () => {

    const router = useRouter();
    const [error, setError] = useState<string|null>(null);

    const handleLogout = async() => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };
    return(
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    )
}
export default Logout;