// @flow
import React from 'react';
import { type TextProps } from './types';
import {
  Caption,
  Title,
  Text as TextPaper,
  Subheading,
  Paragraph,
  Headline,
} from 'react-native-paper';

const types = {
  caption: Caption,
  title: Title,
  text: TextPaper,
  paragraph: Paragraph,
  subheading: Subheading,
  headline: Headline,
};

export const Text = ({ type = 'text', text, children, color, size, style, onPress }: TextProps) => {
  const Component = types[type];

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
    <Component onPress={onPress} style={[style, additionalStyles]}>
      {text || children}
    </Component>
  );
};
