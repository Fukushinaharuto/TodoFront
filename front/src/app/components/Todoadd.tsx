"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TodoMold } from '@/app/type';
import TodoUpdate from '@/app/components/TodoUpdate';
import TodoDelete from '@/app/components/TodoDelete';
import TodoSearch from "@/app/components/TodoSearch";



const Todoadd = () => {

    const [todos, setTodos] = useState<TodoMold[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    const helloLaravelApi = async():Promise<void> => {
        try {
        const response = await axios.get<TodoMold[]>(`http://127.0.0.1:8002/api/todos/`,{
            params: { query },
        }
        );
        console.log(response);
        setTodos(response.data);
    } catch (error) {
        console.error("APIエラー",error);
    }
    
    }

    const handleStatusChange = async(id:number, newStatus:boolean):Promise<void> => {
        try{
            const response = await axios.patch<TodoMold[]>(`http://127.0.0.1:8002/api/todos/${id}`,{
                status:newStatus,
            });

        
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
            const response = await axios.post<TodoMold>(`http://127.0.0.1:8002/api/todos/`, {
                title:newTodo,
                due_date:dueDate || null,
                status:false,
            })

            setTodos((prevTodos) => [...prevTodos, response.data]);
            setNewTodo("");
            setDueDate("");
        }catch(error){
            console.error("追加のエラー", error);
        }
        
    }

    const handleDeleteTodo = async(id:number):Promise<void> => {
        try{
            await axios.delete(`http://127.0.0.1:8002/api/todos/${id}`);
                setTodos((prevTodos) => prevTodos.filter((todo) =>todo.id !== id));
        }catch(error){
            console.error("削除のエラー", error);
        }
    }

    
    
    

    useEffect(() => {
        helloLaravelApi();
    },[query]);

    return (
        <div>
            
            <div className="bg-blue-100">
                <div className="max-w-5xl mx-auto p-3">
                    <h1 className="text-5xl">Todoアプリ</h1>
                </div>
            </div>
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
                    className="text-2xl border-2 border-gray-400 p-2 rounded-md w-full my-3"
                />
                <button
                    onClick={handleAddTodo}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Todoを追加
                </button>
            </div>

            <TodoSearch 
            
            query={query}
            setQuery={setQuery}/>

            <ul className="space-y-7 sm:text-2xl mx-4">
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