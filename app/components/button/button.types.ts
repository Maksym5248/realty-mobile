import React from 'react';
import { ViewStyle } from '~/types';

export interface ButtonPropsI {
  title?: string;
  children?: React.ReactChild;
  mode?: 'text' | 'outlined' | 'contained';
  contentStyle?: ViewStyle;
}
