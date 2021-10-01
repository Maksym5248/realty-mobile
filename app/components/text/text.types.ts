import * as React from 'react';

import { TextStyle } from 'react-native';

export interface TextProps {
  type?: 'caption' | 'title' | 'text' | 'paragraph' | 'subheading' | 'headline';
  text?: string;
  children?: React.ReactChildren;
  style?: TextStyle | TextStyle[];
  color?: string;
  size?: number;
  onPress?: () => void;
  testID?: string;
}
