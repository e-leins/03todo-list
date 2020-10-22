import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
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
            <TextField
                variant={"outlined"}
                value={newTaskTitle}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddTask}
                error={!!error}
            label={"Title"}
            helperText={error}/>
                {/*// className={error ? "error" : ""}error*/}

            {/*<input value={newTaskTitle}*/}
            {/*       onChange={onTitleChange}*/}
            {/*       onKeyPress={onKeyPressAddTask}*/}
            {/*       className={error ? "error" : ""}/>*/}
             <IconButton
                         color={"primary"}
                         onClick={onAddItemClick}>
                 <AddBox/>
             </IconButton>
            {/*<Button variant="contained" color="primary" onClick={onAddItemClick}>+*/}
            {/*</Button>*/}
            {/*{error && <div className="error-message"> {error}</div>}*/}
        </div>
         )

}
export default  AddItemForm