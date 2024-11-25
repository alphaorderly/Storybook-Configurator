import { ComponentProps } from 'react';
import TextSelector from './TextSelector';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof TextSelector>;

const meta: Meta<StoryProps> = {
    title: 'Control/TextSelector',
    component: TextSelector,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [selected, setSelected] = React.useState<string>('');
        const select = ['Option 1', 'Option 2', 'Option 3'];

        return (
            <TextSelector
                title="Text Selector"
                description="Description"
                selected={selected}
                setSelected={setSelected}
                select={select}
            />
        );
    },
};
