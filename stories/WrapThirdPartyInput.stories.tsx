import React from 'react';
import { Meta, Story } from '@storybook/react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps } from '../src';
import ReactSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//indirect wrap a input element, wrap third-party input components
const meta: Meta = {
  title: '3. IndirectWrap sample',
  component: FloatingLabelWrapper,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const WrapReactSelect = () => {
  const [value, setValue] = React.useState(null);
  return (
    <FloatingLabelWrapper
      label={'prefer fruit?'}
      cssVariables={{
        //adjust placeholder label's max width to fit react-select's select icon.
        '--floating-label-margin-right': '40px',
        //because react-selects' style differ with native <input>, you should adjust some css variables defined in FloatingLabelWrapperProps.cssVariables
        '--input-padding-y': '10px',
      }}
    >
      <ReactSelect
        options={options}
        value={value}
        isClearable
        onBlur={(e) => {
          console.log('on blur: ', e);
        }}
        styles={{
          control: (base: any) => ({
            ...base,
            width: 300,
            border: 'none',
          }),
        }}
        onChange={(e) => {
          setValue(e);
        }}
      ></ReactSelect>
    </FloatingLabelWrapper>
  );
};

export const WrapReactDatePicker = () => {
  const [value, setValue] = React.useState(new Date());
  return (
    <FloatingLabelWrapper
      label={'birthday'}
      inputPropsName={{
        value: 'selected',
      }}
    >
      <ReactDatePicker
        selected={value}
        onChange={(date) => {
          setValue(date as Date);
        }}
      ></ReactDatePicker>
    </FloatingLabelWrapper>
  );
};
