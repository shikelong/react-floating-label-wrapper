import { Meta } from '@storybook/react';
import React from 'react';

export function GetStart() {
  return (
    <div>
      <h1>React Floating Label Wrapper</h1>
      <p>
        This component aid in providing a floating label like Material-UI around
        different input components.
      </p>
      <p>
        It's a HOC that wraps the input. It isn't a input component,
        <b> it just a wrapper.</b>
      </p>
    </div>
  );
}

const meta: Meta = {
  title: 'Welcome',
  component: GetStart,
};

export default meta;
