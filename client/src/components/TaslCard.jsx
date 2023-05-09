import { useNavigate } from "react-router-dom"

export function TaskCard( {task} ) {
    const navigate = useNavigate()

    return (
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded-lg" onClick={() => navigate(`/tasks/${task.id}`)}>
                <h1 className="font-bold uppercase">{task.title}</h1>
                <h3 className="text-slate-400">{task.description}</h3>
        </div>
    )
}