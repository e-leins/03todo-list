import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export type TasksStateType = {
    [key: string]:Array<TaskType>
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
        });


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


    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
    }

    function addTodoList(title: string) {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks})
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/></Grid>
                <Grid container spacing={3}>
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
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })} </Grid>
            </Container>
        </div>
    )
}

export default App;
