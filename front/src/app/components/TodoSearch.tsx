"use client"
import React from "react";


interface TodoSearchProps {
    
    query:string;
    setQuery:(query:string) => void;
}
const TodoSearch:React.FC<TodoSearchProps> = ({ query, setQuery }) => {
    

    

    return (
        <div>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Todoを検索"
                className="text-2xl border-2 border-gray-400 p-2 rounded-md w-full my-3"
            />
        </div>
    )
}

export default TodoSearch;