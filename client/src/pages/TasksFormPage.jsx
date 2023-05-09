import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { createTask, deleteTask, getTask, updateTask } from '../api/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function TasksFormPage() {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()

    const navigate = useNavigate()

    const params = useParams()

    const onSubmit = handleSubmit(async data => {
        if(params.id) {
            await updateTask(params.id, data)
            toast.success('Update Success', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff",
                    fontSize: "35px"
                }
            })
        } else {
        await createTask(data)
        toast.success('Created Success', {
            position: "bottom-right",
            style: {
                background: "#101010",
                color: "#fff",
                fontSize: "35px"
            }
        })
        }
        navigate("/tasks")
    })

    useEffect(() => {

        async function loadTask() {
            if (params.id) {
                const res = await getTask(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
            }
        } 
        loadTask() 
    }, [])

    return (
        <div className='max-w-xl mx-auto mt-30'>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>Este titulo es requerido</span>}

                <textarea
                    rows="3"
                    placeholder="Description"
                    {...register("description", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>La descripcion es requerida</span>}

                {
                    !params.id && <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
                }
                {
                    params.id && <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Update</button>
                }
            </form>
            {
                params.id && <button
                    className='bg-red-500 p-3 rounded-lg block mx-auto mt-3'
                    onClick={async () => {
                    const accepted = window.confirm("Estas seguro de eliminar")
                    if(accepted) {
                        await deleteTask(params.id)
                        toast.success('Delete Success', {
                            position: "bottom-right",
                            style: {
                                background: "#101010",
                                color: "#fff",
                                fontSize: "35px"
                            }
                        })
                        navigate("/tasks")
                    }
                }}>Delete</button>
            }
        </div>
    )
}