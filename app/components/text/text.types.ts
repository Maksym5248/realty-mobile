import * as React from 'react';

import { TextStyle } from '~/types';

export interface TextProps {
  type?: 'caption' | 'title' | 'text' | 'paragraph' | 'subheading' | 'headline';
  /**
   * The text to display if not using `translate` or nested components.
   */
  text?: string;

  /**
   * Children components.
   */
  children?: React.ReactChildren;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[];

  /**
   * Color of text.
   */
  color?: string;

  /**
   * Size of text.
   */
  size?: number;

  /**
   * Text which is looked up via i18n.
   */
  onPress?: () => void;

  /**
   * Size of text.
   */
  testID?: string;
}
