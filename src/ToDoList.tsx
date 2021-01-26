import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type ToDoListPropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (title: string, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    removeTasks: (taskID: string, toDoListID: string) => void
    changeFilter: (filterValue: FilterValueType, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, toDoListID: string) => void
    changeToDoListsTitle: (toDoListID: string, title: string) => void
}

function ToDoList(props: ToDoListPropsType) {
    // const [title, setTitle] = useState<string>("");
    // const [error, setError] = useState<string|null>(null)

    const tasks = props.tasks.map((taskObj) => {
        const removeTask = () => {
            props.removeTasks(taskObj.id, props.id)
        }

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(taskObj.id, title, props.id)
        }
        return (
            <div key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
                <Checkbox
                    checked={taskObj.isDone}
                    onChange={changeStatus}
                    color={"primary"}

                />
                {/*<input type="checkbox"*/}
                {/*checked={taskObj.isDone}*/}
                {/*onChange={changeStatus}*/}
                {/*/>*/}
                <EditableSpan title={taskObj.title} getNewTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}><Delete/></IconButton>

                {/*<button onClick={removeTask}>x</button>*/}
            </div>
        )
    })


    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const changeToDoListTitle = (title: string) => {
        props.changeToDoListsTitle(props.id, title)
    }

    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    const onClickAllHandler = () => {
        props.changeFilter("all", props.id)
    };

    const onClickActiveHandler = () => {
        props.changeFilter("active", props.id)
    };

    const onClickCompletedHandler = () => {
        props.changeFilter("completed", props.id)
    };


    return (

        <div>
            <h3>
                <EditableSpan title={props.title} getNewTitle={changeToDoListTitle}/>
                <IconButton onClick={removeToDoList}><Delete/></IconButton>
                {/*<button onClick={removeToDoList}>x</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks}
            </div>
            <div>
                <Button

                    variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onClickAllHandler}
                    color={"default"}
                >All
                </Button>
                <Button

                    variant={props.filter === "active" ? "outlined" : "text"}
                    onClick={onClickActiveHandler}
                    color={"primary"}
                >Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    onClick={onClickCompletedHandler}
                    color={"secondary"}
                >Completed
                </Button>
            </div>
        </div>
    )
}


export default ToDoList;
