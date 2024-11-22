import Todoadd from '@/app/components/Todoadd';
import Logout from "@/app/components/Auth/Logout";
import UserName from "@/app/components/Auth/UserName";

function Todos() {
    

    return (
        <div>
            <UserName/>
            <Logout/>
            <Todoadd/>
        </div>
    );
}

export default Todos;
