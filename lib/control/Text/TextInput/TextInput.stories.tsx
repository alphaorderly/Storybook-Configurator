import { ComponentProps } from 'react';
import TextInput from './TextInput';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof TextInput>;

const meta: Meta<StoryProps> = {
    title: 'Control/TextInput',
    component: TextInput,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [text, setText] = React.useState('Hello, World!');

        return (
            <TextInput
                title="Text Input"
                description="This is a text input"
                value={text}
                setValue={setText}
                option={{ placeholder: 'Type something here', maxLength: 100 }}
            />
        );
    },
};
