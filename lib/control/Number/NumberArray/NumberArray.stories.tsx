import { ComponentProps } from 'react';
import NumberArray from './NumberArray';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof NumberArray>;

const meta: Meta<StoryProps> = {
    title: 'Control/NumberArray',
    component: NumberArray,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [array, setArray] = React.useState([1, 2, 3]);

        return (
            <NumberArray
                key={1}
                title="Number Array"
                description="This is a number array"
                value={array}
                setValue={setArray}
            />
        );
    },
};
