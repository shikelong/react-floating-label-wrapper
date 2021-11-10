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

export const ChildrenMustBeSingleElement = () => {
  const [value, setValue] = React.useState('');

  return (
    <FloatingLabelWrapper label={'user Name'}>
      <input
        placeholder="placeholder"
        value={value}
        type={'text'}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <input type="text" placeholder="input 2" />
    </FloatingLabelWrapper>
  );
};

export const ChildrenInputMustBeControlledComponents = () => {
  return (
    <FloatingLabelWrapper label={'user Name'}>
      <input placeholder="placeholder" type={'text'} />
    </FloatingLabelWrapper>
  );
};

export const ControlledComponentMustPassCorrectValueProps = () => {
  const [value, setValue] = React.useState('');
  return (
    <FloatingLabelWrapper
      label={'user Name'}
      inputPropsName={{
        value: 'value1',
      }}
    >
      <input
        placeholder="placeholder"
        type={'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FloatingLabelWrapper>
  );
};

export const CorrectWrapCaseWhenHasMiddleLevelDOM = () => {
  return (
    <div>
      <FloatingLabelWrapper label={'user name'}>
        <div>
          <input
            placeholder="this is a long placeholder"
            type={'text'}
            minLength={6}
            maxLength={10}
          />
        </div>
      </FloatingLabelWrapper>
    </div>
  );
};
