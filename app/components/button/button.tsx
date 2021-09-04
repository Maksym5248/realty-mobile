import * as React from 'react';

import { Button as ButtonPaper } from 'react-native-paper';

import { ButtonPropsI } from './button.types';
import { s } from './button.styles';

export const Button = ({
  title,
  children,
  contentStyle,
  mode = 'contained',
  ...rest
}: ButtonPropsI) => (
  <ButtonPaper {...rest} contentStyle={[s.contentStyle, contentStyle]} mode={mode}>
    {title || children}
  </ButtonPaper>
);
