// @flow
import { type ViewStyle } from '~/types';

export type ButtonProps = {
  title?: string,
  children?: Node,
  mode?: 'text' | 'outlined' | 'contained',
  contentStyle?: ViewStyle,
};
