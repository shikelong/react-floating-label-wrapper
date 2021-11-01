import React from 'react';

export const isChildrenValid = (children: React.ReactChild): boolean => {
  try {
    const child = React.Children.only(children);
    return React.isValidElement(child);
  } catch (e) {
    return false;
  }
};

export const defaultValueGetter = (props: any) => {
  return props.value;
};

export const defaultVariables = {
  '--input-padding-y': '1em',
  '--input-padding-x': '0.6em',
  '--floating-label-padding-left': '0.3em',
  '--floating-label-padding-right': '0.5em',
  '--floating-label-font-size': '0.9em',
  '--floating-label-font-size--floating': '0.75em',
  '--floating-label-color': 'rgba(0, 0, 0, 0.5)',
  '--active-color': 'rgb(43, 116, 226)',
};

export const warning = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(message);
  }
  console.error(message);
};
