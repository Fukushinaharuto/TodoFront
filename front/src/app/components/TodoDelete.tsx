import React from "react";

interface TodoDeleteProps {
    todoId:number;
    onDelete:(id:number) => void;
}

const TodoDelete:React.FC<TodoDeleteProps> = ({todoId, onDelete}) => {
    const handleDelete = () =>{
        onDelete(todoId);
    };

    return(
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
            削除
        </button>
    )
}
export default TodoDelete;