import React from 'react';
import { Meta, Story } from '@storybook/react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps } from '../src';

//test CI
const meta: Meta = {
  title: '1. Wrap HTML <Input>',
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

const Template = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState(props.defaultValue);
  return (
    <FloatingLabelWrapper
      label={props.label}
      focused={isFocused}
      className={props.className}
      style={props.style}
      cssVariables={props.cssVariables}
    >
      <input
        placeholder="this is a long placeholder"
        value={value}
        type={props.inputType}
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

export const Basic = Template.bind({});

export const LongLabelName = Template.bind(
  {},
  {
    label: 'Storybook is an awesome tool',
  }
);

export const WithDefaultValue = Template.bind(
  {},
  {
    label: 'User Name',
    defaultValue: 'Joe',
  }
);

export const CustomClassNameAndStyle = Template.bind(
  {},
  {
    label: 'User Name',
    className: 'custom-class',
    cssVariables: { '--active-color': 'red' },
    style: { borderRadius: '5px' },
  }
);
