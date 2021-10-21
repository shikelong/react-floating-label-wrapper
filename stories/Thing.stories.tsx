import React from 'react';
import { Meta, Story } from '@storybook/react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: FloatingLabelWrapper,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<FloatingLabelWrapperProps> = (args) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <FloatingLabelWrapper
      label="rio test"
      focused={isFocused}
      valueGetter={(props) => props.value}
    >
      <input
        value={value}
        type="text"
        onFocus={() => {
          setIsFocused(true);
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </FloatingLabelWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
