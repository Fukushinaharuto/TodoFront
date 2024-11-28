"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TodoMold } from '@/app/type';
import TodoUpdate from '@/app/components/TodoUpdate';
import TodoDelete from '@/app/components/TodoDelete';
import TodoSearch from "@/app/components/TodoSearch";
import { useRouter } from "next/navigation";




const Todoadd = () => {
    const token = localStorage.getItem('authToken');
    const router = useRouter();
    useEffect(() => {
            if(token === 'undefined'){
            console.error("アクセストークンが存在しません")
            router.push('/login');
        }
    },);

    const [todos, setTodos] = useState<TodoMold[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    

    const handleStatusChange = async(id:number, newStatus:boolean):Promise<void> => {
        try{
            await axios.patch<TodoMold[]>(`http://127.0.0.1:8002/api/todos/${id}`,
                {status:newStatus},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

        
            setTodos((prevTodos) => 
                prevTodos.map((todo) =>
                    todo.id === id ? {...todo, status: newStatus} : todo
                )
            );
        }catch(error){
            console.error("statusのエラー", error);
        }
    }

    const handleAddTodo = async():Promise<void> => {
        if (!newTodo.trim()) return;
        try{
            const response = await axios.post<TodoMold>(`http://127.0.0.1:8002/api/todos/`, 
                {
                title:newTodo,
                due_date:dueDate || null,
                status:false,
                },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            )

            setTodos((prevTodos) => [...prevTodos, response.data]);
            setNewTodo("");
            setDueDate("");
        }catch(error){
            console.error("追加のエラー", error);
        }
        
    }

    const handleDeleteTodo = async(id:number):Promise<void> => {
        try{
            await axios.delete(`http://127.0.0.1:8002/api/todos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
                setTodos((prevTodos) => prevTodos.filter((todo) =>todo.id !== id));
        }catch(error){
            console.error("削除のエラー", error);
        }
    }

    
    
    

    useEffect(() => {
        
        const helloLaravelApi = async():Promise<void> => {
            try {

                const response = await axios.get<TodoMold[]>(`http://127.0.0.1:8002/api/todos/`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: { query },
                }
                );
                console.log(response);
                setTodos(response.data);
            } catch (error) {
                console.error("APIエラー",error);
            }
        
        }
        
        helloLaravelApi();
    },[query]);

    return (
        <div className="p-2">
            
            
            <div className="max-w-5xl mx-auto">
                <input 
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="新しいTodoを入力"
                    className="text-2xl border-2 border-gray-400 p-2 rounded-md w-full my-3"
                />
                <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="text-2xl border-2 border-gray-400 p-2 rounded-md my-3 w-44"
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Todoを追加
                    </button>
                </div>
            </div>

            <TodoSearch 
                query={query}
                setQuery={setQuery}
            />

            <ul className="space-y-7 sm:text-2xl max-w-5xl mx-auto">
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center">
                            <TodoUpdate
                                
                                todo={todo}
                                onStatusChange={handleStatusChange}
                            />
                            
                            <TodoDelete
                                todoId={todo.id}
                                onDelete={handleDeleteTodo}
                            />
                        </li>
                    ))
                ) : (
                    <p key="empty">中身がありません</p>
                )}
            </ul>
        </div>
    );


}
export default Todoadd;