import React, {useState,ChangeEvent} from "react";
type EditableSpanType={
    title:string,
    saveTitle:(newTitle:string)=>void,
}
export function EditableSpan(props:EditableSpanType) {
    let [editMode,setEditMode]=useState(false)
    let [title, setTitle]=useState(props.title)
    const onEditMode = ()=> {
        setEditMode(true);
    }
    const offEditMode = ()=> {
        setEditMode(false);
        props.saveTitle(title);
        setTitle ("");
    }
    const changeTitle=(event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }


    return editMode
            ? <input value={title}
                     autoFocus={true}
        onBlur={offEditMode}
        onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>

}