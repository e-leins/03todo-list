import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle:(id: string, title: string,todoListID:string)=>void

}

export function Todolist(props: PropsType) {
   /* const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);*/
/*
    const onAddTaskClick = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle,props.id);
            setNewTaskTitle(" ");
        } else setError("Title is required")
    }
*/

   /* const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13 && newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle,props.id)
            setNewTaskTitle(" ")
        }
    }*/
    const createTaskTitle =(title:string)=>{
        props.addTask(title,props.id)
    }
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const deleteTodoList=()=>{props.removeTodoList(props.id)}
    return <div>
        <h3>{props.title}<button onClick={deleteTodoList}> X</button></h3>
        <AddItemForm addItem={createTaskTitle}/>
        {/*<div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+
            </button>
            {error && <div className="error-message"> {error}</div>}
        </div>*/}
        <ul>
            {     props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id,props.id,);
                    const onStatusChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id,event.currentTarget.checked,props.id, )
                    }
                    const onTitleChangeHandler=(newTitle:string)=>{
                        props.changeTaskTitle(t.id,newTitle,props.id);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onStatusChangeTaskHandler} checked={t.isDone}/>
                       <EditableSpan title={t.title}
                                     saveTitle={onTitleChangeHandler}/>
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
