import React, { ElementType, useMemo, useState } from 'react';
import Label from './Label';

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
  } = props;
  const childrenOriginProps = children.props;
  const [shouldShowLabel, setShouldShowLabel] = useState(() => focused);

  const childrenProps = useMemo(() => {
    return childrenOriginProps;
  }, []);

  const Root = component || 'div';

  //TODO: props check logic

  return (
    <Root className={className} style={style}>
      {shouldShowLabel &&
        (typeof label === 'string' ? <Label>{label}</Label> : label)}
      {React.cloneElement(children, childrenProps)}
    </Root>
  );
};

FloatingLabelWrapper.Label = Label;

export default FloatingLabelWrapper;
