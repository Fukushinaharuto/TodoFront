"use client"
import axios from "axios";
import { useState, useEffect } from "react";

interface loginUserProps {
  name:string;
}
const UserName = () => {
  const [userName, setUserName] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);
 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    const loginUser = async() => {
      try{
        const response = await axios.get<loginUserProps>(`http://127.0.0.1:8002/api/userName`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUserName(response.data.name);
      }catch(error){
        console.error('ユーザネームのエラー', error);
        setError('ユーザーの名前が取得できませんでした。再度ログインしください。')
      }
    }
    loginUser();
  },[])
  return(
    <div>
      <p>ユーザー名:{ userName }</p>
      <p>{ error }</p>
    </div>
  )


}
export default UserName;