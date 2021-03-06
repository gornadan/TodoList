import {TasksStateType} from "../App";
import {v1} from "uuid";

import {AddTodoListActionType, RemoveTodoListActionType, toDoListID1, toDoListID2} from "./todoLists-reducer";

export type RemoveTaskType = {
    type: "REMOVE-TASK"
    taskId: string
    toDoListID: string
}

export type AddTaskType = {
    type: "ADD-TASK"
    title: string
    toDoListID: string
}

export type ChangeTaskStatusType = {
    type: "TASK-STATUS"
    taskId: string
    isDone: boolean
    toDoListID: string
}

export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTitle: string
    toDoListID: string
}

type ActionType = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TasksStateType = {
    [toDoListID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ],
    [toDoListID2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state};
            copyState[action.toDoListID] = copyState[action.toDoListID].filter(task => task.id !== action.taskId)
            return copyState;
        }
        case "ADD-TASK": {

            let copyState = {...state};
            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false};
            let tasks = copyState[action.toDoListID];
            let newTasks = [newTask, ...tasks];
            copyState[action.toDoListID] = newTasks;
            return copyState
        }
        case  "TASK-STATUS":
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.newTitle}
                    }
                })
            }
        case "ADD-TODOLIST" : {
            let stateCopy = {...state};
            stateCopy[action.toDoListID] = [];
            return stateCopy


        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state};
            delete stateCopy[action.toDoListID];
            return stateCopy;
        }

        default:
            return state;
        // throw  new Error("I don't understand");
    }
};


export const removeTaskAC = (taskId: string, toDoListId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", taskId, toDoListID: toDoListId}
}


export const addTaskAC = (title: string, toDoListID: string): AddTaskType => {
    return {type: "ADD-TASK", title, toDoListID}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, toDoListID: string): ChangeTaskStatusType => {
    return {type: "TASK-STATUS", taskId, isDone, toDoListID}
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, toDoListID: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", taskId, newTitle, toDoListID}
}