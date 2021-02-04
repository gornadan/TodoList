import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";


export default {
    title: 'Example/Task',
    component: Task
} as Meta;

const changeTaskStatusCallback = action("Status changed inside Task");
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove Button inside Task clicked")

const Template: Story<TaskPropsType> = (args: TaskPropsType) => <Task {...args} />;

const baseArg = {
    changeStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTasks: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArg,
    taskObj: {id: '1', isDone: true, title: 'JS' },
    todoListId: 'todoListId1'
};


export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArg,
    taskObj: {id: '1', isDone: false, title: 'JS' },
    todoListId: 'todoListId1'
}



