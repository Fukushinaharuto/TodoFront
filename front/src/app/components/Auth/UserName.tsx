"use client"
import axios from "axios";
import { useState, useEffect } from "react";

const UserName = () => {
    const [userName, setUserName] = useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        async function fetchUserName() {
          try {
            const response = await axios.get("http://127.0.0.1:8002/api/check-login", {
              withCredentials: true,
            });
            setUserName(response.data.user?.name || "ゲスト");
          } catch (error: any) {
            if (error.response && error.response.status === 401) {
              setError("ログインしていません");
            } else {
              setError("エラーが発生しました");
            }
          }
        }
    
        fetchUserName();
      }, []);
    
      if (error) {
        return <p>{error}</p>;
      }
    
      return <p>ログインユーザー: {userName}</p>;
    
}
export default UserName;