import { ComponentProps, useState } from 'react';
import NumberInput from './NumberInput';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof NumberInput>;

const meta: Meta<StoryProps> = {
    title: 'Control/NumberInput',
    component: NumberInput,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState(0);

        return (
            <NumberInput
                key={1}
                title="Number Input"
                description="This is a number input"
                value={value}
                setValue={setValue}
                option={{ min: 0, max: 100, step: 1 }}
            />
        );
    },
};
