import { ComponentProps, useState } from 'react';
import ObjectEditor from './ObjectEditor';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type StoryProps = ComponentProps<typeof ObjectEditor>;

const meta: Meta<StoryProps> = {
  title: 'Control/ObjectEditor',
  component: ObjectEditor,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [object, setObject] = useState([1, 2, 3, 4]);

    return (
      <ObjectEditor
        title="Object Editor"
        description="Edit object"
        object={object}
        setObject={setObject}
      />
    );
  },
};
