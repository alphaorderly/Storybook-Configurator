import { ComponentProps, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dashboard } from './Dashboard';
import { useControlState } from '../hook/useControlState';
import {
    NumberArray,
    NumberInput,
    NumberSlider,
    ObjectEditor,
    ColorPicker,
    TextArray,
    TextInput,
    TextSelector,
    BoolToggle,
} from '../index';

type StoryProps = ComponentProps<typeof Dashboard>;

const meta: Meta = {
    title: 'Dashboard',
    component: Dashboard,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [state, setState] = useControlState({
            numberarray: [1, 2, 3],
            numberinput: 1,
            numberslider: 1,
            objecteditor: { key: 'value' },
            colorpicker: '#ff0000',
            textarray: ['one', 'two', 'three'],
            textinput: 'text',
            textselect: 'one',
            booltoggle: true,
        });

        const textselectOptions = ['one', 'two', 'three'];

        const controls = [
            <NumberArray
                title="Number Array"
                description="Modify an array of numbers"
                key="numberarray"
                value={state.numberarray}
                setValue={(value: number[]) => setState('numberarray', value)}
            />,
            <NumberInput
                title="Number Input"
                description="Input a single number"
                key="numberinput"
                value={state.numberinput}
                setValue={(value: number) => setState('numberinput', value)}
            />,
            <NumberSlider
                title="Number Slider"
                description="Slide to select a number"
                key="numberslider"
                value={state.numberslider}
                setValue={(value: number) => setState('numberslider', value)}
                option={{
                    showInput: false,
                }}
            />,
            <ObjectEditor
                title="Object Editor"
                description="Edit an object"
                key="objecteditor"
                value={state.objecteditor}
                setValue={(value: unknown) => setState('objecteditor', value)}
            />,
            <ColorPicker
                title="Color Picker"
                description="Pick a color"
                key="colorpicker"
                value={state.colorpicker}
                setValue={(value: string) => setState('colorpicker', value)}
            />,
            <TextArray
                title="Text Array"
                description="Modify an array of text"
                key="textarray"
                value={state.textarray}
                setValue={(value: string[]) => setState('textarray', value)}
            />,
            <TextInput
                title="Text Input"
                description="Input a single text"
                key="textinput"
                value={state.textinput}
                setValue={(value: string) => setState('textinput', value)}
            />,
            <TextSelector
                title="Text Selector"
                description="Select a text from options"
                key="textselect"
                value={state.textselect}
                selected={state.textselect}
                setSelected={(value: string) => setState('textselect', value)}
                select={textselectOptions}
            />,
            <BoolToggle
                title="Boolean Toggle"
                description="Toggle a boolean value"
                key="booltoggle"
                value={state.booltoggle}
                setValue={(value: boolean) => setState('booltoggle', value)}
            />,
        ];

        return (
            <Dashboard
                controls={controls}
                title="Dashboard"
                description="This is Dashboard for storybook"
            >
                <input type="text" />
            </Dashboard>
        );
    },
};
