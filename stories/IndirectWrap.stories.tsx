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

export const WithMiddleLevelDOM = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <div>
      <FloatingLabelWrapper
        label={'user name'}
        focused={isFocused}
        valueGetter={() => {
          return value;
        }}
      >
        <div>
          <input
            placeholder="this is a long placeholder"
            value={value}
            type={'text'}
            minLength={6}
            maxLength={10}
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
          {/* <p>Not recommend render other element here, because react-floating-label-wrapper will wrap children and render a border surround here.</p> */}
        </div>
      </FloatingLabelWrapper>
      <p>
        <pre>User name's length should between 6 and 10</pre>
      </p>
    </div>
  );
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const WrapReactSelect = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState(null);
  return (
    <FloatingLabelWrapper
      label={'prefer fruit?'}
      focused={isFocused}
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
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
      ></ReactSelect>
    </FloatingLabelWrapper>
  );
};

export const WrapReactDatePicker = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  return (
    <FloatingLabelWrapper label={'birthday'} focused={isFocused}>
      <ReactDatePicker
        selected={value}
        onChange={(date) => {
          setValue(date as Date);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      ></ReactDatePicker>
    </FloatingLabelWrapper>
  );
};
