import NumberSlider from './NumberSlider';
import { Meta, StoryObj } from '@storybook/react';
import React, { ComponentProps, useState } from 'react';

type StoryProps = ComponentProps<typeof NumberSlider>;

const meta: Meta<StoryProps> = {
    title: 'Control/NumberSlider',
    component: NumberSlider,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState(0);

        return (
            <NumberSlider
                key={1}
                title="Number Slider"
                description="This is a number slider"
                value={value}
                setValue={setValue}
                option={{ min: 0, max: 100, step: 1 }}
            />
        );
    },
};
