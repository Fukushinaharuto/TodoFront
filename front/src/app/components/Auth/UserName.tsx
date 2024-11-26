"use client"
import axios from "axios";
import { useState, useEffect } from "react";

export interface loginUserProps {
  name:string;
  email:string;
}
const UserName = () => {
  const [userName, setUserName] = useState<string|null>(null);

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
      }
    }
    loginUser();
  },[])
  return(
    <div>
      <p>{ userName }</p>
    </div>
  )


}
export default UserName;