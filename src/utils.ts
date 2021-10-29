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
