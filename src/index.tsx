import React, { ElementType, useMemo, useState } from 'react';

type Styling = Partial<{
  className: string;
  style: React.CSSProperties;
}>;

export type FloatingLabelWrapperProps = Styling & {
  //the root container's element type.
  label: string | JSX.Element;
  children: JSX.Element;
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
  } = props;
  const childrenOriginProps = children.props;

  const shouldShowLabel = useMemo(() => {
    const value = valueGetter(childrenOriginProps);
    if (!value) return focused;
    return true;
  }, [focused, valueGetter]);

  //TODO: 考虑是否需要对 Children props 进行拦截
  const childrenProps = childrenOriginProps;

  const Root = component || 'div';

  //TODO: props check logic

  return (
    <Root className={className} style={style}>
      {shouldShowLabel &&
        (typeof label === 'string' ? <label>{label}</label> : label)}
      {React.cloneElement(children, childrenProps)}
    </Root>
  );
};

export default FloatingLabelWrapper;
