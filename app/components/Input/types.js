// @flow
import { type TextInput } from 'react-native-paper';

import { type ViewStyle } from '~/types';

type CustomInputProps = {
  onChangeValue: (text: string) => void,
  style?: ViewStyle,
  ...TextInput,
};

export type InputProps = CustomInputProps;
