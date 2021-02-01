import React from 'react';
import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";



export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
});

// type AppRootReducer = {
//     todoLists: Array<ToDoListType>
//     tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>

 export const store = createStore(rootReducer);


 //@ts-ignore
window.store = store





