import { DefaultTheme } from 'react-native-paper';
import { colors } from './colors';
import { dimensions } from './dimensions';

export const theme = {
  ...DefaultTheme,
  //   fonts: {
  //   regular
  //   medium
  //   light
  //   thin
  //   },
  colors,
  roundness: dimensions.s,
};
