import classNames from 'classnames';
import React, { ElementType, useMemo } from 'react';
import './floating-label-wrapper.css';

type Styling = Partial<{
  className: string;
  style: React.CSSProperties;
}>;

export type FloatingLabelWrapperProps = Styling & {
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
    <Root
      className={classNames('floating-label-wrapper', {
        [className]: className,
        'float-label-wrapper--focus': focused,
      })}
      style={style}
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
