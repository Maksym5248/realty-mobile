// @flow
import React from 'react';
import { Button as ButtonPaper } from 'react-native-paper';

import { type ButtonProps } from './Button.props';
import { s } from './Button.styles';

export const Button = ({
  title,
  children,
  contentStyle,
  mode = 'contained',
  ...rest
}: ButtonProps) => {
  return (
    <ButtonPaper {...rest} contentStyle={[s.contentStyle, contentStyle]} mode={mode}>
      {title || children}
    </ButtonPaper>
  );
};
