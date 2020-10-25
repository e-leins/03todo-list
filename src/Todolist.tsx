import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTodoListTitle:(newTitle:string, todoListID:string)=>void

}

export function Todolist(props: PropsType) {
      const createTaskTitle =(title:string)=>{
        props.addTask(title,props.id)
    }
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const deleteTodoList=()=>{props.removeTodoList(props.id)}
    const changeTodoListTitle = (newTitle:string)=> {
        props.changeTodoListTitle(newTitle, props.id)
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            {/*<button onClick={deleteTodoList}> X</button>*/}
            <IconButton onClick={deleteTodoList}> <Delete/></IconButton>
        </h3>
        <AddItemForm addItem={createTaskTitle}/>

        <div>
            {props.tasks.map(t => {
                const onRemoveHandler = () => props.removeTask(t.id, props.id,);
                const onStatusChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, event.currentTarget.checked, props.id,)
                }
                const onTitleChangeHandler = (newTitle: string) => {
                    props.changeTaskTitle(t.id, newTitle, props.id);
                }
                return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        checked={t.isDone}
                        onChange={onStatusChangeTaskHandler}/>
                    {/*<input type="checkbox" onChange={onStatusChangeTaskHandler} checked={t.isDone}/>*/}
                    <EditableSpan title={t.title}
                                  onChange={onTitleChangeHandler}/>
                    <IconButton onClick={onRemoveHandler} color="primary"> <Delete/></IconButton>
                    {/*<button onClick={onRemoveHandler}> x</button>*/}
                </div>
            })
            }
        </div>
        <div>
            <Button
                // className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}
                color ={props.filter === 'all' ? "secondary" : "primary"}
                variant= {"outlined"}>
                All</Button>
            <Button
                // className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}
                color = {props.filter === 'active' ? "secondary" : "primary"}
                variant= {"outlined"}
            >       Active            </Button>
            <Button
                // className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                    color = {props.filter === 'completed' ? "secondary" : "primary"}
                    variant= {"outlined"} >
                Completed  </Button>
        </div>

    </div>
}
