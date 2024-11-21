"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"

interface LoginProps {
    email:string;
    password:string;
}
const AuthLogin = () => {
    const redirectTodos = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try{
            await axios.post<LoginProps>(`http://127.0.0.1:8002/api/login`, {
                email,
                password,
            });

            setSuccess(true);
        }catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("ログインエラー", error.response.data);
                setError(`ログインに失敗しました: ${error.response.data.message || '不明なエラー'}`);
            } else {
                setError("ログインに失敗しました。サーバーに接続できません。");
            }
    }
}
    return(
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
                        <label>パスワード</label>
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
    )
}
export default AuthLogin;