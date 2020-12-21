import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './TasksReducer';
import {TasksStateType} from '../App';
import {TaskType} from "../Todolist";



test('correct task should be deleted from correct array', () => {
    const startState:TasksStateType = {
        "todoListID1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListID2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTaskAC("2", "todoListID2");

    const endState = tasksReducer(startState, action)


    expect(endState["todoListID1"].length).toBe(3);
    expect(endState["todoListID2"].length).toBe(2);
    expect(endState["todoListID2"].every((t:TaskType)=>t.id!="2")).toBeTruthy();
    expect(endState["todoListID2"][1].id).toBe(3);
});

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todoListID1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = addTaskAC("juce", "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juce");
    expect(endState["todoListId2"][0].isDone).toBe(false);
})


test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskStatusAC("2", false, "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].isDone).toBeFalsy();
    expect(endState["todoListId1"][1].isDone).toBeTruthy();
});
