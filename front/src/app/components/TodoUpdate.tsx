"use client"
import React,{ useState } from "react";
import { TodoMold } from '@/app/type';

interface TodoItemProps {
    todo:TodoMold;
    onStatusChange: (id:number, newStatus:boolean) => void;
}

const TodoUpdate:React.FC<TodoItemProps> = ({ todo, onStatusChange }) => {
    const handleButtonClick = () => {
        onStatusChange(todo.id, !todo.status)
    }
    return(
        <div key={todo.id}>
            <h3 className="text-4xl">{todo.title}</h3>
            <p>{todo.due_date ? `期限：${todo.due_date}` : ""}</p>
            <p className={todo.status ? "text-green-500" : "text-red-500"}>
                {todo.status ? <button onClick={handleButtonClick}>完了</button> : <button onClick={handleButtonClick}>完了にする</button>}
            </p>
                            
        </div>
    )
}
export default TodoUpdate;
