import React, {ChangeEvent, useCallback} from 'react';
import { TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import { Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";




export type TaskPropsType = {
    removeTasks: (taskID: string, toDoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    taskObj: TaskType
    todoListId: string
}

export const Task = React.memo ( (props: TaskPropsType) => {
    const removeTask = () => {
        props.removeTasks(props.taskObj.id, props.todoListId)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.taskObj.id, e.currentTarget.checked, props.todoListId)
    }

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.taskObj.id, title, props.todoListId)
    }, [props.changeTaskTitle, props.taskObj.id, props.todoListId ])
    return (
        <div key={props.taskObj.id} className={props.taskObj.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.taskObj.isDone}
                onChange={changeStatus}
                color={"primary"}

            />
            {/*<input type="checkbox"*/}
            {/*checked={taskObj.isDone}*/}
            {/*onChange={changeStatus}*/}
            {/*/>*/}
            <EditableSpan title={props.taskObj.title} getNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}><Delete/></IconButton>

            {/*<button onClick={removeTask}>x</button>*/}
        </div>
    )
})



