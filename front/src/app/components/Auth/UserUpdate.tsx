"use client"
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { loginUserProps } from "@/app/components/Auth/UserName";
import Link from "next/link";

interface handleProfileProps{
    name:string;
    email:string;
    password:string;
    token:string;
}
const UserUpdate = () => {
    const token = localStorage.getItem('authToken');
    const router = useRouter();
    useEffect(() => {
        if(token === 'undefined'){
        console.error("アクセストークンが存在しません")
        router.push('/login');
    }
    },);


    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

    useEffect(() => {
        const ProfileData = async() => {
            try{
            
                const response = await axios.get<loginUserProps>('http://127.0.0.1:8002/api/userName',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })  
                setName(response.data.name);
                setEmail(response.data.email);
            }catch(error){
                console.error('ユーザー情報取得のエラー', error)
            }
        }
        ProfileData();
        
    },[])

    const handleProfile = async() => {
        if (password !== passwordConfirmation) {
            alert("パスワードが一致しません。");
            return;
        }
        if(password.length <= 7){
            alert("パスワードを8文字以上にしてください。")
            return;
        }
        try{
            const updateData = {
                name:name,
                email:email,
                password:password,
            }
            const response = await axios.patch<handleProfileProps>(`http://127.0.0.1:8002/api/profile`,updateData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.data.token){
                localStorage.removeItem('authToken')
                localStorage.setItem('authToken', response.data.token);
            }
            setName(response.data.name);
            setEmail(response.data.email);
            alert("プロフィールの更新が成功しました")
        
        }catch(error){
            console.error('ユーザー情報変更のエラー', error)
            alert("プロフィールの更新に失敗しました");
        }
        
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl text-center mb-6">プロフィール</h1>
                <ul className="space-y-4">
                    <li>
                        <label className="block text-gray-700">名前</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </li>
                    <li>
                        <label className="block text-gray-700">メールアドレス</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </li>
                    <li>
                        <label className="block text-gray-700">パスワード</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="変更しない場合は空白にしてください"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </li>
                    <li>
                        <label className="block text-gray-700">パスワードの確認</label>
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="もう一度パスワードを入力してください"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </li>
                </ul>
                
                <button
                    onClick={handleProfile}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-6"
                >
                    変更
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
export default UserUpdate;