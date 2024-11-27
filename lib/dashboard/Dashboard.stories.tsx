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
            textselect: 'o',
            booltoggle: true,
        });

        const textselectOptions = ['one', 'two', 'three'];

        const controls = [
            <NumberArray
                title="Number Array"
                description="Modify an array of numbers"
                key="numberarray"
                value={state.numberarray}
                setValue={setState.numberarray}
            />,
            <NumberInput
                title="Number Input"
                description="Input a single number"
                key="numberinput"
                value={state.numberinput}
                setValue={setState.numberinput}
            />,
            <NumberSlider
                title="Number Slider"
                description="Slide to select a number"
                key="numberslider"
                value={state.numberslider}
                setValue={setState.numberslider}
                option={{
                    showInput: false,
                }}
            />,
            <ObjectEditor
                title="Object Editor"
                description="Edit an object"
                key="objecteditor"
                value={state.objecteditor}
                setValue={setState.objecteditor}
            />,
            <ColorPicker
                title="Color Picker"
                description="Pick a color"
                key="colorpicker"
                value={state.colorpicker}
                setValue={setState.colorpicker}
            />,
            <TextArray
                title="Text Array"
                description="Modify an array of text"
                key="textarray"
                value={state.textarray}
                setValue={setState.textarray}
            />,
            <TextInput
                title="Text Input"
                description="Input a single text"
                key="textinput"
                value={state.textinput}
                setValue={setState.textinput}
            />,
            <TextSelector
                title="Text Selector"
                description="Select a text from options"
                key="textselect"
                value={state.textselect}
                setValue={setState.textselect}
                select={textselectOptions}
            />,
            <BoolToggle
                title="Boolean Toggle"
                description="Toggle a boolean value"
                key="booltoggle"
                value={state.booltoggle}
                setValue={setState.booltoggle}
            />,
        ];

        return (
            <Dashboard
                controls={controls}
                title="Dashboard"
                description="This is Dashboard for storybook"
            >
                <div>
                    <h2>Interactive Controls</h2>
                    <ul>
                        <li>Number Array: {state.numberarray.join(', ')}</li>
                        <li>Number Input: {state.numberinput}</li>
                        <li>Number Slider: {state.numberslider}</li>
                        <li>Object Editor: {JSON.stringify(state.objecteditor)}</li>
                        <li>
                            Color Picker:{' '}
                            <span style={{ color: state.colorpicker }}>{state.colorpicker}</span>
                        </li>
                        <li>Text Array: {state.textarray.join(', ')}</li>
                        <li>Text Input: {state.textinput}</li>
                        <li>Text Selector: {state.textselect}</li>
                        <li>Boolean Toggle: {state.booltoggle ? 'true' : 'false'}</li>
                    </ul>
                </div>
            </Dashboard>
        );
    },
};
