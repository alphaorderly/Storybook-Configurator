import { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';
import { ComponentProps, useState } from 'react';
import React from 'react';

type StoryProps = ComponentProps<typeof ColorPicker>;

const meta: Meta<StoryProps> = {
    title: 'control/Picker/ColorPicker',
    component: ColorPicker,
    argTypes: {
        value: {
            control: 'color',
        },
        setValue: {
            action: 'setValue',
        },
        option: {
            control: 'object',
        },
    },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [color, setColor] = useState('#FF0000');

        return (
            <ColorPicker
                title="Color Picker"
                description="Pick a color"
                value={color}
                setValue={setColor}
            />
        );
    },
};
