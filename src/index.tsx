import classNames from 'classnames';
import React, { ElementType, useMemo } from 'react';
import './floating-label-wrapper.css';
import {
  defaultValueGetter,
  defaultVariables,
  isChildrenValid,
  warning,
} from './utils';

type Styling = Partial<{
  className: string;
  style: React.CSSProperties;
  cssVariables: Partial<{
    '--floating-label-margin-right': string;
  }> &
    Partial<typeof defaultVariables>;
}>;

export type FloatingLabelWrapperProps = Styling & {
  label: string;
  children: JSX.Element;
  //the root container's element type.
  component?: ElementType;
  focused: boolean;
  valueGetter?: (childrenProps: any) => any;
  placeholderProperty?: string;
};

//拦截子组件, 并获取子组件的焦点状态和是否有值的状态。
const FloatingLabelWrapper = (
  props: FloatingLabelWrapperProps
): JSX.Element => {
  const {
    children,
    className = '',
    style = {},
    label,
    component,
    focused,
    valueGetter = defaultValueGetter,
    cssVariables = {},
  } = props;

  const childrenOriginProps = children.props;

  const shouldShowLabel = useMemo(() => {
    const value = valueGetter(childrenOriginProps);
    if (!value) return focused;
    return true;
  }, [focused, valueGetter]);

  if (!isChildrenValid(children)) {
    warning('children type error, children must be a single react component!');
    return children;
  }

  const childrenProps = childrenOriginProps;

  const Root = component || 'div';

  return (
    <Root
      className={classNames('floating-label-wrapper', {
        [className]: className,
        'float-label-wrapper--focus': focused,
      })}
      style={{ ...defaultVariables, ...cssVariables, ...style }}
    >
      <label
        className={classNames('floating-label', {
          'floating-label--float': shouldShowLabel,
        })}
      >
        {label}
      </label>
      {React.cloneElement(children, childrenProps)}
    </Root>
  );
};

export default FloatingLabelWrapper;
