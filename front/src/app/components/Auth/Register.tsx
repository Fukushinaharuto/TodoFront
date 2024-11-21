"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterProps {
    name:string;
    email:string;
    password:string;
};

const AuthRegister = () => {

    const redirectLogin = useRouter();
    
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
            await axios.post<RegisterProps>(`http://127.0.0.1:8002/api/register`, {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setSuccess(true);
            redirectLogin.push("/login");
        }catch (error) {
            setError("新規登録に失敗しました。入力内容をご確認ください。");
            console.error("新規登録のエラー", error);
    }
}

    return(
        <div>
            <h1>新規登録</h1>
                <form onSubmit={handleRegister}>
                    {error && <p className="text-red">{error}</p>}
                    <div>
                        <label>名前：</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div>
                        <label>パスワードの確認</label>
                        <input 
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">登録</button>
                </form>
        </div>
    );
}
export default AuthRegister;