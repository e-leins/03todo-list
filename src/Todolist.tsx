import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(id:string,isDone:boolean) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null >(null);
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle(" ");
        } else setError("Title is required")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13 && newTaskTitle.trim ()!=="") {
            props.addTask(newTaskTitle)
            setNewTaskTitle(" ")
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

        return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                className={error ? "error":""}/>
            <button onClick={addTask}>+
            </button>
           {error && <div className="error-message"> {error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                const onRemoveHandler = () => props.removeTask(t.id);
                const onChangeTaskHandler =(event:ChangeEvent<HTMLInputElement>)=>{props.changeTaskStatus(t.id,event.currentTarget.checked)}
                return <li key ={t.id} className={t.isDone ? "is-done":""}>
                    <input type="checkbox" onChange = {onChangeTaskHandler} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick= {onRemoveHandler}> x </button>
                </li>
            })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter": ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter": ""}onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter": ""}onClick={onCompletedClickHandler}>Completed</button>
        </div>

    </div>
}
