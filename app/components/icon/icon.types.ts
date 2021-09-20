import { TextStyle, ViewStyle } from 'react-native';

type IconTypes = 'Ionicons';

export interface IIconProps {
  type?: IconTypes;
  name?: string;
  onPress?: () => void;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  size?: number;
  color?: string;
  disabledColor?: string;
  disabled?: boolean;
}
