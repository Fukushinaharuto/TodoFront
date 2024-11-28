"use client"
import { useState } from "react";

const TodoEdit = () => {
    const [isOpenTodoEdit, setIsOpenTodoEdit] = useState<boolean>(false);
    const handleTodoEdit = () => {

    } 
    
    const handleToggleEdit = () => {
        setIsOpenTodoEdit((prev) => !prev);
    }
    return(
        <div>
            <button
                onClick={handleToggleEdit}>

            </button>
        </div>
    )
}
export default TodoEdit;