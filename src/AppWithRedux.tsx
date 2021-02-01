import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AppRootState} from './state/store'

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeToDoListAC,
    todoListsReducer
} from "./state/todoLists-reducer";
import {useDispatch, useSelector} from "react-redux";

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


    const dispatch = useDispatch();
    const toDoLists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

    function removeTasks(taskID: string, toDoListID: string) {
        const action = removeTaskAC(taskID, toDoListID);
        dispatch(action)
    }

    function addTask(toDoListID: string, title: string) {

        const action = addTaskAC(title, toDoListID);
        dispatch(action)
    }

    function changeStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, toDoListID);
        dispatch(action);
    }

    function changeTaskTitle(taskID: string, title: string, toDoListID: string) {
        const action = changeTaskTitleAC(taskID, title, toDoListID);
        dispatch(action)
    }

    function changeFilter(filterValue: FilterValueType, toDoListID: string,) {
        dispatch(changeTodolistFilterAC(filterValue, toDoListID))
    }

    function removeToDoList(toDoListID: string) {
        const action = removeToDoListAC(toDoListID)
        dispatch(action);

    };

    function changeToDoListsTitle(toDoListID: string, title: string) {
        dispatch(changeTodolistTitleAC(toDoListID, title))
    };

    function addToDoList(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
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
