import { ComponentPropsWithRef } from 'react';

import { ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

export type IInputProps = ComponentPropsWithRef<typeof TextInput> & {
  onChangeValue: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  label?: string;
  testID: string;
  isValid?: boolean;
  message?: string;
};
