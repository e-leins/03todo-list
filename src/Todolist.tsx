import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListID:string) => void,
    changeFilter: (id: string, value: FilterValuesType) => void,
    addTask: (title: string,todoListID:string) => void,
    changeTaskStatus: (id: string, isDone: boolean,todoListID:string) => void,
    filter: FilterValuesType
    removeTodoList:(id:string)=>void

}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle,props.id);
            setNewTaskTitle(" ");
        } else setError("Title is required")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13 && newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle,props.id)
            setNewTaskTitle(" ")
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const deleteTodoList=()=>{props.removeTodoList(props.id)}
    return <div>
        <h3>{props.title}<button onClick={deleteTodoList}> X</button></h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+
            </button>
            {error && <div className="error-message"> {error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id,props.id,);
                    const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id,event.currentTarget.checked,props.id, )
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeTaskHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}> x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>

    </div>
}
