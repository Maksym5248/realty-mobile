import React from 'react';

import {
  Caption,
  Title,
  Text as TextPaper,
  Subheading,
  Paragraph,
  Headline,
} from 'react-native-paper';

import { TextProps } from './text.types';

const types = {
  caption: Caption,
  title: Title,
  text: TextPaper,
  paragraph: Paragraph,
  subheading: Subheading,
  headline: Headline,
};

export const Text = ({
  type = 'text',
  text,
  children,
  color,
  size,
  style,
  onPress,
  testID,
}: TextProps) => {
  const Component = types[type];

  const additionalStyles = {};

  if (color) {
    additionalStyles.color = color;
  }

  if (size) {
    additionalStyles.fontSize = size;
  }

  return (
    <Component testID={testID} onPress={onPress} style={[style, additionalStyles]}>
      {text || children}
    </Component>
  );
};
