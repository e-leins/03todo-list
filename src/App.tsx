import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType={
    [key:string]:Array<TaskType>
}
function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "active"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>(
        {
            [todoListID1]:
                [{id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true},
                    {id: v1(), title: "ReactJS", isDone: false},
                ],
            [todoListID2]:
                [{id: v1(), title: "Rest API", isDone: false},
                    {id: v1(), title: "GraphQL", isDone: false},
                ]

        })
    ;

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeFilter(id: string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }

    }

    // let tasksForTodolist = tasks;
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    //
    // }
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);


    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let allTasks = tasks[tl.id];
                let tasksForTodolist = allTasks;
                if (tl.filter === "completed") {
                    tasksForTodolist = allTasks.filter(t => t.isDone === true);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = allTasks.filter(t => t.isDone === false);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}/>

                )
            })}

        </div>
    )
}

export default App;
