import React from 'react';
import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";



export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
});

// type AppRootReducer = {
//     todoLists: Array<ToDoListType>
//     tasks: TasksStateType
// }
export const store = createStore(rootReducer);

export type AppRootState = ReturnType<typeof rootReducer>




 //@ts-ignore
// window.store = store





