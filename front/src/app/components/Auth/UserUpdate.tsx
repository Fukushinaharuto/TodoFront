"use client"
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { loginUserProps } from "@/app/components/Auth/UserName";

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
    return(
        <div>
            <ul>

                <li>
                    <label>名前：</label>
                    <input 
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    
                    />
                </li>

                <li>
                    <label>メールアドレス：</label>
                    <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                </li>

                <li>
                    <label>パスワード：</label>
                    <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="変更しない場合は空白にしてください"
                    />
                </li>

                <li>
                    <label>パスワードの確認</label>
                    <input 
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="もう一度パスワードを入力してください"
                    />
                </li>
            
            
            </ul>
            <button
            onClick={handleProfile}
            >
                変更
            </button>
        </div>
    )
}
export default UserUpdate;