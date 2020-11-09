import {TodoListType, FilterValuesType} from "../App";
import {v1} from "uuid";

/*type ActionType = {
    type: string
    [key: string]: any
}*/

export type RemoveTodolistActionType = {
    type:'REMOVE-TODOLIST',
    id:string
}
export type AddTodolistActionType = {
    type:'ADD-TODOLIST',
    title:string
}
export type ChangeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE',
    id:string
    title:string
}
export type ChangeTodolistFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER',
    id:string
    filter:FilterValuesType
}
type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType |ChangeTodolistFilterActionType
export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
                     return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todoListT = state.find(tl => tl.id === action.id)
            if (todoListT) {
                todoListT.filter = action.filter;
                return [...state]
            }



        default:
            throw new Error("I don't understand this type")
    }
}