import { ViewStyle } from 'react-native';

interface CustomInputProps {
  onChangeValue: (text: string) => void;
  style?: ViewStyle;
  testID: string;
}

export type InputProps = CustomInputProps;
