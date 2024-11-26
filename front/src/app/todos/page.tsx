import Todoadd from '@/app/components/Todoadd';
import Navigation from '@/app/components/navigation';

function Todos() {
    

    return (
        <div>
            <Navigation/>
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
