import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {string} from "prop-types";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography, Paper} from "@material-ui/core";
import {classes} from "istanbul-lib-coverage";
import {Menu} from "@material-ui/icons";

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


function App() {

    const toDoListID1 = v1();
    const toDoListID2 = v1();


    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListID1, title: "What to learn", filter: "all"},
        {id: toDoListID2, title: "What to buy", filter: "all"},
    ])


    let [tasks, setTasks] = useState<TasksStateType>({
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


    function changeFilter(filterValue: FilterValueType, toDoListID: string) {
        const toDoList = toDoLists.find((tl => tl.id === toDoListID))
        if (toDoList) {
            toDoList.filter = filterValue;
            setToDoLists([...toDoLists])

        }
    }

    function removeTasks(taskID: string, toDoListID: string) {
        const toDoListsTasks = tasks[toDoListID];
        tasks[toDoListID] = toDoListsTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})

    }

    function addTasks(toDoListID: string, title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        const toDoList = tasks[toDoListID]
        tasks[toDoListID] = [newTask, ...toDoList];
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const toDoListTasks = tasks[toDoListID]
        const task = toDoListTasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, toDoListID: string) {
        const toDoListTasks = tasks[toDoListID]
        const task = toDoListTasks.find(task => task.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function removeToDoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListID));
        delete tasks[toDoListID];
        setTasks({...tasks})
    };

    function addToDoList(title: string) {
        const newToDoListID = v1();
        const newToDoList: ToDoListType = {
            id: newToDoListID,
            title: title,
            filter: "all"
        }
        setToDoLists([newToDoList, ...toDoLists])
        setTasks({
            ...tasks,
            [newToDoListID]: []
        })

    }

    function changeToDoListsTitle(toDoListID: string, title: string) {
        const toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.title = title
            setToDoLists([...toDoLists])
        }
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
                                            addTask={addTasks}
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

export default App;
