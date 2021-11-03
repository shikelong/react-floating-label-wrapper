import React from 'react';
import { Meta, Story } from '@storybook/react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps, Bind } from '../src';

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
  const [value, setValue] = React.useState(props.defaultValue);
  return (
    <FloatingLabelWrapper
      label={props.label}
      className={props.className}
      style={props.style}
      cssVariables={props.cssVariables}
    >
      <input
        placeholder="this is a long placeholder"
        value={value}
        type={props.inputType}
        onChange={(e) => {
          setValue(e.target.value);
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

export const BindPartialProps = () => {
  const [userName, setUserName] = React.useState('');
  const [age, setAge] = React.useState('');

  const BlueInput = Bind({
    cssVariables: { '--active-color': 'blue' },
  });

  return (
    <div>
      <BlueInput label={'userName'}>
        <input
          placeholder="Please input your name"
          value={userName}
          type={'text'}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </BlueInput>
      <div style={{ margin: '1em' }} />
      <BlueInput label={'Age'}>
        <input
          placeholder="please input your age"
          value={age}
          type={'text'}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </BlueInput>
    </div>
  );
};
