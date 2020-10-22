import React, {useState,ChangeEvent} from "react";
import {TextField} from "@material-ui/core";
type EditableSpanType={
    title:string,
    onChange: (newTitle: string) => void
}
export function EditableSpan(props:EditableSpanType) {
    let [editMode,setEditMode]=useState(false)
    let [title, setTitle]=useState(props.title)
    const onEditMode = ()=> {
        setEditMode(true);
    }
    const offEditMode = ()=> {
        setEditMode(false);
        props.onChange(title);
        setTitle ("");
    }
    const changeTitle=(event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }


    return editMode
          ? <TextField
            variant={"outlined"}
            value={title}
            autoFocus={true}
            onBlur={offEditMode}
            onChange={changeTitle}
        />
            //<input value={title}
        //              autoFocus={true}
        // onBlur={offEditMode}
        // onChange={changeTitle}

            : <span onDoubleClick={onEditMode}>{props.title}</span>

}