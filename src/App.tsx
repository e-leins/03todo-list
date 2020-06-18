import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType= "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function addTask(title:string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
}
        function changeFilter(value: FilterValuesType) {
            setFilter(value);

        }

        let tasksForTodolist = tasks;
        if (filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone === true);

        }
        if (filter === "active") {
            tasksForTodolist = tasks.filter(t => t.isDone === false);

        }
        function changeStatus(id:string,isDone:boolean){
            let task =tasks.find(t=>t.id===id);
            if (task) {
                task.isDone=isDone;
                setTasks([...tasks]);
            }
        }
        return (
            <div className="App">
                <Todolist title="What to learn"
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
changeTaskStatus={changeStatus}
                filter={filter}/>

            </div>
        )
    }

    export default App;
