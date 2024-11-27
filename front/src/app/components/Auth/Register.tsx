"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RegisterProps {
    user:{
        name:string;
        email:string;
        password:string;
    }
    token:string;
};

const AuthRegister = () => {

    const router = useRouter();
    
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false)

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // 送信時にエラーをリセット
        setSuccess(false); // 送信時に成功メッセージをリセット

        if (password !== passwordConfirmation) {
            setError("パスワードが一致しません。");
            return;
        }
        if(password.length <= 7){
            setError("パスワードを8文字以上にしてください。")
            return;
        }
        try{
            const response = await axios.post<RegisterProps>(`http://127.0.0.1:8002/api/register`, {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            const { token } = response.data
            localStorage.setItem('authToken', token);

            setSuccess(true);
            router.push("/login");
        }catch (error) {
            setError("新規登録に失敗しました。入力内容をご確認ください。");
            console.error("新規登録のエラー", error);
    }
}

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl text-center mb-6">新規登録</h1>
            <form onSubmit={handleRegister}>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">名前</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
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
                <div className="mb-4">
                    <label className="block text-gray-700">パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="8文字以上"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">パスワードの確認</label>
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <Link 
                    prefetch href="/login" 
                    className="flex justify-end text-center text-sm m-5 hover:text-red-600">
                        ログイン画面に移動する
                </Link>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    登録
                </button>
            </form>
        </div>
    </div>
);

}
export default AuthRegister;