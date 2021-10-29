import classNames from 'classnames';
import React, { ElementType, useMemo } from 'react';
import './floating-label-wrapper.css';

type Styling = Partial<{
  className: string;
  style: React.CSSProperties;
}>;

const defaultVariables = {
  '--input-padding-y': '1em',
  '--input-padding-x': '0.6em',
  '--floating-label-padding-left': '0.3em',
  '--floating-label-padding-right': '0.5em',
  '--floating-label-font-size': '0.9em',
  '--floating-label-font-size--floating': '0.75em',
  '--floating-label-color': 'rgba(0, 0, 0, 0.5)',
  '--active-color': 'rgb(43, 116, 226)',
};

export type FloatingLabelWrapperProps = Styling & {
  cssVariables?: Partial<typeof defaultVariables>;
  label: string;
  children: JSX.Element;
  //the root container's element type.
  component?: ElementType;
  focused: boolean;
  valueGetter: (childrenProps: any) => any;
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
    valueGetter,
    cssVariables = {},
  } = props;
  const childrenOriginProps = children.props;

  const shouldShowLabel = useMemo(() => {
    const value = valueGetter(childrenOriginProps);
    if (!value) return focused;
    return true;
  }, [focused, valueGetter]);

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
