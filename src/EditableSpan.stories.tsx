import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import EditableSpan, {EditableSpanPropsType} from "./EditableSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes: {
        getNewTitle: {
            description: "Value EditableSpan changed"
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan '
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args: EditableSpanPropsType) => <EditableSpan {...args}/>;


export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    // title: 'span start',
    getNewTitle: action('Value EditableSpan changed')
};






