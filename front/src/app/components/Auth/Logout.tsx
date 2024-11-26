
import { useRouter } from "next/navigation";


const Logout = () => {

    const router = useRouter();

    const handleLogout = async() => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };
    return(
        <div>
            <button
                onClick={handleLogout}
                className="block text-center text-blue-500 hover:bg-blue-100 p-2 w-full"
            >
                Logout
            </button>
        </div>
    )
}
export default Logout;