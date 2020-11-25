//@flow
import { type TextStyle, type ViewStyle } from '~/types';

type IconTypes = 'Ionicons';

export type IconProps = {
  type?: IconTypes,
  name?: any, // should be string
  onPress?: () => void,
  style?: TextStyle,
  containerStyle?: ViewStyle,
  size?: number,
  color?: string,
  disabledColor?: string,
  disabled?: boolean,
};
