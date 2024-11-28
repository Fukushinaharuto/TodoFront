"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface passwordAuthProps {
    permission:string;
}

const UserFetch = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const router = useRouter();
    

    const verifyPassword = async() => {
        try{
            const token = localStorage.getItem("authToken");
            if(!token){
                alert("ログインしてください。");
                router.push("/login");
                return;
            }

            const response = await axios.post<passwordAuthProps>(`http://127.0.0.1:8002/api/passwordAuth`,
                { password: currentPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const permission = response.data.permission
            localStorage.setItem('passwordAuth', permission);
            router.push('/todos/userFetch/profile');

        }catch(error) {
            alert("パスワードが正しくありません。もう一度入力してください。");
            console.error("パスワード認証エラー", error);
            return
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">本人確認</h1>
                <div className="mb-4">
                    <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        現在のパスワードを入力してください
                    </label>
                    <input
                        id="current-password"
                        type="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        placeholder="パスワード"
                    />
                </div>
                <button
                    onClick={verifyPassword}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    確定
                </button>
                <div className="flex justify-end">
                    <Link
                        prefetch href="/todos"
                        className="block w-28 bg-green-500 text-white py-2 rounded-md mt-6 text-center hover:bg-green-600">
                            ホームに戻る
                    </Link>
                </div>
            </div>
        </div>
    );
    
}
export default UserFetch;