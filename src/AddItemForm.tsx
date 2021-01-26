import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setError(null);
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            onAddItemClick()
        }
    };
    const onAddItemClick = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle)

        } else {
            setError("Title is required")
        }
        setTitle("")

    };

    return <div>
        <TextField variant={"outlined"}
                   value={title}
                   error={!!error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label={"Title"}
                   helperText={error}
        />
        {/*<input*/}
        {/*value={title}*/}
        {/*onChange={onChangeHandler}*/}
        {/*onKeyPress={onKeyPressHandler}*/}
        {/*className={error ? "error" : ""}*/}
        {/*/>*/}
        {/*<button onClick={onAddItemClick}>+</button>*/}
        {/*<Button*/}
        {/*variant={"contained"}*/}
        {/*color={"primary"}*/}
        {/*onClick={onAddItemClick}*/}
        {/*>+</Button>*/}
        <IconButton color={"primary"} onClick={onAddItemClick}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className={"error-message"}>{error}</div>}*/}
    </div>


}

export default AddItemForm