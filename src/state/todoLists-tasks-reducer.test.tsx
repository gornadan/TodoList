import React from 'react';
import {TasksStateType, ToDoListType} from "../App";
import {addTodolistAC, todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.toDoListID);
    expect(idFromTodolists).toBe(action.toDoListID);
});
