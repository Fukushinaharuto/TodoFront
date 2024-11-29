"use client"
import { useState, useEffect } from "react";
import { TodoMold } from "@/app/type";
import axios from "axios";

interface TodoEditProps {
    todo:TodoMold;
}
const TodoEdit = ({ todo }: TodoEditProps) => {
    
    const [isOpenTodoEdit, setIsOpenTodoEdit] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(todo.title);
    const [editDueDate, setEditDueDate] = useState<string>(todo.due_date || "")
    
    const handleToggleEdit = () => {
        setIsOpenTodoEdit((prev) => !prev);
    }

    const handleEdit = async() => {
        const token = localStorage.getItem('authToken');
        try
            {
                const response = await axios.patch(`http://127.0.0.1:8002/api/todos/${todo.id}`,
                {
                    title:editTitle,
                    due_date:editDueDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                alert("変更が完了しました。");
                setIsOpenTodoEdit(false);

        }catch(error){
            console.error("編集のエラー", error);
            alert("編集に失敗しました。もう一度お試しください。");
        }
    }   

    const handleCancel = () => {
        setEditTitle(todo.title);
        setEditDueDate(todo.due_date || "");
        setIsOpenTodoEdit(false);
    }


    return(
        <div>
            <button
                onClick={handleToggleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                編集
            </button>
            {isOpenTodoEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h1 className="text-xl font-bold mb-4">Todo編集</h1>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            onChange={(e) => setEditTitle(e.target.value)}
                            value={editTitle}
                            className="border p-2 w-full mb-4"
                        />
                        <label className="block mb-2">Date</label>
                        <input
                            type="date"
                            onChange={(e) => setEditDueDate(e.target.value)}
                            value={editDueDate}
                            className="border p-2 w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleEdit}
                                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                変更
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default TodoEdit;