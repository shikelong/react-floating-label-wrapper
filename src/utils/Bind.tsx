import React from 'react';
import FloatingLabelWrapper, { FloatingLabelWrapperProps } from '..';
import { memoize } from './memoize';

type BindParams = Partial<Omit<FloatingLabelWrapperProps, 'children'>>;

/**
 * Bind utility function.you can use this function to fix part of props.
 * @param props
 * @returns
 */
export const Bind = memoize<BindParams>((props: BindParams) => {
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
});
