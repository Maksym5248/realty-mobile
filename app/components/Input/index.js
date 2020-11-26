// @flow
import React from 'react';
import { TextInput } from 'react-native-paper';

import { type InputProps } from './types';
import { s } from './styles';

export const Input = ({ onChangeValue, style, ...rest }: InputProps) => {
  return (
    <TextInput {...rest} mode="outlined" style={[s.style, style]} onChangeText={onChangeValue} />
  );
};
