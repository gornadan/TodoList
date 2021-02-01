import {FilterValueType, ToDoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    toDoListID: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    toDoListID: string
}

export type ChangeTodoListsTitleActionType = {
    type: "CHANGE-TODOLISTS-TITLE"
    title: string
    toDoListID: string
}

export type ChangeTodoListsFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    toDoListID: string
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListsTitleActionType | ChangeTodoListsFilterActionType

export const toDoListID1 = v1();
export const toDoListID2 = v1();

const initialState: Array<ToDoListType> = [
    {id: toDoListID1, title: "What to learn", filter: "all"},
    {id: toDoListID2, title: "What to buy", filter: "all"}
]

export const todoListsReducer = (state: Array<ToDoListType> = initialState, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.toDoListID);
        case "ADD-TODOLIST":
            // const newToDoListID = v1();
            // const newToDoList: ToDoListType = {
            //     id: newToDoListID,
            //     title: action.title,
            //     filter: "all"
            // }
            return [...state, {id: action.toDoListID, title: action.title, filter: "all"}]
        case "CHANGE-TODOLISTS-TITLE":
            const toDoList = state.find(tl => tl.id === action.toDoListID)
            if (toDoList) {
                toDoList.title = action.title;
                return [...state]
            }
            return state;

        case "CHANGE-FILTER":
            const toDoLists = state.find((tl => tl.id === action.toDoListID))
            if (toDoLists) {
                toDoLists.filter = action.filter;
                return [...state]
            }
            return state;
        default:
            return state;
        // throw  new Error("I don't understand");
    }
}

export const removeToDoListAC = (toDoListID: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", toDoListID: toDoListID}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    debugger
    return {type: 'ADD-TODOLIST', title, toDoListID: v1()}
}

export const changeTodolistTitleAC = (toDoListID: string, title: string): ChangeTodoListsTitleActionType => {
    return {type: "CHANGE-TODOLISTS-TITLE", title: title, toDoListID: toDoListID}
}
export const changeTodolistFilterAC = (filter: FilterValueType, toDoListID: string): ChangeTodoListsFilterActionType => {
    return {type: "CHANGE-FILTER", filter, toDoListID}
}
