"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleLogin}>
                {error && <p className="text-red">{error}</p>}
                <div>
                    <label>メールアドレス：</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>パスワード：</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default AuthLogin;
