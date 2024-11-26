import { ComponentProps, useState } from 'react';
import { BoolToggle } from './BoolToggle';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof BoolToggle>;

const meta: Meta<StoryProps> = {
    title: 'Control/BoolToggle',
    component: BoolToggle,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState(false);

        return (
            <BoolToggle
                title="Bool Toggle"
                description="This is a bool toggle"
                value={value}
                setValue={setValue}
            />
        );
    },
};
