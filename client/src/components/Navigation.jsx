import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="flex justify-around py-8">
            <Link to="/tasks">
                <h1 className="font-bold text-3xl mb-4">Task App</h1>
            </Link>
            <Link to="/tasks-create" className="bg-indigo-500 px-3 py-2 rounded-lg">Create task</Link>
        </div>
    )
}