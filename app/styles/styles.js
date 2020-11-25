import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { dimensions } from './dimensions';

export const styles = StyleSheet.create({
  absoluteFill: StyleSheet.absoluteFillObject,
  fill: {
    flex: 1,
  },
  modal: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: dimensions.l,
    paddingTop: dimensions.l,
  },
});
