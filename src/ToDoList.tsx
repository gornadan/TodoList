import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


type ToDoListPropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (title: string, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    removeTasks: (taskID: string, toDoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    changeFilter: (filterValue: FilterValueType, toDoListID: string) => void
    changeToDoListsTitle: (toDoListID: string, title: string) => void
}

const ToDoList = React.memo((props: ToDoListPropsType) => {

    console.log("Todolist is called")
    let tasksForToDoList = props.tasks;
    if (props.filter === "active") {
        tasksForToDoList = props.tasks.filter(t => t.isDone === false)
    }

    if (props.filter === "completed") {
        tasksForToDoList = props.tasks.filter(t => t.isDone === true)
    }


    const tasks = tasksForToDoList.map(taskObj => <Task
        key={taskObj.id}
        todoListId={props.id}
        changeStatus={props.changeStatus}
        changeTaskTitle={props.changeTaskTitle}
        removeTasks={props.removeTasks}
        taskObj={taskObj}

    />)


    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [])

    const changeToDoListTitle = useCallback((title: string) => {
        props.changeToDoListsTitle(props.id, title)
    }, [props.changeToDoListsTitle, props.id]);

    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    const onClickAllHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);

    const onClickActiveHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);

    const onClickCompletedHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);


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
});

// type TaskPropsType = {
//     removeTasks: (taskID: string, toDoListID: string) => void
//     changeTaskTitle: (taskID: string, title: string, toDoListID: string) => void
//     changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
//     taskObj: TaskType
//     todoListId: string
// }

// const Task = (props: TaskPropsType) => {
//     const removeTask = () => {
//         props.removeTasks(props.taskObj.id, props.todoListId)
//     }
//
//     const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
//         props.changeStatus(props.taskObj.id, e.currentTarget.checked, props.todoListId)
//     }
//
//     const changeTaskTitle = (title: string) => {
//         props.changeTaskTitle(props.taskObj.id, title, props.todoListId)
//     }
//     return (
//         <div key={props.taskObj.id} className={props.taskObj.isDone ? "is-done" : ""}>
//             <Checkbox
//                 checked={props.taskObj.isDone}
//                 onChange={changeStatus}
//                 color={"primary"}
//
//             />
//             {/*<input type="checkbox"*/}
//             {/*checked={taskObj.isDone}*/}
//             {/*onChange={changeStatus}*/}
//             {/*/>*/}
//             <EditableSpan title={props.taskObj.title} getNewTitle={changeTaskTitle}/>
//             <IconButton onClick={removeTask}><Delete/></IconButton>
//
//             {/*<button onClick={removeTask}>x</button>*/}
//         </div>
//     )
// }


export default ToDoList;
