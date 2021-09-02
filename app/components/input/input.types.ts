import { ViewStyle } from '~/types';

interface CustomInputProps {
  onChangeValue: (text: string) => void,
  style?: ViewStyle,
  testID: String,
};

export type InputProps = CustomInputProps;
