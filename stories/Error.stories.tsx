//@ts-nocheck
import React from 'react';
import { Meta, Story } from '@storybook/react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps } from '../src';

//test CI
const meta: Meta = {
  title: '2. Error Cases',
  component: FloatingLabelWrapper,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
    style: {
      control: {
        type: 'object',
      },
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'User Name',
    },
    defaultValue: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    inputType: {
      control: {
        type: 'select',
      },
      options: [
        'text',
        'tel',
        'time',
        'password',
        // 'checkbox',
        'number',
        // 'radio',
      ],
      defaultValue: 'text',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Error = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <FloatingLabelWrapper
      label={'user Name'}
      focused={isFocused}
      valueGetter={() => {
        return value;
      }}
    >
      <input
        placeholder="placeholder"
        value={value}
        type={'text'}
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
      <input type="text" placeholder="input 2" />
    </FloatingLabelWrapper>
  );
};
