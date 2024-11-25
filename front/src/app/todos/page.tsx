import Todoadd from '@/app/components/Todoadd';
import Logout from "@/app/components/Auth/Logout";
import UserName from "@/app/components/Auth/UserName";

function Todos() {
    

    return (
        <div>
            <nav className='flex items-center justify-end space-x-20 p-2'>
                <Logout/>
                <UserName/>
            </nav>
            <div className="bg-blue-100">
                <div className="max-w-5xl mx-auto p-3">
                    <h1 className="text-5xl">Todoアプリ</h1>
                </div>
            </div>
            
            
            <Todoadd/>
        </div>
    );
}

export default Todos;
