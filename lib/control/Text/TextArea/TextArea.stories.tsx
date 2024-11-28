import { ComponentProps } from 'react';
import { TextArea } from './TextArea';
import { Meta, StoryObj } from '@storybook/react';

type StoryProps = ComponentProps<typeof TextArea>;

const meta: Meta = {
    title: 'control/TextArea',
    component: TextArea,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        value: '',
        setValue: () => {},
        option: {
            placeholder: 'Placeholder',
            maxLength: 100,
            maxLines: 5,
        },
    },
};
