import React from 'react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps } from '..';
import { memoize } from './memoize';

/**
 * Bind utility function.you can use this function to fix part of props.
 * @param props
 * @returns
 */
export const Bind = memoize(
  (props: Partial<Omit<FloatingLabelWrapperProps, 'children'>>) => {
    return (
      restProps: Partial<FloatingLabelWrapperProps> &
        Pick<FloatingLabelWrapperProps, 'children'>
    ) => {
      const mergedProps = {
        ...props,
        ...restProps,
      } as FloatingLabelWrapperProps;
      return <FloatingLabelWrapper {...mergedProps} />;
    };
  }
);
