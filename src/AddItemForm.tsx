import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type AddItemFormPropsType={
    addItem:(title:string)=>void

}
function AddItemForm(props:AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13 && newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setNewTaskTitle(" ")
        }
    }
    const onAddItemClick = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle(" ");
        } else setError("Title is required")
    }

    return(
        <div>
            <input value={newTaskTitle}
                   onChange={onTitleChange}
                   onKeyPress={onKeyPressAddTask}
                   className={error ? "error" : ""}/>
            <button onClick={onAddItemClick}>Add
            </button>
            {error && <div className="error-message"> {error}</div>}
        </div>
         )

}
export default  AddItemForm