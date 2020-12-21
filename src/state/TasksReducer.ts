import {TodoListType, FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type:'REMOVE_TASK'
    taskID:string
    todoListID:string

}
export type AddTaskActionType = {
    type:'ADD-TASK',
    title: string,
    todoListID:string

}
export type ChangeTaskStatusActionType = {
    type:'CHANGE-STATUS-TASK',
    taskID: string,
    isDone: boolean,
    todoListID: string
}

type ActionType = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType
export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    let copyState ={...state}
    switch (action.type) {
        case 'REMOVE_TASK':
                      copyState[action.todoListID] = copyState[action.todoListID].filter (task=>task.id !==action.taskID)
            return copyState;


        case 'ADD-TASK':
           let newTask={id:v1(),title:action.title, isDone:false};
            copyState[action.todoListID] = [newTask, ...copyState[action.todoListID]]
            return copyState;

        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todoListID];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskID);

            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID:string, todoListID:string):RemoveTaskActionType => {
    return {type: 'REMOVE_TASK',taskID,todoListID};
}
export const addTaskAC = (title:string, todoListID:string):AddTaskActionType=>{
    return {type:'ADD-TASK', title,todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string):ChangeTaskStatusActionType=>{
    return {type:'CHANGE-STATUS-TASK', taskID,isDone,todoListID}
}