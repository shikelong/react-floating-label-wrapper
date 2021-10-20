import React, { HTMLAttributes } from 'react';

type LabelProps = HTMLAttributes<HTMLLabelElement>;

const Label = (props: LabelProps): JSX.Element => {
  const { children, ...rest } = props;
  return <label {...rest}>{children}</label>;
};

export default Label;
