import * as React from 'react';

import { Button as ButtonPaper } from 'react-native-paper';

import { IButtonProps } from './button.types';
import { s } from './button.styles';

export const Button = ({
  title,
  children,
  contentStyle,
  testID,
  mode = 'contained',
  ...rest
}: IButtonProps) => (
  <ButtonPaper
    {...rest}
    testID={`button.${testID}`}
    contentStyle={[s.contentStyle, contentStyle]}
    mode={mode}>
    {title || children}
  </ButtonPaper>
);
