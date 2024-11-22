"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Logout = () => {

    const redirectLogin = useRouter();
    const [error, setError] = useState<string|null>(null);

    const handleLogout = async() => {
        setError(null);
        try{
            await axios.post(`http://127.0.0.1:8002/api/logout`, {}, {
                withCredentials: true,
            });
            redirectLogin.push("/login");
        }catch(error){
            console.error("ログアウトのエラー", error);
            setError("ログアウトに失敗しました。もう一度お試しください。");
        }
    }
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