import { ComponentProps } from 'react';
import Dashboard from './Dashboard';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import NumberInput from '../control/Number/NumberInput/NumberInput';
import NumberSlider from '../control/Number/NumberSlider/NumberSlider';

type StoryProps = ComponentProps<typeof Dashboard>;

const meta: Meta = {
  title: 'Dashboard',
  component: Dashboard,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [number, setNumber] = React.useState(0);

    const components = [
      <NumberSlider
        key={0}
        title="Number"
        description="This is example number input"
        value={number}
        setValue={setNumber}
      />,
    ];

    return (
      <Dashboard
        title="Dashboard"
        description="This is example dashboard"
        controls={components}
        component={
          <div>
            {Array.from({ length: number }).map((component, index) => (
              <div
                key={index}
                className="mb-4"
              >
                Hello World
              </div>
            ))}
          </div>
        }
      />
    );
  },
};
