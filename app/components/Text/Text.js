// @flow
import React from 'react';
import { Text as TextRN } from 'react-native';
import { type TextProps } from './types';

export const Text = ({ text, children, color, size, style, onPress }: TextProps) => {
  const additionalStyles = {};

  if (color) {
    // $FlowFixMe
    additionalStyles.color = color;
  }

  if (size) {
    // $FlowFixMe
    additionalStyles.fontSize = size;
  }

  return (
    <TextRN onPress={onPress} style={[style, additionalStyles]}>
      {text || children}
    </TextRN>
  );
};
