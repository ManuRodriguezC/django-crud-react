import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api"

import { TaskCard } from "./TaslCard"

export function TaskList() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        
        async function loadTasks() {
            const res = await getAllTasks()
            console.log(res)
            setTasks(res.data)
        }
        loadTasks()
    }, [])

    return <div className="grid grid-cols-2 gap-3 mx-20">
        {tasks.map(task => (
            <TaskCard task={task} key={task.id}/>
        ))}
    </div>
}