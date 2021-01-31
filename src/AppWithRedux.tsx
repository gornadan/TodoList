import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeToDoListAC,
    todoListsReducer
} from "./state/todoLists-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const toDoListID1 = v1();
    const toDoListID2 = v1();


    let [toDoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: toDoListID1, title: "What to learn", filter: "all"},
        {id: toDoListID2, title: "What to buy", filter: "all"},
    ])


    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [toDoListID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
    });


    function removeTasks(taskID: string, toDoListID: string) {
        const action = removeTaskAC(taskID, toDoListID);
        dispatchToTasksReducer(action)
    }

    function addTask(toDoListID: string, title: string) {

        const action = addTaskAC(title, toDoListID);
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, toDoListID);
        dispatchToTasksReducer(action);
    }

    function changeTaskTitle(taskID: string, title: string, toDoListID: string) {
        const action = changeTaskTitleAC(taskID, title, toDoListID);
        dispatchToTasksReducer(action)
    }

    function changeFilter( filterValue: FilterValueType, toDoListID: string,) {
        dispatchToTodoListsReducer(changeTodolistFilterAC(filterValue, toDoListID))
    }

    function removeToDoList(toDoListID: string) {
        const action = removeToDoListAC(toDoListID)
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    };

    function changeToDoListsTitle(toDoListID: string, title: string) {
        dispatchToTodoListsReducer(changeTodolistTitleAC(toDoListID, title))
    };
    function addToDoList(title: string) {
        const action = addTodolistAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}><AddItemForm addItem={addToDoList}/></Grid>
                <Grid container spacing={3}>
                    {
                        toDoLists.map(tl => {
                            let tasksForToDoList = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                            }

                            if (tl.filter === "completed") {
                                tasksForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                            }

                            return (<Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <ToDoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForToDoList}
                                            filter={tl.filter}
                                            addTask={addTask}
                                            removeTasks={removeTasks}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            removeToDoList={removeToDoList}
                                            changeToDoListsTitle={changeToDoListsTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
