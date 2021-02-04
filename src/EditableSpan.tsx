import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    getNewTitle: (title: string) => void
}

const  EditableSpan = React.memo( (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => {
        setEditMode(true)

    };
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.getNewTitle(title.trim())
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value);
    };

    return (
        editMode
            ? <TextField variant={"outlined"}
                         value={title}
                         onChange={onChangeHandler}
                         onBlur={offEditMode}
                         autoFocus={true}
            />
            // ? <input
            //     value={title}
            //     onBlur={offEditMode}
            //     autoFocus={true}
            //     onChange={onChangeHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
});

export default EditableSpan;