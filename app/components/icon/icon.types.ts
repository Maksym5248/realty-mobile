import { TextStyle, ViewStyle } from '~/types';

type IconTypes = 'Ionicons';

export interface IconProps {
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
