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
    toDoListID: string}

type ActionType = RemoveTodoListActionType | AddTodoListActionType|
    ChangeTodoListsTitleActionType| ChangeTodoListsFilterActionType

export const todoListsReducer = (state: Array<ToDoListType>, action: ActionType) => {
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
            // return state;
            throw  new Error("I don't understand");
    }
}

export const removeToDoListAC = (toDoListID: string):RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", toDoListID: toDoListID}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, toDoListID: v1()}
}

export const changeTodolistTitleAC = ( toDoListID: string, title: string): ChangeTodoListsTitleActionType => {
    return { type: "CHANGE-TODOLISTS-TITLE", title: title,  toDoListID:  toDoListID}
}
export const changeTodolistFilterAC = ( toDoListID: string, filter: FilterValueType): ChangeTodoListsFilterActionType => {
    return { type: "CHANGE-FILTER", filter: filter,  toDoListID: toDoListID}
}
