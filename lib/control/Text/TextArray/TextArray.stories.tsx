import { ComponentProps, useState } from 'react';
import { TextArray } from './TextArray';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof TextArray>;

const meta: Meta<StoryProps> = {
    title: 'Control/TextArray',
    component: TextArray,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [textArray, setTextArray] = useState<string[]>(['test', 'test2']);

        return (
            <TextArray
                title="Text Array"
                description="This is a text array control"
                value={textArray}
                setValue={setTextArray}
            />
        );
    },
};
