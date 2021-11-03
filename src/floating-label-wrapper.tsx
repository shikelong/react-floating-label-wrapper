import classNames from 'classnames';
import React, { ElementType, useMemo, useState } from 'react';
import './floating-label-wrapper.css';
import { defaultVariables } from './utils/defaultVariables';
import { isChildrenValid } from './utils/isChildrenValid';
import { warning } from './utils/warning';

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
  inputPropsName?: {
    //if your input is controlled, wrapper will get value from children's value prop.
    value?: string;
    onFocus?: string;
    onBlur?: string;
  };
  //if your input is uncontrolled, you must pass valueGetter function to let this wrapper know if exist value..
  valueGetter?: () => any;
  placeholderProperty?: string;
};

const defaultInputPropsName: Required<
  FloatingLabelWrapperProps['inputPropsName']
> = {
  value: 'value',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
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
    valueGetter,
    cssVariables = {},
    inputPropsName = {
      value: 'value',
      onFocus: 'onFocus',
      onBlur: 'onBlur',
    },
  } = props;

  const childrenOriginProps = children.props;

  const [isFocused, setIsFocused] = useState(false);

  const shouldShowLabel = useMemo(() => {
    const value =
      valueGetter && typeof valueGetter === 'function'
        ? valueGetter()
        : childrenOriginProps[
            inputPropsName.value ?? defaultInputPropsName.value
          ];
    if (!value) return isFocused;
    return true;
  }, [isFocused, inputPropsName.value, childrenOriginProps]);

  if (!isChildrenValid(children)) {
    warning('children type error, children must be a single react component!');
    return children;
  }

  if (
    !childrenOriginProps.hasOwnProperty(inputPropsName.value) &&
    !props.valueGetter
  ) {
    warning(
      `children props error, children be must have correct value prop (for controlled component) or valueGetter (for uncontrolled component), current value prop is '${inputPropsName.value}'`
    );
    return children;
  }

  const childrenProps = {
    ...childrenOriginProps,
    //@ts-ignore
    [inputPropsName.onFocus ?? defaultInputPropsName.onFocus]: (e) => {
      setIsFocused(true);
      childrenOriginProps[
        inputPropsName.onFocus ?? defaultInputPropsName.onFocus
      ]?.(e);
    },
    //@ts-ignore
    [inputPropsName.onBlur ?? defaultInputPropsName.onBlur]: (e) => {
      setIsFocused(false);
      childrenOriginProps[
        inputPropsName.onBlur ?? defaultInputPropsName.onBlur
      ]?.(e);
    },
  };

  const Root = component || 'div';

  return (
    <Root
      className={classNames('floating-label-wrapper', {
        [className]: className,
        'float-label-wrapper--focus': isFocused,
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

export { FloatingLabelWrapper };
