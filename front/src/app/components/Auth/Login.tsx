"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginProps {
    email: string;
    password: string;
    token:string;
}

const AuthLogin = () => {
    const router = useRouter(); // routerに変更
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            // リクエストにwithCredentialsを追加して、クッキーを送信する
            const response = await axios.post<LoginProps>(`http://127.0.0.1:8002/api/login`, {
                email,
                password,
            });
            const token  = response.data.token;

            localStorage.setItem('authToken', token);

            setSuccess(true);
            // ログイン成功後、Todoページへリダイレクト
            router.push("/todos");
        } catch (error) {
            console.error("ログインエラー", error);
            setError("ログインに失敗しました")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl text-center mb-6">ログイン</h1>
                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700">メールアドレス</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">パスワード</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <Link 
                        prefetch href="/register" 
                        className="flex justify-end text-center text-sm mb-5 hover:text-blue-600">
                        新規登録はこちら
                    </Link>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
    
};

export default AuthLogin;
